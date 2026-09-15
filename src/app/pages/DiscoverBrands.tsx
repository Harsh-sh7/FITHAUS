import { motion } from "motion/react";
import { useState } from "react";
import { Search, TrendingUp, Star, ArrowLeft, Check, Plus } from "lucide-react";
import { Link } from "react-router";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";

const categories = [
  { id: "all", label: "All Brands" },
  { id: "sneakers", label: "Sneakers" },
  { id: "streetwear", label: "Streetwear" },
  { id: "luxury", label: "Luxury" },
  { id: "athletic", label: "Athletic" },
  { id: "minimal", label: "Minimal" },
];

const brands = [
  {
    id: "nike",
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "2.8M",
    posts: 1247,
    category: "athletic",
    verified: true,
    tagline: "Just Do It",
  },
  {
    id: "adidas",
    name: "adidas Originals",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "2.1M",
    posts: 983,
    category: "athletic",
    verified: true,
    tagline: "Impossible is Nothing",
  },
  {
    id: "stussy",
    name: "Stüssy",
    logo: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "1.2M",
    posts: 654,
    category: "streetwear",
    verified: true,
    tagline: "Since 1980",
  },
  {
    id: "zara",
    name: "ZARA",
    logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "3.4M",
    posts: 2104,
    category: "minimal",
    verified: true,
    tagline: "Love Your Choices",
  },
  {
    id: "newbalance",
    name: "New Balance",
    logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "890K",
    posts: 543,
    category: "sneakers",
    verified: true,
    tagline: "Run Your Way",
  },
  {
    id: "carhartt",
    name: "Carhartt WIP",
    logo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    followers: "1.5M",
    posts: 789,
    category: "streetwear",
    verified: true,
    tagline: "Work In Progress",
  },
];

export default function DiscoverBrands() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [followedBrands, setFollowedBrands] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredBrands = brands.filter((brand) => {
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFollow = (brandId: string) => {
    setFollowedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      <div className="pt-[60px] pb-24 md:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl mb-2 text-[#2C2C2C]">
                <span className="font-bold">Discover</span>
                <span className="font-light italic text-[#2C2C2C]/40"> Brands</span>
              </h1>
              <p className="text-[#2C2C2C]/60">Follow your favorite brands and never miss a drop</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-[20px] outline-none focus:ring-2 focus:ring-[#2C2C2C]/10 shadow-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-[#2C2C2C] text-white"
                    : "bg-white text-[#2C2C2C]"
                }`}
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

          {/* Featured Brands */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={22} className="text-[#7B9CAC]" />
              <h2 className="text-2xl">
                <span className="font-semibold">Trending</span>
                <span className="font-light italic text-[#2C2C2C]/40"> This Week</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {filteredBrands.slice(0, 2).map((brand, index) => (
                <Link key={brand.id} to={`/brand/${brand.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="relative h-80 rounded-[28px] overflow-hidden group bg-white"
                  >
                    {/* Cover Image */}
                    <img
                      src={brand.coverImage}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-end gap-4 mb-4">
                        <motion.div
                          className="w-20 h-20 rounded-[20px] overflow-hidden border-4 border-white bg-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-white font-bold text-xl">{brand.name}</p>
                            {brand.verified && (
                              <svg className="w-5 h-5 text-[#7B9CAC]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            )}
                          </div>
                          <p className="text-white/70 text-sm mb-3">{brand.tagline}</p>
                          <div className="flex gap-4 text-sm text-white/90">
                            <span className="font-medium">{brand.followers} followers</span>
                            <span>{brand.posts} posts</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFollow(brand.id);
                        }}
                        className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 ${
                          followedBrands.includes(brand.id)
                            ? "bg-white/20 text-white backdrop-blur-sm"
                            : "bg-white text-[#2C2C2C]"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {followedBrands.includes(brand.id) ? (
                          <>
                            <Check size={18} />
                            Following
                          </>
                        ) : (
                          <>
                            <Plus size={18} />
                            Follow
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Brands */}
          <div className="mb-6">
            <h2 className="text-2xl mb-6">
              <span className="font-semibold">All Brands</span>
              <span className="text-[#2C2C2C]/40 text-lg ml-2">({filteredBrands.length})</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand, index) => (
              <Link key={brand.id} to={`/brand/${brand.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-sm"
                >
                  {/* Cover */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={brand.coverImage}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-0">
                    <div className="flex items-end -mt-10 mb-4 relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-[16px] overflow-hidden border-4 border-white bg-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      {brand.verified && (
                        <motion.div
                          className="ml-auto mb-2"
                          initial={{ rotate: -45, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          <svg className="w-5 h-5 text-[#7B9CAC]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    <h3 className="font-bold text-lg mb-1">{brand.name}</h3>
                    <p className="text-sm text-[#2C2C2C]/60 mb-4">{brand.tagline}</p>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div>
                        <p className="font-medium">{brand.followers}</p>
                        <p className="text-xs text-[#2C2C2C]/60">Followers</p>
                      </div>
                      <div>
                        <p className="font-medium">{brand.posts}</p>
                        <p className="text-xs text-[#2C2C2C]/60">Posts</p>
                      </div>
                    </div>

                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFollow(brand.id);
                      }}
                      className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 ${
                        followedBrands.includes(brand.id)
                          ? "bg-[#F5F3F0] text-[#2C2C2C]"
                          : "bg-[#2C2C2C] text-white"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {followedBrands.includes(brand.id) ? (
                        <>
                          <Check size={18} />
                          Following
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          Follow
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
