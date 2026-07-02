import { motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

interface IntroSplashProps {
  onComplete: () => void;
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  // Call onComplete after the full animation sequence (around 5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        
        {/* The White Light Beam (enters from left) */}
        <motion.div
          className="absolute left-0 h-[2px] bg-white rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"
          style={{ top: "50%", originX: 0 }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "48%", opacity: [0, 1, 1, 0] }}
          transition={{
            width: { duration: 1.0, ease: "easeOut", delay: 0.2 },
            opacity: { times: [0, 0.1, 0.8, 1], duration: 2.8, delay: 0.2 },
          }}
        />

        {/* The Glass Prism (Triangle) */}
        <motion.div
          className={cn(
            "relative z-20 w-32 h-32 backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
            "flex items-center justify-center"
          )}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.2], rotate: 0 }}
          transition={{
            duration: 3.5,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          {/* Inner prism glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, delay: 1.2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* The Refracted Colored Beams (emerge from right of prism) */}
        <div className="absolute right-0 w-1/2 h-full flex items-center justify-start z-0" style={{ left: "52%" }}>
          {/* Red/Pink */}
          <motion.div
            className="absolute h-[6px] w-[150%] origin-left bg-gradient-to-r from-pink-500 via-rose-400 to-transparent blur-[2px]"
            initial={{ scaleX: 0, opacity: 0, rotate: -15 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0], scaleY: [1, 2, 20] }}
            transition={{ duration: 2.8, delay: 1.6, ease: "easeInOut" }}
          />
          {/* Orange/Yellow */}
          <motion.div
            className="absolute h-[6px] w-[150%] origin-left bg-gradient-to-r from-orange-400 via-amber-300 to-transparent blur-[2px]"
            initial={{ scaleX: 0, opacity: 0, rotate: -5 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0], scaleY: [1, 2, 20] }}
            transition={{ duration: 2.8, delay: 1.75, ease: "easeInOut" }}
          />
          {/* Green/Teal */}
          <motion.div
            className="absolute h-[6px] w-[150%] origin-left bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent blur-[2px]"
            initial={{ scaleX: 0, opacity: 0, rotate: 5 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0], scaleY: [1, 2, 20] }}
            transition={{ duration: 2.8, delay: 1.9, ease: "easeInOut" }}
          />
          {/* Blue/Purple */}
          <motion.div
            className="absolute h-[6px] w-[150%] origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-transparent blur-[2px]"
            initial={{ scaleX: 0, opacity: 0, rotate: 15 }}
            animate={{ scaleX: 1, opacity: [0, 1, 1, 0], scaleY: [1, 2, 20] }}
            transition={{ duration: 2.8, delay: 2.05, ease: "easeInOut" }}
          />
        </div>

        {/* Global Color Wash at the very end to transition out */}
        <motion.div
          className="fixed inset-0 bg-background z-30 mix-blend-color"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 3.8 }}
        />
        
        {/* Final flash of white light to transition to home */}
        <motion.div
          className="fixed inset-0 bg-white z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 4.2, ease: "easeInOut" }}
        />

      </div>
    </motion.div>
  );
}
