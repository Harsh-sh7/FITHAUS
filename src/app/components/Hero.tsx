import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '../App';

interface HeroProps {
  onAddToCart: (product: Product) => void;
}

export function Hero({ onAddToCart }: HeroProps) {
  const heroProducts: Product[] = [
    {
      id: 'hero-1',
      name: 'Archive Hoodie',
      price: 128,
      image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMGhvb2RpZSUyMG1vZGVsfGVufDF8fHx8MTc4MDM4MzE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Streetwear',
    },
    {
      id: 'hero-2',
      name: 'Oversized Cargo',
      price: 145,
      image: 'https://images.unsplash.com/photo-1760998209708-5fc89d7983c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBjYXJnbyUyMHBhbnRzJTIwdXJiYW58ZW58MXx8fHwxNzgwMzgzMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Oversized',
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 pb-20">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Featured Product - Takes more space */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 relative group"
        >
          <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] lg:aspect-[3/4] bg-neutral-200">
            <motion.img
              src={heroProducts[0].image}
              alt={heroProducts[0].name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-3 inline-block">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/30">
                    New Drop
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl text-white mb-3 tracking-tight">
                  {heroProducts[0].name}
                </h1>
                <p className="text-xl text-white/90 mb-6">Premium streetwear essential</p>
                <div className="flex items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="rounded-full bg-white text-neutral-900 hover:bg-white/90 px-8 shadow-lg"
                      onClick={() => onAddToCart(heroProducts[0])}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart · ${heroProducts[0].price}
                    </Button>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stacked Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
          {/* Top Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group overflow-hidden rounded-[32px] aspect-[16/10] bg-neutral-200"
          >
            <motion.img
              src={heroProducts[1].image}
              alt={heroProducts[1].name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl text-white mb-2">{heroProducts[1].name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg text-white/90">${heroProducts[1].price}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white"
                  onClick={() => onAddToCart(heroProducts[1])}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Text Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 bg-[#81A4CD] rounded-[32px] p-8 lg:p-10 flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-white/80 mb-3 tracking-wide uppercase">Curated Selection</p>
              <h2 className="text-3xl lg:text-4xl text-white mb-4 leading-tight">
                Your vibe,
                <br />
                perfected.
              </h2>
              <p className="text-white/80 leading-relaxed">
                AI-powered recommendations that understand your unique style DNA.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'New This Week', value: '47' },
          { label: 'Trending Fits', value: '124' },
          { label: 'Active Creators', value: '89' },
          { label: 'Happy Customers', value: '12K+' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-neutral-200/50"
          >
            <div className="text-3xl mb-1 text-neutral-900">{stat.value}</div>
            <div className="text-sm text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
