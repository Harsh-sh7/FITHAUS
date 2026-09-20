import { motion } from 'motion/react';
import { Heart, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '../App';

interface CreatorPicksProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

interface Creator {
  name: string;
  avatar: string;
  followers: string;
  picks: Product[];
}

const creators: Creator[] = [
  {
    name: '@stylebyalex',
    avatar: 'https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
    followers: '124K',
    picks: [
      {
        id: 'creator-1-1',
        name: 'Urban Utility Jacket',
        price: 185,
        image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
        category: 'Streetwear',
      },
      {
        id: 'creator-1-2',
        name: 'Relaxed Denim',
        price: 125,
        image: 'https://images.unsplash.com/photo-1741941171881-40832346c7fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
        category: 'Vintage',
      },
    ],
  },
  {
    name: '@minimalist.maven',
    avatar: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100',
    followers: '89K',
    picks: [
      {
        id: 'creator-2-1',
        name: 'Essential Basics Set',
        price: 95,
        image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
        category: 'Minimal',
      },
      {
        id: 'creator-2-2',
        name: 'Cloud Sneakers',
        price: 180,
        image: 'https://images.unsplash.com/photo-1626379625260-7111605463e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
        category: 'Minimal',
      },
    ],
  },
];

const trending: Product[] = [
  {
    id: 'trend-1',
    name: 'Cargo Revival',
    price: 145,
    image: 'https://images.unsplash.com/photo-1760998209708-5fc89d7983c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    category: 'Oversized',
  },
  {
    id: 'trend-2',
    name: 'Y2K Comeback',
    price: 95,
    image: 'https://images.unsplash.com/photo-1752761420007-26f707bb2d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    category: 'Y2K',
  },
  {
    id: 'trend-3',
    name: 'Tech Backpack',
    price: 145,
    image: 'https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500',
    category: 'Techwear',
  },
];

export function CreatorPicks({
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: CreatorPicksProps) {
  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
      {/* Creator Picks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="mb-8">
          <div className="inline-block mb-3">
            <span className="px-4 py-1.5 bg-[#E07A5F]/20 text-[#E07A5F] rounded-full text-sm border border-[#E07A5F]/30 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Creator Curated
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-2">
            Community Favorites
          </h2>
          <p className="text-neutral-600">Handpicked by our style creators</p>
        </div>

        <div className="space-y-8">
          {creators.map((creator, i) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-[40px] p-6 lg:p-8 border border-neutral-200/50"
            >
              {/* Creator Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-200">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-neutral-900">{creator.name}</h3>
                  <p className="text-neutral-600">{creator.followers} followers</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Follow
                </motion.button>
              </div>

              {/* Picks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {creator.picks.map((pick) => (
                  <motion.div
                    key={pick.id}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-3xl bg-neutral-200"
                  >
                    <div className="aspect-[4/5] relative">
                      <img
                        src={pick.image}
                        alt={pick.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Wishlist */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${
                          isInWishlist(pick.id)
                            ? 'bg-[#E07A5F] text-white'
                            : 'bg-white/20 text-white border border-white/30'
                        }`}
                        onClick={() => onToggleWishlist(pick)}
                      >
                        <Heart
                          className="w-4 h-4"
                          fill={isInWishlist(pick.id) ? 'currentColor' : 'none'}
                        />
                      </motion.button>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <h4 className="text-lg text-white mb-2">{pick.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-white">${pick.price}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white text-neutral-900 rounded-full text-sm flex items-center gap-2"
                            onClick={() => onAddToCart(pick)}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Add
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trending Fits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-8">
          <div className="inline-block mb-3">
            <span className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending Now
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-2">
            What's Hot
          </h2>
          <p className="text-neutral-600">Top picks across the community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {trending.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[32px] bg-neutral-200 aspect-[3/4]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />

              {/* Fire Badge */}
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/30">
                  🔥 Trending
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl text-white mb-2">{item.name}</h3>
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
        </div>
      </motion.div>
    </section>
  );
}
