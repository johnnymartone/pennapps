"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const page = () => {
    const [data, setData] = useState<any>({
        "tasks": []
        })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<any | null>(null)
    const handleClick = async () => {
        const res = await fetch("/api/get-tasks", {
            method: "POST",
            body: JSON.stringify({ assignment: `APUSH Assignment: Explaining the Road to War — Causes of the Spanish–American War
Task (1200 words, ≥3 primary sources):
 Write a focused, argumentative essay that explains two distinct causes of the Spanish–American War (1898) and evaluates their relative significance. Your essay must include a clear, contestable thesis; context of the late-19th-century United States; evidence from at least three primary sources; and relevant secondary scholarship. Conclude by weighing which cause mattered more and why.

Purpose & Skills You’ll Practice
Historical Argumentation: Crafting a defensible thesis and sustaining a line of reasoning.


Use of Evidence: Selecting, integrating, and sourcing primary evidence (corroboration, sourcing, context).


Contextualization & Causation: Situating events within Gilded Age/imperial context; explaining short- and long-term causes.


HIPP Analysis: Historical situation, Intended audience, Purpose, Point of view for each primary source you use.


Writing & Citation: Clear structure; proper citation (Chicago or MLA).



Prompt Details
Address both of the following in one cohesive essay:
Explain two causes of the Spanish–American War chosen from (or beyond) the list below. Define each cause precisely.


Humanitarian/anti-Spanish outrage over Cuban reconcentration camps


Economic interests (trade, sugar, investments, markets)


Yellow journalism and mass media sensationalism


The de Lôme Letter (insult to McKinley/national honor)


The USS Maine explosion (and reactions)


Strategic/imperial ambitions (Alfred Thayer Mahan, coaling stations, great-power status)


Domestic politics/partisanship (e.g., election dynamics, congressional pressure)


Evaluate relative significance. Which of your two causes most directly pushed the U.S. into war by April 1898? Justify with evidence and reasoning, acknowledging counterarguments.



Required Components
Length: ~1200 words (±10%).


Primary Sources (≥3): Quote or closely paraphrase and analyze (don’t just drop quotes). Apply HIPP to at least two of them in-text.


Secondary Sources (≥2): At least one scholarly book chapter or journal article.


Contextualization: Set the scene (c. 1890–1898)—industrial growth, expansionism, Cuban revolt, global imperial rivalries.


Counterargument: Briefly address a competing interpretation (e.g., “yellow journalism mattered less than strategic aims”) and rebut it.


Citations & Works Cited/Bibliography: Chicago notes-bibliography or MLA parenthetical—be consistent.



Suggested Research Path (Scaffolded Milestones)
Checkpoint 1 — Research Question (Due ___):
 In 1–2 sentences, state your working thesis or question (e.g., “While the Maine explosion catalyzed public support, strategic and economic ambitions played the decisive role because…”).
Checkpoint 2 — Source Set & Annotation (Due ___):
 Submit a mini-annotated bibliography (5–7 sources total) listing at least 3 primaries and 2 secondaries. For primaries, add 2–3 sentence HIPP notes each.
Checkpoint 3 — Outline (Due ___):
 Provide a point-by-point outline: thesis; topic sentences; where each source will be used; and a 2–3 sentence plan for your counterargument.
Final Submission (Due ___):
 Upload a polished essay as a PDF or DOCX with Works Cited/Bibliography.

Primary Source Ideas (pick any that fit your argument)
Newspaper coverage and headlines on Cuba, the Maine, or the de Lôme Letter (e.g., New York Journal, New York World).


President McKinley’s war message to Congress (April 1898).


The de Lôme Letter (1898).


Congressional debates/resolutions on Cuban independence.


Excerpts from Alfred Thayer Mahan, The Influence of Sea Power upon History (1890).


Business correspondence or period magazine pieces on trade/markets in Cuba and the Caribbean.


Political cartoons from 1895–1898 (e.g., Puck, Judge).


Tip: Choose sources that speak to different causes so you can compare their weight convincingly.

Organization Guide (Suggested)
Intro (1 paragraph): Hook + brief context + thesis stating your two causes and which was most significant.


Cause A Section: Define it precisely; present 1–2 primary sources; HIPP; connect to thesis.


Cause B Section: Same as above; ensure the evidence type differs when possible (e.g., official message vs. newspaper).


Counterargument (1 paragraph): Present a reasonable alternative view and rebut with evidence.


Comparative Evaluation (1 paragraph): Directly weigh A vs. B—mechanism, scope, immediacy, political feasibility.


Conclusion: Re-state significance and note a broader implication (e.g., U.S. path toward overseas empire).



Simple Rubric (100 points total)
Category
Exemplary (A)
Proficient (B)
Developing (C)
Beginning (D/F)
Pts
Thesis & Argument
Clear, nuanced, arguable thesis; sustained, logical line of reasoning that evaluates significance
Defensible thesis; generally consistent reasoning; some evaluation present
Thesis present but vague or factual; limited evaluation
No clear thesis; narrative summary only
20
Use of Primary Sources
≥3 primaries integrated smoothly; accurate sourcing; HIPP applied to ≥2; quotations analyzed, not dropped
≥3 primaries used; mostly accurate; some analysis; partial HIPP application
<3 primaries or weak integration; minimal analysis; sourcing issues
Primaries absent/misused; inaccurate or irrelevant evidence
25
Secondary Scholarship
≥2 credible secondaries; engages historiography or scholarly debate
≥2 secondaries; supports points
1–2 general sources; limited support
Little/no secondary support
10
Contextualization
Strong, relevant late-19th-century context woven into argument
Adequate context present
Minimal or generic context
Lacks context
10
Counterargument & Rebuttal
Thoughtful counterclaim and effective rebuttal with evidence
Counterclaim present; rebuttal adequate
Counterclaim asserted but weak or unrebutted
None
10
Comparative Causation
Clear, persuasive weighting of causes with criteria (scope, immediacy, mechanism)
Weighting attempted; somewhat persuasive
Some comparison but shallow
No real comparison
10
Writing & Organization
Cohesive structure; precise prose; smooth transitions
Generally clear organization; minor issues
Choppy or repetitive; organization weak
Disorganized; unclear
10
Citation & Mechanics
Consistent Chicago/MLA; error-free; proper bibliography
Mostly consistent; minor errors
Inconsistent or incomplete
Lacks citations/bibliography
5
Total








100


Formatting & Submission
Format: 12-pt font, double-spaced, 1-inch margins, page numbers.


Citations: Chicago (footnotes + bibliography) or MLA (in-text + Works Cited).


Quote limit: Max 15% of essay as direct quotes—paraphrase and analyze.


Images (optional): If using political cartoons, include figure captions and source info.



Academic Integrity & AI Use
Permitted: Brainstorming, outlining, locating sources, and grammar-level suggestions.


Not permitted: Generative tools writing any sentences that appear in the final draft or summarizing sources you did not actually read.


You are responsible for accurate quotations and citations. Submit notes or drafts upon request.



Self-Check Before You Submit
Does my thesis identify two causes and rank them in significance?


Do I explain how each cause led to war (mechanism), not just that it did?


Have I used ≥3 primary sources with at least two HIPP analyses?


Did I address a counterargument and rebut it with evidence?


Is my context specific to the 1890s (Cuba, imperialism, politics, media)?


Are my citations consistent and my bibliography complete?


`, due_date: "2025-09-25" })
        })
        const data = await res.json()
        setData(data)
    }
    return (
        <div className="space-y-4">
            <Button onClick={handleClick}>Test</Button>
            {data && (
                <div className="overflow-x-auto">
                    <div className="flex flex-nowrap gap-4 pb-4">
                        {data.tasks.map((task: any) => (
                            <Card key={task.id} className="min-w-[280px] w-72 cursor-pointer transition hover:shadow-md" onClick={() => { setSelectedTask(task); setIsModalOpen(true) }}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle className="text-sm">{task.task}</CardTitle>
                                        <Badge variant="secondary" className="shrink-0 capitalize">{task.type}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <div className="flex justify-between">
                                            <span>Due</span>
                                            <span>{task.due_date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Time</span>
                                            <span>{task.time_estimate} min</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => { setIsModalOpen(false); setSelectedTask(null) }} />
                    <div className="relative z-10 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg" role="dialog" aria-modal="true">
                        <div className="flex items-start justify-between gap-2">
                            <h2 className="text-lg font-semibold">{selectedTask.task}</h2>
                            <Badge variant="secondary" className="shrink-0 capitalize">{selectedTask.type}</Badge>
                        </div>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Due</span>
                                <span>{selectedTask.due_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Time</span>
                                <span>{selectedTask.time_estimate} min</span>
                            </div>
                            <p className="text-muted-foreground">{selectedTask.description}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={() => { setIsModalOpen(false); setSelectedTask(null) }}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default page

