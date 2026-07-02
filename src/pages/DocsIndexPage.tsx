import { Link } from "react-router";
import { motion } from "framer-motion";
import { componentRegistry } from "@/data/componentRegistry";
import { cn } from "@/utils/cn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function DocsIndexPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Components
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse all {componentRegistry.length} components in the Prism library.
          Each is fully typed, accessible, and theme-aware.
        </p>
      </div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {componentRegistry.map((component) => (
          <motion.div key={component.slug} variants={itemVariants}>
            <Link
              to={`/docs/${component.slug}`}
              className={cn(
                "block p-5 rounded-[var(--prism-radius-lg)]",
                "border border-border bg-card",
                "hover:border-primary/30 hover:shadow-md",
                "transition-all duration-[var(--prism-duration)]",
                "focus-ring group"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {component.name}
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {component.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 bg-muted rounded-full">
                  {component.props.length} props
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
