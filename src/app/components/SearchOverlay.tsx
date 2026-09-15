import { motion, AnimatePresence } from "motion/react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

const trendingSearches = [
  "Oversized hoodies",
  "Y2K cargo pants",
  "Minimal sneakers",
  "Vintage denim",
  "Techwear accessories",
];

const recentSearches = [
  "Black hoodie",
  "Wide leg jeans",
  "Chunky boots",
];

const suggestions = [
  { id: 1, name: "Oversized Comfort Hoodie", category: "Hoodies", price: "$128" },
  { id: 2, name: "Essential White Tee", category: "Basics", price: "$48" },
  { id: 3, name: "Vintage Denim Jacket", category: "Jackets", price: "$156" },
  { id: 4, name: "Tech Utility Pants", category: "Bottoms", price: "$142" },
];

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = query
    ? suggestions.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-6 border-b border-[#2C2C2C]/10">
              <div className="relative">
                <Search 
                  size={24} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40"
                />
                <motion.input
                  type="text"
                  placeholder="Search for styles, vibes, pieces..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoFocus
                  className="w-full pl-14 pr-12 py-4 bg-[#F5F3F0] rounded-[20px] text-lg outline-none transition-all"
                  animate={{
                    backgroundColor: isFocused ? "#E5E3E0" : "#F5F3F0",
                  }}
                />
                <motion.button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2C2C2C]/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "#2C2C2C20" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[500px] overflow-y-auto p-6">
              {!query ? (
                <>
                  {/* Trending Searches */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp size={18} className="text-[#9BA888]" />
                      <h3 className="text-sm text-[#2C2C2C]/60">Trending Now</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term, index) => (
                        <motion.button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-[#F5F3F0] rounded-full text-sm hover:bg-[#9BA888] hover:text-white transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={18} className="text-[#7B9CAC]" />
                      <h3 className="text-sm text-[#2C2C2C]/60">Recent</h3>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((term, index) => (
                        <motion.button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="w-full text-left px-4 py-3 rounded-[16px] hover:bg-[#F5F3F0] transition-colors group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-[#2C2C2C]">{term}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Search Results */
                <div>
                  <h3 className="text-sm text-[#2C2C2C]/60 mb-4">
                    {filteredSuggestions.length} results
                  </h3>
                  <div className="space-y-3">
                    {filteredSuggestions.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-[20px] hover:bg-[#F5F3F0] transition-colors cursor-pointer group"
                        whileHover={{ x: 5 }}
                      >
                        <div>
                          <h4 className="mb-1 group-hover:text-[#7B9CAC] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#2C2C2C]/60">{item.category}</p>
                        </div>
                        <motion.span
                          className="text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.price}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
