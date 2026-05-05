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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="font-medium text-neutral-800">Aurora Health</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
          <a href="#" className="hover:text-neutral-800 transition-colors">Product</a>
          <a href="#" className="hover:text-neutral-800 transition-colors">For Providers</a>
          <a href="#" className="hover:text-neutral-800 transition-colors">About</a>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-light text-neutral-900 leading-tight tracking-tight">
          Patient onboarding
          <br />
          <span className="text-blue-500">done right</span>
        </h1>
        <p className="text-lg text-neutral-500 mt-6 max-w-xl mx-auto leading-relaxed">
          From 14 paper forms to a single 3-step digital flow. Patients
          complete onboarding in under 2 minutes — and actually finish it.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              setDone(false);
              setStep(0);
              document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Try the demo
          </button>
          <button className="px-6 py-3 border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Learn more
          </button>
        </div>
        <div className="mt-24 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-light text-blue-500">62%</div>
            <p className="text-xs text-neutral-400 mt-1">Drop-off reduction</p>
          </div>
          <div>
            <div className="text-3xl font-light text-blue-500">2 min</div>
            <p className="text-xs text-neutral-400 mt-1">Avg. completion</p>
          </div>
          <div>
            <div className="text-3xl font-light text-blue-500">4.9</div>
            <p className="text-xs text-neutral-400 mt-1">Patient rating</p>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section id="demo" className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-lg mx-auto px-6 py-20">
          <p className="text-xs text-neutral-400 uppercase tracking-widest text-center mb-2">
            Interactive Demo
          </p>
          <p className="text-sm text-neutral-500 text-center mb-12">
            Experience the onboarding flow yourself.
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
                All done
              </h2>
              <p className="text-neutral-500 text-sm">
                That was 3 steps. Traditional onboarding takes 14.
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
              <div className="mb-8">
                <div className="flex justify-between text-sm text-neutral-500 mb-2">
                  <span>Step {step + 1} of {steps.length}</span>
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
                      ✓ All information will be securely stored and encrypted.
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

      {/* Quote */}
      <section className="border-t border-neutral-100 px-6 py-20">
        <blockquote className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-neutral-600 leading-relaxed">
            &ldquo;The new onboarding experience has been transformational. Our
            patients complete intake before they even arrive at the office. It
            feels less like paperwork and more like a modern product.&rdquo;
          </p>
          <footer className="mt-6">
            <p className="text-sm font-medium text-neutral-800">Dr. Sarah Chen</p>
            <p className="text-xs text-neutral-400">Chief Medical Officer, Aurora Health</p>
          </footer>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-6 py-8 text-center text-xs text-neutral-400">
        © 2026 Aurora Health. All rights reserved.<br />
        <span className="text-neutral-300">Built by Xanadu Lea</span>
      </footer>
    </div>
  );
}