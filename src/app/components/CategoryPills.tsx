import { motion } from "motion/react";
import { useState } from "react";

const categories = [
  { id: "streetwear", label: "Streetwear", color: "#7B9CAC" },
  { id: "y2k", label: "Y2K", color: "#D4927D" },
  { id: "oversized", label: "Oversized", color: "#9BA888" },
  { id: "minimal", label: "Minimal", color: "#7B9CAC" },
  { id: "vintage", label: "Vintage", color: "#D4927D" },
  { id: "techwear", label: "Techwear", color: "#2C2C2C" },
];

export function CategoryPills() {
  const [selected, setSelected] = useState("streetwear");

  return (
    <section className="py-12 px-4 sticky top-28 z-40 bg-[#F5F3F0]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelected(category.id)}
              className="px-6 py-3 rounded-full whitespace-nowrap text-sm transition-all flex-shrink-0"
              style={{
                backgroundColor: selected === category.id ? category.color : "white",
                color: selected === category.id ? "white" : "#2C2C2C",
                boxShadow: selected === category.id 
                  ? "0 8px 24px -8px rgba(0,0,0,0.2)" 
                  : "0 2px 8px rgba(0,0,0,0.05)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
