import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export function FloatingCTA() {
  return (
    <Link to="/build-fit">
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.button
          className="relative px-8 py-4 bg-gradient-to-r from-[#7B9CAC] to-[#9BA888] text-white rounded-full flex items-center gap-3 shadow-2xl shadow-[#7B9CAC]/30 overflow-hidden group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#9BA888] to-[#7B9CAC]"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Sparkle animation */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative z-10"
          >
            <Sparkles size={20} />
          </motion.div>

          <span className="text-lg relative z-10">Build Your Fit</span>

          {/* Glowing orbs */}
          <motion.div
            className="absolute -top-1 -right-1 w-16 h-16 rounded-full bg-white/20 blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#9BA888]"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              y: [-20, -60],
              x: [0, (i - 1) * 30],
              opacity: [1, 0],
              scale: [0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </Link>
  );
}
