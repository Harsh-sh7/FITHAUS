import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Grid3x3, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Product } from '../App';

interface WishlistProps {
  wishlist: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ wishlist, onRemove, onAddToCart }: WishlistProps) {
  const [viewMode, setViewMode] = useState<'moodboard' | 'grid'>('moodboard');

  if (wishlist.length === 0) {
    return (
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-neutral-400" />
          </div>
          <h2 className="text-3xl text-neutral-900 mb-3">Your Wishlist is Empty</h2>
          <p className="text-neutral-600 mb-8">
            Start adding items you love to create your style moodboard
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-block mb-3">
              <span className="px-4 py-1.5 bg-[#E07A5F]/20 text-[#E07A5F] rounded-full text-sm border border-[#E07A5F]/30 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {wishlist.length} items
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-2">
              Your Wishlist
            </h2>
            <p className="text-neutral-600">Your personal style collection</p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-full p-1 border border-neutral-200">
            <button
              onClick={() => setViewMode('moodboard')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'moodboard'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'moodboard' ? (
            <motion.div
              key="moodboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6"
            >
              {wishlist.map((item, index) => {
                // Vary heights for masonry effect
                const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/5]'];
                const heightClass = heights[index % heights.length];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-[32px] bg-neutral-200 mb-4 lg:mb-6 break-inside-avoid ${heightClass}`}
                    whileHover={{ y: -6 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Remove Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#E07A5F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      onClick={() => onRemove(item.id)}
                    >
                      <Heart className="w-4 h-4" fill="currentColor" />
                    </motion.button>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs border border-white/30">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg text-white mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-white">${item.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-white text-neutral-900 rounded-full text-sm flex items-center gap-2"
                          onClick={() => onAddToCart(item)}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[28px] bg-neutral-200 aspect-[3/4]"
                  whileHover={{ y: -6 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Remove Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#E07A5F] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    onClick={() => onRemove(item.id)}
                  >
                    <Heart className="w-4 h-4" fill="currentColor" />
                  </motion.button>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs border border-white/30">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg text-white mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-white">${item.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white text-neutral-900 rounded-full text-sm flex items-center gap-2"
                        onClick={() => onAddToCart(item)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-neutral-900 hover:bg-neutral-800 px-8"
            onClick={() => {
              wishlist.forEach(item => onAddToCart(item));
            }}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add All to Cart
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-neutral-300 hover:bg-neutral-100 px-8"
          >
            Share Collection
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
