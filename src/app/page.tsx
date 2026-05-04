"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Personal Info",
    fields: ["Full name", "Email address", "Phone number"],
    subtitle: "We'll use this to personalize your experience.",
  },
  {
    title: "Medical History",
    fields: ["Known allergies", "Current medications", "Previous surgeries"],
    subtitle: "This helps us match you with the right care team.",
  },
  {
    title: "Almost done",
    fields: [],
    subtitle: "Review and confirm your information.",
  },
];

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);
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
          <span className="font-medium text-neutral-800 text-sm">Aurora</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-neutral-500">
          <a href="#" className="hover:text-neutral-800 transition-colors">
            Product
          </a>
          <a href="#" className="hover:text-neutral-800 transition-colors">
            Solutions
          </a>
          <a href="#" className="hover:text-neutral-800 transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-neutral-800 transition-colors">
            About
          </a>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
          Get started
        </button>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <span className="text-xs font-medium text-blue-500 uppercase tracking-widest">
          Patient Onboarding
        </span>
        <h1 className="text-4xl md:text-6xl font-light text-neutral-900 mt-4 mb-6 leading-tight">
          Onboarding that feels
          <br />
          <span className="text-blue-500">human, not clinical</span>
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-10">
          Aurora replaces 14-step paper forms with a single intelligent flow.
          Patients complete onboarding in under 2 minutes — a 62% drop-off
          reduction.
        </p>
        <button
          onClick={() => setShowDemo(true)}
          className="px-8 py-3.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
        >
          Try the demo
          <span className="text-lg">→</span>
        </button>

        {!showDemo && (
          <p className="text-xs text-neutral-400 mt-4">
            No signup required. This is a live demo.
          </p>
        )}
      </section>

      {/* Demo form */}
      <AnimatePresence>
        {showDemo && !done && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neutral-100 bg-neutral-50"
          >
            <div className="max-w-lg mx-auto px-6 py-16">
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-8 text-center">
                Live Demo — Try it yourself
              </p>

              {/* Progress */}
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
                  <h2 className="text-xl font-medium mb-1 text-neutral-800">
                    {steps[step].title}
                  </h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    {steps[step].subtitle}
                  </p>

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
                    <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                      ✓ By continuing, you confirm all information is accurate.
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
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
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Done screen */}
      {done && (
        <section className="border-t border-neutral-100 bg-neutral-50 py-24 px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-medium text-neutral-800 mb-2">
              All done — that was 3 steps
            </h2>
            <p className="text-neutral-500 mb-2">
              Traditional onboarding takes 14 steps. We reduced it by 78%.
            </p>
            <button
              onClick={() => {
                setDone(false);
                setShowDemo(false);
                setStep(0);
              }}
              className="text-sm text-blue-500 hover:text-blue-600 mt-4"
            >
              ← Try again
            </button>
          </motion.div>
        </section>
      )}

      {/* Features */}
      {!showDemo && !done && (
        <section className="px-6 py-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-100">
          {[
            {
              title: "Smart validation",
              text: "Real-time field validation catches errors before submission. No more rejected forms.",
            },
            {
              title: "Progress persistence",
              text: "Patients can pause and resume anytime. Never lose your place in the flow.",
            },
            {
              title: "Seamless integration",
              text: "Plugs into any EHR system via REST APIs. Built to work with your existing stack.",
            },
          ].map((feat, i) => (
            <div key={i}>
              <h3 className="font-medium text-neutral-800 mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-neutral-500">{feat.text}</p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-6 py-8 text-center text-xs text-neutral-400">
        Demo built by{" "}
        <a
          href="https://xanadulea-portfolio.vercel.app"
          className="underline hover:text-neutral-600 transition-colors"
        >
          Xanadu Lea
        </a>{" "}
        — freelance developer. This is a fictional product for portfolio
        purposes.
      </footer>
    </div>
  );
}