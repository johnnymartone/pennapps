"use client";

import Prism from "@/components/Prism";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative bg-white">
      <div className="relative isolate" style={{ width: '100%', height: '640px' }}>
        <div className="absolute inset-0">
          <Prism
            animationType="3drotate"
            timeScale={0.4}
            height={3}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={2}
            noise={0}
            glow={2}
            bloom={0.8}
            suspendWhenOffscreen
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-neutral-100" />

        <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900"
            >
              Organize assignments with ease
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-lg text-neutral-900"
            >
              AI-powered assignment management that keeps you on schedule.
            </motion.p>
            <div className="mt-8 flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black duration-300"
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="https://youtu.be/UYBwPIIKS9c"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-gray-900 ring-2 ring-inset ring-gray-300 hover:bg-gray-200/40 hover:backdrop-blur-md transition-all duration-300"
                >
                  View demo
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Plan, Don&apos;t Plagiarize</h3>
              <p className="mt-2 text-gray-600">Upload your prompt and get a realistic timeline with checkpoints and resources. AI that coaches, not cheats.</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
            >
              <h3 className="text-lg font-semibold text-gray-900">From Overwhelmed to Organized</h3>
              <p className="mt-2 text-gray-600">Convert any assignment into a schedule you can actually follow.</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
            >
              <h3 className="text-lg font-semibold text-gray-900">AI for Doing, Not Dodging</h3>
              <p className="mt-2 text-gray-600">Turn school stress into a plan you can execute today.</p>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900">Trusted by students at top schools</h2>
          </div>
          <div className="mt-12 flex items-center justify-center mx-12">
              <motion.div whileHover={{ scale: 1.05 }} whileInView={{ opacity: [0, 1] }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Image src="/University of Pennsylvania.svg" alt="University of Pennsylvania" width={200} height={200} />
              </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <motion.div
            className="rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              backgroundImage:
                "linear-gradient(120deg, #60a5fa 0%, #8b5cf6 35%, #ec4899 70%, #f59e0b 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div>
              <h3 className="text-2xl font-semibold">Ready to stay organized?</h3>
              <p className="mt-2 text-white/90">Start planning smarter today with PlanIt.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-gray-900 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100">Get started</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}