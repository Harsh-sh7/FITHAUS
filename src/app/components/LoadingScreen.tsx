import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#F5F3F0] flex items-center justify-center"
        >
          <div className="relative">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl mb-4"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="font-light">FIT</span>
                <span className="font-semibold">HAUS</span>
              </motion.h1>
            </motion.div>

            {/* Animated circles */}
            <div className="absolute -inset-20 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 100 + i * 40,
                    height: 100 + i * 40,
                    border: "2px solid",
                    borderColor: i === 0 ? "#7B9CAC" : i === 1 ? "#9BA888" : "#D4927D",
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Loading bar */}
            <motion.div
              className="mt-12 h-1 bg-[#2C2C2C]/10 rounded-full overflow-hidden mx-auto"
              style={{ width: 200 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#7B9CAC] via-[#9BA888] to-[#D4927D]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
