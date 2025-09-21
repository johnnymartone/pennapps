"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud, ClipboardCheck, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import JSZip from "jszip"
import { useRouter } from "next/navigation"
import AnimatedOnLoad from "@/components/animated-onload"

export default function NewAssignmentPage() {
  const [mode, setMode] = useState<"upload" | "paste">("upload")
  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  const [pastedText, setPastedText] = useState("")
  const [extractedText, setExtractedText] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [pasteReady, setPasteReady] = useState(false)
  const [AIName, setAIName] = useState("")
  const [labelLoading, setLabelLoading] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [processing, setProcessing] = useState(false)


  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setDroppedFile(file)
      extractTextFromFile(file)
    }
  }

  const onBrowse = () => fileInputRef.current?.click()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setDroppedFile(file)
    if (file) extractTextFromFile(file)
  }

  const extractTextFromFile = async (file: File) => {
    const name = file.name.toLowerCase()
    if (name.endsWith(".pdf")) {
      const buf = await file.arrayBuffer()
      type PdfTextContent = { items: Array<{ str?: string }> }
      type PdfPage = { getTextContent: () => Promise<PdfTextContent> }
      type PdfDocument = { numPages: number; getPage: (n: number) => Promise<PdfPage> }
      const pdfjsLib = (await import("pdfjs-dist")) as unknown as {
        GlobalWorkerOptions?: { workerSrc: string }
        getDocument: (data: { data: ArrayBuffer }) => { promise: Promise<PdfDocument> }
      }
      if (pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
      }
      const loadingTask = pdfjsLib.getDocument({ data: buf })
      const pdf = await loadingTask.promise
      let text = ""
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const strings = (content.items as Array<{ str?: string }>).map((it) => (it.str ? it.str : ""))
        text += strings.join(" ") + "\n"
      }
      console.log(text.trim())
      const finalText = text.trim()
      setExtractedText(finalText)
      await labelAssignment(finalText)
    } else if (name.endsWith(".docx")) {
      const buf = await file.arrayBuffer()
      const zip = await JSZip.loadAsync(buf)
      const doc = zip.file("word/document.xml")
      if (doc) {
        const xml = await doc.async("string")
        const stripped = xml
          .replace(/<w:p[^>]*>/g, "\n")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
        const finalText = stripped.trim()
        setExtractedText(finalText)
        await labelAssignment(finalText)
      } else {
        setExtractedText("")
      }
    } else if (name.endsWith(".txt")) {
      const text = await file.text()
      const finalText = text.trim()
      setExtractedText(finalText)
      await labelAssignment(finalText)
    } else {
      setExtractedText("")
    }
  }

  const labelAssignment = async (text: string) => {
    if (!text) return
    setLabelLoading(true)
    try {
      const res = await fetch("/api/assignment-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignment: text }),
      })
      if (!res.ok) throw new Error("labeling_failed")
      const data = await res.json()
      const info = data?.assignmentInfo
      if (info?.name) setAIName(info.name)
      if (info?.due_date) setDueDate(info.due_date)
    } catch {
    } finally {
      setLabelLoading(false)
    }
  }

  const processAssignment = async () => {
    if (!isValid()) return
    setProcessing(true)
    try {
      const res = await fetch("/api/get-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignment: extractedText, due_date: dueDate, assignmentName: AIName }),
      })
      if (!res.ok) throw new Error("processing_failed")
      const data = await res.json()
      console.log(data)
      await router.push(`/dashboard/assignments/${data.id}`)
    } catch {
    } finally {
      setProcessing(false)
    }
  }

  const onPasteContinue = async () => {
    const text = pastedText.trim()
    if (!text) return
    setPasteReady(true)
    setExtractedText(text)
    await labelAssignment(text)
  }

  const isValid = () => {
    if (mode === "upload") {
      return extractedText.trim().length > 0 && dueDate.length > 0
    }
    return pasteReady && pastedText.trim().length > 0 && dueDate.length > 0
  }

  const locked = labelLoading || (mode === "paste" && !pasteReady)

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-10">
      <AnimatedOnLoad variant="fade-up" durationMs={500}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">New assignment</h1>
            <p className="mt-2 text-gray-700">Add your assignment details and set a due date.</p>
          </div>
        </div>
      </AnimatedOnLoad>

      <div className="mt-8">
        <div className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1 ring-1 ring-gray-200">
          <Button
            type="button"
            variant={mode === "upload" ? "default" : "ghost"}
            className="px-4"
            onClick={() => setMode("upload")}
            disabled={labelLoading}
          >
            Upload
          </Button>
          <Button
            type="button"
            variant={mode === "paste" ? "default" : "ghost"}
            className="px-4"
            onClick={() => setMode("paste")}
            disabled={labelLoading}
          >
            Paste text
          </Button>
        </div>

        {mode === "upload" ? (
          <div className="mt-6">
            <AnimatedOnLoad variant="fade-up" durationMs={500}>
              <div
                className={`group relative flex h-56 w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed bg-white/70 backdrop-blur transition ${
                  isDragging ? "border-gray-500" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={onBrowse}
              >
                <div className="text-center">
                  {droppedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-gray-700" />
                      <div className="text-sm font-medium text-gray-900">{droppedFile.name}</div>
                      <div className="text-xs text-gray-500">Click to replace or drag another file</div>
                      {extractedText && (
                        <div className="text-xs text-gray-600">Extracted {extractedText.length} characters</div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <UploadCloud className="h-8 w-8 text-gray-700 transition-transform group-hover:scale-110" />
                      <div className="text-sm font-medium text-gray-900">Drag and drop your assignment</div>
                      <div className="text-xs text-gray-500">PDF, DOCX, or TXT. Click to browse</div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            </AnimatedOnLoad>
          </div>
        ) : (
          <div className="mt-6">
            <AnimatedOnLoad variant="fade-up" durationMs={500}>
              <div className="rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur p-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Paste your assignment text</span>
                </div>
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste the assignment prompt or instructions here"
                  rows={8}
                  className="mt-3 w-full resize-y rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none ring-0 focus:border-gray-300"
                />
                <div className="mt-2 text-xs text-gray-500">{pastedText.trim().length} characters</div>
                {!pasteReady && (
                  <div className="mt-3">
                    <Button type="button" onClick={onPasteContinue} disabled={pastedText.trim().length === 0 || labelLoading}>
                      Continue
                    </Button>
                  </div>
                )}
              </div>
            </AnimatedOnLoad>
          </div>
        )}

        {labelLoading && (
          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gray-900/30 to-transparent animate-shimmer" />
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatedOnLoad variant="fade-up" durationMs={500}>
            <div>
              <Label htmlFor="due_date">Due date</Label>
              <div className="mt-2 relative">
                <Input
                  id="due_date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => {console.log(e.target.value); setDueDate(e.target.value)}}
                  className="w-full pr-10"
                  disabled={locked}
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </AnimatedOnLoad>
        </div>

        <AnimatedOnLoad variant="fade-up" durationMs={500}>
          <div className="mt-8 flex items-center gap-3">
            <Button disabled={locked || !isValid() || processing} className="px-5" onClick={processAssignment}>
              Add Assignment
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost">Cancel</Button>
            </Link>
          </div>
        </AnimatedOnLoad>
      </div>
    </div>
  )
}


