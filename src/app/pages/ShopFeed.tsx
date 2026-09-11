import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { BrandPost } from "../components/BrandPost";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";

const brandPosts = [
  {
    id: "1",
    category: "Sportswear",
    brand: {
      id: "nike",
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Elevated comfort meets street-ready style. The new Air Max collection drops tomorrow 🔥",
    likes: 24783,
    comments: 432,
    timestamp: "2h ago",
    products: [
      {
        id: "nike-air-max-1",
        name: "Air Max 97 SE",
        price: 175,
        salePrice: 140,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        x: 55,
        y: 88,
      },
      {
        id: "nike-hoodie-1",
        name: "Tech Fleece Hoodie",
        price: 120,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        x: 45,
        y: 30,
      },
    ],
  },
  {
    id: "2",
    category: "Streetwear",
    brand: {
      id: "stussy",
      name: "Stüssy",
      logo: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Fall '24 collection. Oversized silhouettes, vintage washes. Available now.",
    likes: 18293,
    comments: 287,
    timestamp: "5h ago",
    products: [
      {
        id: "stussy-tee-1",
        name: "Vintage Wash Logo Tee",
        price: 45,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        x: 52,
        y: 35,
      },
    ],
  },
  {
    id: "3",
    category: "Minimal",
    brand: {
      id: "zara",
      name: "ZARA",
      logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Effortless elegance. New arrivals that redefine modern minimalism ✨",
    likes: 31204,
    comments: 521,
    timestamp: "8h ago",
    products: [
      {
        id: "zara-blazer-1",
        name: "Structured Double Breasted Blazer",
        price: 129,
        salePrice: 89,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        x: 48,
        y: 32,
      },
      {
        id: "zara-pants-1",
        name: "Wide Leg Trousers",
        price: 59,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        x: 52,
        y: 68,
      },
    ],
  },
  {
    id: "4",
    category: "Sportswear",
    brand: {
      id: "adidas",
      name: "adidas Originals",
      logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Retro vibes, modern performance. The Forum collection is here 🏀",
    likes: 19847,
    comments: 356,
    timestamp: "12h ago",
    products: [
      {
        id: "adidas-forum-1",
        name: "Forum Low Classic",
        price: 110,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["7", "8", "9", "10", "11", "12", "13"],
        inStock: true,
        x: 58,
        y: 85,
      },
      {
        id: "adidas-track-1",
        name: "Adicolor Classics Track Jacket",
        price: 85,
        image: "https://images.unsplash.com/photo-1614252368036-9a3d8f6b7f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        x: 46,
        y: 28,
      },
    ],
  },
  {
    id: "5",
    category: "Sneakers",
    brand: {
      id: "newbalance",
      name: "New Balance",
      logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Made in USA. The 990v6 continues the legacy of premium craftsmanship.",
    likes: 15632,
    comments: 198,
    timestamp: "1d ago",
    products: [
      {
        id: "nb-990-1",
        name: "990v6 Made in USA",
        price: 199,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        x: 54,
        y: 82,
      },
    ],
  },
  {
    id: "6",
    category: "Streetwear",
    brand: {
      id: "carhartt",
      name: "Carhartt WIP",
      logo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=200&h=200&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Workwear heritage meets contemporary street style. Essential layering pieces for the season.",
    likes: 22156,
    comments: 289,
    timestamp: "1d ago",
    products: [
      {
        id: "carhartt-jacket-1",
        name: "Detroit Jacket",
        price: 169,
        salePrice: 135,
        image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        x: 50,
        y: 35,
      },
    ],
  },
];

export default function ShopFeed() {
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

    // Show cart briefly to confirm addition
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 2000);
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

      {/* Main Feed */}
      <div className="pt-[60px] pb-24 md:pb-12">
        <div className="max-w-2xl mx-auto">

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
          {brandPosts
            .filter((post) => activeCategory === "All" || post.category === activeCategory)
            .map((post) => (
              <BrandPost key={post.id} post={post} onAddToCart={handleAddToCart} />
            ))}

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
              Load More
            </motion.button>
          </motion.div>
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
