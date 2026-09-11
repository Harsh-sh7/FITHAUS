import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FeedPost } from "../components/FeedPost";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";

const feedPosts = [
  {
    id: "1",
    category: "Streetwear",
    creator: {
      id: "style.maven",
      username: "style.maven",
      avatar: "https://images.unsplash.com/photo-1612266686586-70af879c032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      isFollowing: false,
    },
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwb3ZlcnNpemVkJTIwaG9vZGllfGVufDF8fHx8MTc4MDM4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "cozy vibes for the weekend 🤎 living in oversized everything rn",
    likes: 2847,
    comments: 124,
    timestamp: "2h ago",
    products: [
      { id: "p1", name: "Oversized Comfort Hoodie", price: "$128", brand: "FITHAUS", x: 30, y: 40, sizes: ["S", "M", "L", "XL"], inStock: true },
      { id: "p2", name: "Relaxed Cargo Pants", price: "$98", brand: "FITHAUS", x: 50, y: 70, sizes: ["28", "30", "32", "34"], inStock: true },
      { id: "p3", name: "Classic Sneakers", price: "$140", brand: "Urban Kicks", x: 60, y: 85, sizes: ["8", "9", "10", "11", "12"], inStock: true },
    ],
  },
  {
    id: "2",
    category: "Sportswear",
    creator: {
      id: "urbanfit.daily",
      username: "urbanfit.daily",
      avatar: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      isFollowing: true,
    },
    image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMHVyYmFuJTIwZmFzaGlvbiUyMGJsYWNrfGVufDF8fHx8MTc4MDM4MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "techwear season activated ⚡️ utility meets style",
    likes: 3521,
    comments: 203,
    timestamp: "5h ago",
    products: [
      { id: "p4", name: "Tech Utility Vest", price: "$156", brand: "TechWear Co", x: 45, y: 35, sizes: ["S", "M", "L", "XL"], inStock: true },
      { id: "p5", name: "Performance Pants", price: "$142", brand: "TechWear Co", x: 50, y: 65, sizes: ["30", "32", "34", "36"], inStock: true },
    ],
  },
  {
    id: "3",
    category: "Vintage",
    creator: {
      id: "fits.archive",
      username: "fits.archive",
      avatar: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      isFollowing: false,
    },
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc4MDMwNTQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "vintage finds never miss 🔥 thrifted this gem last week",
    likes: 1923,
    comments: 87,
    timestamp: "1d ago",
    products: [
      { id: "p6", name: "Vintage Denim Jacket", price: "$156", brand: "Vintage Archive", x: 40, y: 45, sizes: ["S", "M", "L", "XL"], inStock: true },
      { id: "p7", name: "Essential White Tee", price: "$48", brand: "FITHAUS", x: 50, y: 60, sizes: ["S", "M", "L", "XL"], inStock: true },
    ],
  },
  {
    id: "4",
    category: "Minimal",
    creator: {
      id: "minimal.mood",
      username: "minimal.mood",
      avatar: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      isFollowing: true,
    },
    image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBibGF6ZXIlMjBtaW5pbWFsJTIwZmFzaGlvbnxlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "less is more 🤍 minimal but make it statement",
    likes: 4102,
    comments: 156,
    timestamp: "1d ago",
    products: [
      { id: "p8", name: "Minimal Blazer", price: "$188", brand: "FITHAUS", x: 45, y: 40, sizes: ["S", "M", "L", "XL"], inStock: true },
      { id: "p9", name: "Wide Leg Trousers", price: "$124", brand: "Minimal Co", x: 50, y: 75, sizes: ["XS", "S", "M", "L"], inStock: true },
    ],
  },
];

const trendingCreators = [
  {
    id: "y2k.queen",
    username: "y2k.queen",
    avatar: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    followers: "342K",
    posts: 847,
  },
  {
    id: "street.culture",
    username: "street.culture",
    avatar: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    followers: "521K",
    posts: 1203,
  },
  {
    id: "layered.looks",
    username: "layered.looks",
    avatar: "https://images.unsplash.com/photo-1519220279207-fddf068f2141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    followers: "198K",
    posts: 456,
  },
];

export default function Feed() {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const stored = localStorage.getItem("fithaus_cart");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("fithaus_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"foryou" | "following">("foryou");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const filteredPosts = feedPosts.filter((post) => {
    const matchesTab = activeTab === "foryou" || post.creator.isFollowing;
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesTab && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <MobileNav />

      {/* Main Feed */}
      <div className="pt-[60px] pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto">

          {/* Tab Navigation */}
          <div className="bg-white border-b border-[#2C2C2C]/10 px-6 py-2 flex items-center gap-6 mb-1">
            <button
              onClick={() => setActiveTab("foryou")}
              className={`pb-3 pt-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "foryou"
                  ? "border-[#2C2C2C] text-[#2C2C2C]"
                  : "border-transparent text-[#2C2C2C]/40"
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`pb-3 pt-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "following"
                  ? "border-[#2C2C2C] text-[#2C2C2C]"
                  : "border-transparent text-[#2C2C2C]/40"
              }`}
            >
              Following
            </button>
          </div>

          {/* Stories/Categories Bar */}
          <div className="bg-white border-b border-[#2C2C2C]/10 px-4 py-3 mb-1">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {["All", "Sneakers", "Streetwear", "Minimal", "Sportswear", "Vintage"].map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-[#2C2C2C] text-white"
                      : "bg-[#F5F3F0] text-[#2C2C2C]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>


          {/* Posts */}
          <div>
            {filteredPosts.map((post) => (
              <FeedPost key={post.id} post={post} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Load More */}
          <motion.div
            className="bg-white py-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              className="px-8 py-3 bg-[#2C2C2C] text-white rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Fits
            </motion.button>
          </motion.div>
        </div>
      </div>

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