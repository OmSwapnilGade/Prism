import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { THEMES, type Theme } from "@/types";
import { cn } from "@/utils/cn";


/**
 * Theme Roulette — the signature feature of Prism.
 * One-click shuffle that spins through all themes with a slot-machine animation,
 * landing on a random theme different from the current one.
 */
export function ThemeRoulette() {
  const { theme, setTheme } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const [displayTheme, setDisplayTheme] = useState<Theme>(theme);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    // Pick a random target that isn't the current theme
    const others = THEMES.filter((t) => t.value !== theme);
    const target = others[Math.floor(Math.random() * others.length)];

    // Rapid cycling animation
    let cycleCount = 0;
    const totalCycles = 12;
    let delay = 60;

    const cycle = () => {
      cycleCount++;
      const randomIdx = Math.floor(Math.random() * THEMES.length);
      setDisplayTheme(THEMES[randomIdx].value);

      if (cycleCount >= totalCycles) {
        // Land on the target
        setDisplayTheme(target.value);
        setTheme(target.value);
        setSpinning(false);
        return;
      }

      // Ease out — slow down toward the end
      delay = 60 + (cycleCount / totalCycles) * 140;
      intervalRef.current = setTimeout(cycle, delay);
    };

    cycle();
  }, [spinning, theme, setTheme]);

  // Cleanup
  const cleanup = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
  };

  const themeColors: Record<Theme, string> = {
    light: "from-amber-400 to-orange-300",
    dark: "from-indigo-500 to-purple-600",
    ocean: "from-cyan-400 to-teal-500",
    forest: "from-emerald-400 to-green-600",
  };

  const themeEmoji: Record<Theme, string> = {
    light: "☀️",
    dark: "🌙",
    ocean: "🌊",
    forest: "🌲",
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Roulette display */}
      <div className="relative">
        <motion.div
          className={cn(
            "w-32 h-32 rounded-2xl flex items-center justify-center",
            "bg-gradient-to-br shadow-xl border border-border",
            themeColors[displayTheme]
          )}
          animate={
            spinning
              ? {
                  rotate: [0, 5, -5, 3, -3, 0],
                  scale: [1, 1.05, 0.95, 1.03, 0.97, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={
            spinning
              ? { duration: 0.3, repeat: Infinity }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={displayTheme}
              className="text-5xl"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.5 }}
              transition={{ duration: 0.08 }}
            >
              {themeEmoji[displayTheme]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Sparkle particles when spinning */}
        {spinning && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/60"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 120],
                  y: [0, (Math.random() - 0.5) * 120],
                  opacity: [1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Theme name display */}
      <AnimatePresence mode="wait">
        <motion.p
          key={displayTheme}
          className="text-lg font-bold text-foreground capitalize"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          {THEMES.find((t) => t.value === displayTheme)?.label ?? displayTheme}
        </motion.p>
      </AnimatePresence>

      {/* Spin button */}
      <motion.button
        onClick={() => { cleanup(); spin(); }}
        disabled={spinning}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "h-12 px-8 text-base font-bold",
          "rounded-[var(--prism-radius-xl)]",
          "bg-gradient-to-r from-[#818cf8] via-[#a78bfa] to-[#f472b6]",
          "text-white shadow-lg",
          "hover:shadow-xl hover:scale-105",
          "active:scale-95",
          "transition-all duration-200",
          "focus-ring cursor-pointer",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        )}
        whileHover={spinning ? undefined : { scale: 1.05 }}
        whileTap={spinning ? undefined : { scale: 0.95 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={spinning ? { rotate: 360 } : { rotate: 0 }}
          transition={spinning ? { duration: 0.5, repeat: Infinity, ease: "linear" } : {}}
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
        </motion.svg>
        {spinning ? "Spinning…" : "Spin the Roulette!"}
      </motion.button>

      {/* Quick theme pills */}
      <div className="flex gap-2 mt-2">
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTheme(t.value);
              setDisplayTheme(t.value);
            }}
            disabled={spinning}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full",
              "border transition-all duration-200 cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              theme === t.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {themeEmoji[t.value]} {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
