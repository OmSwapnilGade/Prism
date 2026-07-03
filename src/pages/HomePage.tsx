import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeRoulette } from "@/components/ThemeRoulette/ThemeRoulette";
import { IntroSplash } from "@/components/IntroSplash/IntroSplash";
import { cn } from "@/utils/cn";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4"/><path d="m6.8 15-3.5 2"/><path d="m20.7 17-3.5-2"/><path d="M6.8 9 3.3 7"/><path d="m20.7 7-3.5 2"/><path d="m9 22 3-8 3 8"/><path d="M8 22h8"/><path d="M12 2a5 5 0 0 0-5 5c0 2.76 5 10 5 10s5-7.24 5-10a5 5 0 0 0-5-5z"/>
      </svg>
    ),
    title: "Theme Engine",
    description:
      "Instantly switch between dramatic visual personalities — not just light/dark but entirely different design languages.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m7.5 4.21 4.5 2.6 4.5-2.6"/><path d="M7.5 19.79V14.6L3 12"/><path d="M21 12l-4.5 2.6v5.19"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>
      </svg>
    ),
    title: "CVA Variants",
    description:
      "Every component uses class-variance-authority for type-safe, scalable variant management. No inline ternaries.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="m16 10-5.5 6L8 13"/>
      </svg>
    ),
    title: "Accessible",
    description:
      "Keyboard-navigable, focus-trapped modals, ARIA roles, and visible focus rings. Built for everyone.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/><path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>
      </svg>
    ),
    title: "TypeScript Strict",
    description:
      "Full strict-mode coverage. Props derive from VariantProps so types and styles never drift apart.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <IntroSplash key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#818cf8]/20 to-[#f472b6]/20 blur-3xl animate-gradient" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#a78bfa]/15 to-[#818cf8]/15 blur-3xl animate-gradient" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 pt-24 pb-20 lg:pt-36 lg:pb-28">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 4.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-border bg-muted/50 text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Design System v1.0
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Build with{" "}
              <span className="bg-gradient-to-r from-[#818cf8] via-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent animate-gradient">
                Prism
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A modern React component library with theme-switching superpowers.
              Accessible, typed, and beautifully crafted components that morph
              between dramatic visual personalities.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/studio"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-base font-semibold",
                  "bg-gradient-to-r from-[#818cf8] via-[#c084fc] to-[#f472b6]",
                  "text-white shadow-md hover:shadow-lg hover:opacity-90",
                  "rounded-[var(--prism-radius-lg)]",
                  "transition-all duration-[var(--prism-duration)]",
                  "focus-ring"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
                Open Studio
              </Link>
              <Link
                to="/docs/button"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-base font-semibold",
                  "bg-primary text-primary-foreground",
                  "rounded-[var(--prism-radius-lg)]",
                  "shadow-md hover:shadow-lg",
                  "hover:bg-primary/90",
                  "transition-all duration-[var(--prism-duration)]",
                  "focus-ring"
                )}
              >
                Explore Components
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <Link
                to="/playground"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 px-8 text-base font-semibold",
                  "bg-secondary text-secondary-foreground",
                  "rounded-[var(--prism-radius-lg)]",
                  "border border-border",
                  "hover:bg-secondary/80",
                  "transition-all duration-[var(--prism-duration)]",
                  "focus-ring"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                Playground
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Roulette Showcase */}
      <section className="max-w-screen-2xl mx-auto px-4 py-20 lg:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Theme Roulette 🎰
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            One click to morph everything. The same components, entirely different visual personalities.
          </p>
        </motion.div>

        <motion.div
          className={cn(
            "rounded-[var(--prism-radius-xl)]",
            "border border-border bg-card/30",
            "p-8 md:p-16",
            "flex items-center justify-center"
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ThemeRoulette />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 py-20 lg:py-28">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Engineered for excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Every component is built with a clear contract between design tokens,
            variant architecture, and accessibility.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={cn(
                "group relative p-6 rounded-[var(--prism-radius-xl)]",
                "border border-border bg-card",
                "hover:shadow-lg hover:border-primary/20",
                "transition-all duration-300"
              )}
            >
              <div className="w-10 h-10 rounded-[var(--prism-radius-lg)] bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS v4
          </p>
          <p className="text-sm text-muted-foreground">
            Prism Design System — Portfolio Project
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
