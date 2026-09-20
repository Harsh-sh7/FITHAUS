import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";

const outfitRecs = [
  {
    id: 1,
    name: "Urban Explorer",
    vibe: "Street-ready comfort",
    items: ["Oversized Hoodie", "Tapered Cargo", "High-Top Sneakers"],
    totalPrice: "$324",
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwb3ZlcnNpemVkJTIwaG9vZGllfGVufDF8fHx8MTc4MDM4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 95,
  },
  {
    id: 2,
    name: "Minimal Maven",
    vibe: "Clean & confident",
    items: ["Essential Tee", "Wide-Leg Trousers", "Minimal Blazer"],
    totalPrice: "$412",
    image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBibGF6ZXIlMjBtaW5pbWFsJTIwZmFzaGlvbnxlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 92,
  },
  {
    id: 3,
    name: "Y2K Revival",
    vibe: "Throwback energy",
    items: ["Baby Tee", "Low-Rise Cargo", "Platform Sneakers"],
    totalPrice: "$298",
    image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5MmslMjBmYXNoaW9uJTIwY2FyZ28lMjBwYW50c3xlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 88,
  },
  {
    id: 4,
    name: "Tech Forward",
    vibe: "Future-ready style",
    items: ["Utility Vest", "Tech Pants", "Chunky Boots"],
    totalPrice: "$456",
    image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMHVyYmFuJTIwZmFzaGlvbiUyMGJsYWNrfGVufDF8fHx8MTc4MDM4MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    matchScore: 90,
  },
];

export function AIOutfitRecs({ onAddToCart }: { onAddToCart: (item: any) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return outfitRecs.length - 1;
      if (next >= outfitRecs.length) return 0;
      return next;
    });
  };

  const currentOutfit = outfitRecs[currentIndex];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#F5F3F0] to-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[#9BA888]/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg shadow-[#7B9CAC]/10 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={18} className="text-[#7B9CAC]" />
            <span className="text-sm text-[#2C2C2C]">AI Styled For You</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl mb-4">
            <span className="font-light italic text-[#2C2C2C]/40">Your Perfect</span>
            <br />
            <span className="font-semibold text-[#2C2C2C]">Outfit Match</span>
          </h2>
          <p className="text-lg text-[#2C2C2C]/60 max-w-xl mx-auto">
            Swipe through AI-curated fits based on your style DNA
          </p>
        </motion.div>

        {/* Card Carousel */}
        <div className="relative h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0, 
                x: direction > 0 ? 300 : -300,
                rotate: direction > 0 ? 10 : -10,
                scale: 0.8,
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? -300 : 300,
                rotate: direction > 0 ? -10 : 10,
                scale: 0.8,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="absolute w-full max-w-md"
            >
              <motion.div
                className="bg-white rounded-[36px] overflow-hidden shadow-2xl shadow-black/10"
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={currentOutfit.image}
                    alt={currentOutfit.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Match Score Badge */}
                  <motion.div
                    className="absolute top-6 right-6 bg-[#9BA888] text-white px-4 py-2 rounded-full flex items-center gap-2"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Sparkles size={16} />
                    <span className="text-sm font-medium">{currentOutfit.matchScore}% Match</span>
                  </motion.div>

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 -mt-24 relative z-10">
                  <h3 className="text-white text-3xl mb-2">{currentOutfit.name}</h3>
                  <p className="text-white/70 mb-6 italic">{currentOutfit.vibe}</p>

                  {/* Items */}
                  <div className="space-y-2 mb-6">
                    {currentOutfit.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9BA888]" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-white text-2xl">{currentOutfit.totalPrice}</span>
                    <div className="flex gap-2">
                      <motion.button
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={20} />
                      </motion.button>
                      <motion.button
                        onClick={() => onAddToCart({
                          id: `outfit-${currentOutfit.id}`,
                          name: currentOutfit.name,
                          price: currentOutfit.totalPrice,
                          image: currentOutfit.image,
                        })}
                        className="px-6 py-3 rounded-full bg-[#7B9CAC] text-white flex items-center gap-2"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingBag size={18} />
                        Add Outfit
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-0 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-[#2C2C2C] z-20"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-0 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-[#2C2C2C] z-20"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {outfitRecs.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: index === currentIndex ? "#7B9CAC" : "#D1D1D1",
              }}
              whileHover={{ scale: 1.5 }}
              animate={{
                scale: index === currentIndex ? 1.5 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
