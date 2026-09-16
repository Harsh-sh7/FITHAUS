import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Search, TrendingUp, Star, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";

const categories = [
  { id: "all", label: "All", color: "#7B9CAC" },
  { id: "streetwear", label: "Streetwear", color: "#7B9CAC" },
  { id: "minimal", label: "Minimal", color: "#9BA888" },
  { id: "y2k", label: "Y2K", color: "#D4927D" },
  { id: "techwear", label: "Techwear", color: "#2C2C2C" },
  { id: "vintage", label: "Vintage", color: "#D4927D" },
];

const creators = [
  {
    id: "style.maven",
    username: "style.maven",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1612266686586-70af879c032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "284K",
    posts: 547,
    category: "streetwear",
    verified: true,
  },
  {
    id: "minimal.mood",
    username: "minimal.mood",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "421K",
    posts: 892,
    category: "minimal",
    verified: true,
  },
  {
    id: "y2k.queen",
    username: "y2k.queen",
    name: "Maya Rodriguez",
    avatar: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "342K",
    posts: 847,
    category: "y2k",
    verified: true,
  },
  {
    id: "urbanfit.daily",
    username: "urbanfit.daily",
    name: "James Park",
    avatar: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "521K",
    posts: 1203,
    category: "techwear",
    verified: true,
  },
  {
    id: "fits.archive",
    username: "fits.archive",
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "198K",
    posts: 456,
    category: "vintage",
    verified: false,
  },
  {
    id: "street.culture",
    username: "street.culture",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    coverImage: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "678K",
    posts: 1547,
    category: "streetwear",
    verified: true,
  },
];

export default function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mode, setMode] = useState("brands");

  useEffect(() => {
    const stored = localStorage.getItem("fithaus_mode");
    if (stored === "brands" || stored === "creators") {
      setMode(stored);
    }
  }, []);

  const handleRemoveItem = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const filteredCreators = creators.filter((creator) => {
    const matchesCategory = selectedCategory === "all" || creator.category === selectedCategory;
    const matchesSearch = creator.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <MobileNav />

      <div className="pt-[60px] pb-24 md:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Link to={mode === "creators" ? "/feed" : "/"}>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#E5E3E0] border border-[#2C2C2C]/5 transition-colors text-[#2C2C2C] shadow-sm"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} />
                </motion.button>
              </Link>
              <h1 className="text-4xl md:text-5xl mb-2 text-[#2C2C2C]">
                <span className="font-semibold">Discover</span>
                <span className="font-light italic text-[#2C2C2C]/40"> Creators</span>
              </h1>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creators..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-[20px] outline-none focus:ring-2 focus:ring-[#7B9CAC] shadow-sm text-[#2C2C2C]"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-3 rounded-full whitespace-nowrap text-sm transition-all flex-shrink-0 font-medium"
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : "white",
                  color: selectedCategory === category.id ? "white" : "#2C2C2C",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Trending Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-[#7B9CAC]" />
              <h2 className="text-2xl text-[#2C2C2C]">
                <span className="font-semibold">Trending</span>
                <span className="text-[#2C2C2C]/40 font-light italic"> This Week</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCreators.slice(0, 2).map((creator) => (
                <Link key={creator.id} to={`/creator/${creator.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative h-96 rounded-[32px] overflow-hidden group shadow-xl"
                  >
                    <img
                      src={creator.coverImage}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end gap-4">
                        <motion.div
                          className="w-16 h-16 rounded-full overflow-hidden border-3 border-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-white font-medium">{creator.name}</p>
                            {creator.verified && (
                              <Star size={16} className="text-[#9BA888]" fill="#9BA888" />
                            )}
                          </div>
                          <p className="text-white/70 text-sm">@{creator.username}</p>
                          <div className="flex gap-4 mt-2 text-sm text-white/80">
                            <span>{creator.followers} followers</span>
                            <span>{creator.posts} posts</span>
                          </div>
                        </div>
                        <motion.button
                          className="px-5 py-2 bg-white text-[#2C2C2C] rounded-full font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.preventDefault()}
                        >
                          Follow
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* All Creators */}
          <div className="mb-6">
            <h2 className="text-2xl mb-6 text-[#2C2C2C]">
              <span className="font-semibold">All Creators</span>
              <span className="text-[#2C2C2C]/40 text-lg ml-2">({filteredCreators.length})</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator, index) => (
              <Link key={creator.id} to={`/creator/${creator.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-lg shadow-black/5"
                >
                  {/* Cover */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={creator.coverImage}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0 text-[#2C2C2C]">
                    <div className="flex items-end -mt-8 mb-4 relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-full overflow-hidden border-4 border-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      {creator.verified && (
                        <motion.div
                          className="ml-auto mb-2"
                          initial={{ rotate: -45, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <Star size={20} className="text-[#9BA888]" fill="#9BA888" />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="font-medium mb-1">{creator.name}</h3>
                    <p className="text-sm text-[#2C2C2C]/60 mb-4">@{creator.username}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-4 text-sm">
                        <div>
                          <p className="font-medium">{creator.followers}</p>
                          <p className="text-xs text-[#2C2C2C]/60">Followers</p>
                        </div>
                        <div>
                          <p className="font-medium">{creator.posts}</p>
                          <p className="text-xs text-[#2C2C2C]/60">Posts</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="w-full py-3 bg-[#2C2C2C] text-white rounded-full font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Follow
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
