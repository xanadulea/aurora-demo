"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Personal Info",
    fields: ["Full name", "Email address", "Phone number"],
  },
  {
    title: "Medical History",
    fields: ["Known allergies", "Current medications", "Previous surgeries"],
  },
  {
    title: "Confirmation",
    fields: [],
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [done, setDone] = useState(false);

  const next = () => {
    if (step < steps.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const back = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-neutral-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="font-medium text-neutral-800 text-sm">Aurora Health</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-neutral-500">
          <span>Patient Portal</span>
          <span>For Providers</span>
          <span>About</span>
        </div>
      </nav>

      {/* Hero — Case Study Intro */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <span className="text-xs font-medium text-blue-500 uppercase tracking-widest">
          Case Study
        </span>
        <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mt-4 mb-6 leading-tight">
          How Aurora Health cut patient onboarding from{" "}
          <span className="text-blue-500">14 steps to 3</span>
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed">
          I rebuilt Aurora&apos;s patient intake flow from the ground up. The
          old system had a 62% drop-off rate. The new one takes under 2 minutes
          and integrates directly with their Ruby on Rails backend.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            Next.js
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            Framer Motion
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            REST API Integration
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            6-week delivery
          </span>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-lg mx-auto px-6 py-16">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2 text-center">
            Live Demo
          </p>
          <p className="text-sm text-neutral-500 text-center mb-10">
            Try the actual onboarding flow I delivered to Aurora.
          </p>

          {done ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white rounded-2xl shadow-lg border border-neutral-100 p-10"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                ✓
              </div>
              <h2 className="text-xl font-medium text-neutral-800 mb-2">
                Onboarding complete
              </h2>
              <p className="text-neutral-500 text-sm">
                3 steps. Under 2 minutes. That&apos;s the difference.
              </p>
              <button
                onClick={() => {
                  setDone(false);
                  setStep(0);
                }}
                className="text-sm text-blue-500 hover:text-blue-600 mt-6"
              >
                ← Try again
              </button>
            </motion.div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-neutral-500 mb-2">
                  <span>
                    Step {step + 1} of {steps.length}
                  </span>
                  <span>{steps[step].title}</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>

              {/* Card */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ x: 50 * direction, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50 * direction, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8"
                >
                  <h2 className="text-xl font-medium mb-6 text-neutral-800">
                    {steps[step].title}
                  </h2>

                  {steps[step].fields.map((field, i) => (
                    <div key={i} className="mb-4">
                      <label className="block text-sm text-neutral-500 mb-1.5">
                        {field}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter your ${field.toLowerCase()}`}
                        className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  ))}

                  {step === 2 && (
                    <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 mb-6">
                      ✓ By continuing, you confirm all information is accurate.
                    </div>
                  )}

                  <div className="flex gap-3">
                    {step > 0 && (
                      <button
                        onClick={back}
                        className="px-6 py-2.5 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={next}
                      className="ml-auto px-6 py-2.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {step === 2 ? "Complete" : "Continue"}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-neutral-400 text-center mb-12">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-light text-blue-500 mb-2">62%</div>
            <p className="text-sm text-neutral-500">Reduction in drop-off</p>
          </div>
          <div>
            <div className="text-4xl font-light text-blue-500 mb-2">2 min</div>
            <p className="text-sm text-neutral-500">Average completion time</p>
          </div>
          <div>
            <div className="text-4xl font-light text-blue-500 mb-2">4.9</div>
            <p className="text-sm text-neutral-500">Patient satisfaction score</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-neutral-100 px-6 py-20">
        <blockquote className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-neutral-600 italic leading-relaxed">
            &ldquo;The new onboarding flow transformed our patient experience. We
            went from losing over half our signups to completing nearly every
            one. The attention to detail in the animations and validation made
            it feel less like a medical form and more like a modern app.&rdquo;
          </p>
          <footer className="mt-6">
            <p className="text-sm font-medium text-neutral-800">Dr. Sarah Chen</p>
            <p className="text-xs text-neutral-400">Chief Medical Officer, Aurora Health</p>
          </footer>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-6 py-8 text-center text-xs text-neutral-400">
        Case study by{" "}
        <a
          href="https://xanadulea-portfolio.vercel.app"
          className="underline hover:text-neutral-600 transition-colors"
        >
          Xanadu Lea
        </a>{" "}
        — freelance developer. This is a portfolio piece. Aurora Health is a
        fictional client.
      </footer>
    </div>
  );
}