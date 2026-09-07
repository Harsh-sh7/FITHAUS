import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const heroProducts = [
  {
    id: 1,
    name: "OVERSIZED COMFORT",
    category: "Hoodies",
    price: "$128",
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwb3ZlcnNpemVkJTIwaG9vZGllfGVufDF8fHx8MTc4MDM4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#7B9CAC",
  },
  {
    id: 2,
    name: "ESSENTIAL TEE",
    category: "Basics",
    price: "$48",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2xvdGhpbmclMjB3aGl0ZSUyMHRzaGlydHxlbnwxfHx8fDE3ODAzODMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#9BA888",
  },
];

export function HeroSection({ onAddToCart }: { onAddToCart: (item: any) => void }) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-40 right-10 w-64 h-64 rounded-full bg-[#7B9CAC]/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#D4927D]/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-7xl md:text-9xl leading-[0.9] mb-6">
            <span className="font-light italic block text-[#2C2C2C]/40">Your</span>
            <span className="font-semibold block -ml-2">VIBE,</span>
            <span className="font-light block ml-8 text-[#7B9CAC]">Your Fit</span>
          </h1>
          <motion.p
            className="text-lg text-[#2C2C2C]/70 max-w-md ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Curated streetwear that speaks your language. No basic fits, only statements.
          </motion.p>
        </motion.div>

        {/* Hero Product Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
          {heroProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: index === 0 ? -2 : 2 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -12, 
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
              style={{
                marginTop: index === 1 ? "3rem" : "0",
              }}
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/10">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Overlay Content */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-white/70 text-sm mb-2">{product.category}</p>
                    <h3 className="text-white text-3xl md:text-4xl mb-3 tracking-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-2xl font-light">{product.price}</span>
                      <motion.button
                        onClick={() => onAddToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        })}
                        className="px-6 py-3 rounded-full flex items-center gap-2 text-white transition-colors"
                        style={{ backgroundColor: product.color }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Bag
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-[#2C2C2C]"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  Just Dropped
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
