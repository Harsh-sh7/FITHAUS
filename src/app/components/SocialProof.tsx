import { motion } from "motion/react";
import { TrendingUp, Users, Star } from "lucide-react";

const creatorPicks = [
  {
    id: 1,
    creator: "@style.maven",
    avatar: "https://images.unsplash.com/photo-1612266686586-70af879c032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB1cmJhbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc4MDM4MzE2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Oversized Comfort Hoodie",
    quote: "This hoodie changed my entire wardrobe game",
    followers: "284K",
  },
  {
    id: 2,
    creator: "@urbanfit.daily",
    avatar: "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwYWNjZXNzb3JpZXMlMjBiZWFuaWUlMjBjYXB8ZW58MXx8fHwxNzgwMzgzMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Minimal Cargo Set",
    quote: "Quality speaks louder than hype",
    followers: "156K",
  },
  {
    id: 3,
    creator: "@fits.archive",
    avatar: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc4MDMwNTQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    product: "Vintage Denim Jacket",
    quote: "Timeless piece, modern attitude",
    followers: "421K",
  },
];

const trendingFits = [
  {
    id: 1,
    name: "Monochrome Minimalism",
    votes: 1247,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2xvdGhpbmclMjB3aGl0ZSUyMHRzaGlydHxlbnwxfHx8fDE3ODAzODMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Tech Utility",
    votes: 2891,
    image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMHVyYmFuJTIwZmFzaGlvbiUyMGJsYWNrfGVufDF8fHx8MTc4MDM4MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Layered Comfort",
    votes: 1683,
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwb3ZlcnNpemVkJTIwaG9vZGllfGVufDF8fHx8MTc4MDM4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function SocialProof() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Creator Picks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="w-12 h-12 rounded-full bg-[#D4927D]/10 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Star size={22} className="text-[#D4927D]" />
            </motion.div>
            <div>
              <h2 className="text-4xl md:text-5xl">
                <span className="font-semibold">Creator</span>
                <span className="font-light italic text-[#2C2C2C]/40"> Favorites</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {creatorPicks.map((pick, index) => (
              <motion.div
                key={pick.id}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
                className="bg-[#F5F3F0] rounded-[28px] p-6 relative overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B9CAC]/5 rounded-full -mr-16 -mt-16" />
                
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={pick.avatar}
                      alt={pick.creator}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">{pick.creator}</p>
                    <p className="text-xs text-[#2C2C2C]/60 flex items-center gap-1">
                      <Users size={12} />
                      {pick.followers}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mb-4 relative z-10">
                  <p className="text-[#2C2C2C]/80 italic text-sm leading-relaxed">
                    "{pick.quote}"
                  </p>
                </blockquote>

                {/* Product */}
                <motion.div
                  className="px-4 py-2 bg-white rounded-full text-sm inline-block"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  {pick.product}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trending Fits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="w-12 h-12 rounded-full bg-[#9BA888]/10 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TrendingUp size={22} className="text-[#9BA888]" />
            </motion.div>
            <div>
              <h2 className="text-4xl md:text-5xl">
                <span className="font-semibold">Trending</span>
                <span className="font-light italic text-[#2C2C2C]/40"> This Week</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingFits.map((fit, index) => (
              <motion.div
                key={fit.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[28px] overflow-hidden">
                  <motion.img
                    src={fit.image}
                    alt={fit.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl mb-3">{fit.name}</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-[#9BA888]" />
                      <span className="text-white/90 text-sm">
                        {fit.votes.toLocaleString()} votes
                      </span>
                    </div>
                  </div>

                  {/* Rank Badge */}
                  <motion.div
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg font-semibold"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    #{index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
