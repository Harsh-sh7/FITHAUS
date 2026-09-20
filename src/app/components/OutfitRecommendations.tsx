import { useRef } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../App';
import { Button } from './ui/button';

interface OutfitRecommendationsProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

interface Outfit {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  items: Product[];
  totalPrice: number;
  image: string;
}

const outfits: Outfit[] = [
  {
    id: 'outfit-1',
    title: 'Urban Explorer',
    description: 'Perfect for city adventures',
    matchScore: 98,
    totalPrice: 385,
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMGhvb2RpZSUyMG1vZGVsfGVufDF8fHx8MTc4MDM4MzE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    items: [
      { id: 'outfit-1-1', name: 'Archive Hoodie', price: 128, image: '', category: 'Streetwear' },
      { id: 'outfit-1-2', name: 'Cargo Pants', price: 145, image: '', category: 'Streetwear' },
      { id: 'outfit-1-3', name: 'Street Sneakers', price: 112, image: '', category: 'Streetwear' },
    ],
  },
  {
    id: 'outfit-2',
    title: 'Minimal Mood',
    description: 'Clean and sophisticated',
    matchScore: 95,
    totalPrice: 340,
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbWluaW1hbGlzdCUyMGNsb3RoaW5nfGVufDF8fHx8MTc4MDM4MzE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    items: [
      { id: 'outfit-2-1', name: 'Minimal Tee', price: 85, image: '', category: 'Minimal' },
      { id: 'outfit-2-2', name: 'Wide Leg Trousers', price: 135, image: '', category: 'Minimal' },
      { id: 'outfit-2-3', name: 'Cloud Sneakers', price: 120, image: '', category: 'Minimal' },
    ],
  },
  {
    id: 'outfit-3',
    title: 'Y2K Dream',
    description: 'Nostalgic and bold',
    matchScore: 92,
    totalPrice: 295,
    image: 'https://images.unsplash.com/photo-1752761420007-26f707bb2d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5MmslMjBmYXNoaW9uJTIwY29sb3JmdWwlMjByZXRyb3xlbnwxfHx8fDE3ODAzODMxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    items: [
      { id: 'outfit-3-1', name: 'Y2K Crop Top', price: 65, image: '', category: 'Y2K' },
      { id: 'outfit-3-2', name: 'Low Rise Jeans', price: 115, image: '', category: 'Y2K' },
      { id: 'outfit-3-3', name: 'Platform Sneakers', price: 115, image: '', category: 'Y2K' },
    ],
  },
  {
    id: 'outfit-4',
    title: 'Tech Forward',
    description: 'Future-ready style',
    matchScore: 89,
    totalPrice: 425,
    image: 'https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwbW9kZWwlMjB1cmJhbnxlbnwxfHx8fDE3ODAzODMxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    items: [
      { id: 'outfit-4-1', name: 'Tech Jacket', price: 195, image: '', category: 'Techwear' },
      { id: 'outfit-4-2', name: 'Tech Pants', price: 145, image: '', category: 'Techwear' },
      { id: 'outfit-4-3', name: 'Tech Backpack', price: 85, image: '', category: 'Techwear' },
    ],
  },
];

export function OutfitRecommendations({
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: OutfitRecommendationsProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 flex items-end justify-between"
      >
        <div>
          <div className="inline-block mb-3">
            <span className="px-4 py-1.5 bg-[#98BF91]/20 text-[#98BF91] rounded-full text-sm border border-[#98BF91]/30">
              AI Powered
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-2">
            Outfits For You
          </h2>
          <p className="text-neutral-600">Curated based on your style profile</p>
        </div>

        <div className="hidden lg:flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-neutral-300 hover:bg-neutral-200"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-neutral-300 hover:bg-neutral-200"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      <Slider ref={sliderRef} {...settings}>
        {outfits.map((outfit, index) => (
          <div key={outfit.id} className="px-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-[32px] bg-white shadow-lg border border-neutral-200/50 mb-4">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={outfit.image}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                  {/* Match Score */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#98BF91] rounded-full animate-pulse" />
                      <span className="text-sm">{outfit.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Wishlist */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>

                  {/* Info at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl text-white mb-1">{outfit.title}</h3>
                    <p className="text-white/80 text-sm">{outfit.description}</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    {outfit.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-neutral-700">{item.name}</span>
                        <span className="text-neutral-900">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-neutral-700">Total</span>
                      <span className="text-xl text-neutral-900">${outfit.totalPrice}</span>
                    </div>

                    <Button
                      className="w-full rounded-full bg-neutral-900 hover:bg-neutral-800"
                      onClick={() => {
                        outfit.items.forEach((item) => onAddToCart(item));
                      }}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add Complete Outfit
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
