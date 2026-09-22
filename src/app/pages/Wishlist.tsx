import { motion } from "motion/react";
import { ArrowLeft, Heart, Trash2, ShoppingBag, Grid3x3, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";

const mockWishlistItems = [
  {
    id: 1,
    name: "Oversized Comfort Hoodie",
    price: "$128",
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsJTIwb3ZlcnNpemVkJTIwaG9vZGllfGVufDF8fHx8MTc4MDM4MzE2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Summer Vibes",
  },
  {
    id: 2,
    name: "Vintage Denim Jacket",
    price: "$156",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc4MDMwNTQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Summer Vibes",
  },
  {
    id: 3,
    name: "Essential White Tee",
    price: "$48",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2xvdGhpbmclMjB3aGl0ZSUyMHRzaGlydHxlbnwxfHx8fDE3ODAzODMxNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Basics",
  },
  {
    id: 4,
    name: "Tech Utility Pants",
    price: "$142",
    image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMHVyYmFuJTIwZmFzaGlvbiUyMGJsYWNrfGVufDF8fHx8MTc4MDM4MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Tech Forward",
  },
  {
    id: 5,
    name: "Y2K Cargo Pants",
    price: "$142",
    image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5MmslMjBmYXNoaW9uJTIwY2FyZ28lMjBwYW50c3xlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Summer Vibes",
  },
  {
    id: 6,
    name: "Minimal Blazer",
    price: "$188",
    image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBibGF6ZXIlMjBtaW5pbWFsJTIwZmFzaGlvbnxlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    collection: "Basics",
  },
];

export default function Wishlist() {
  const [items, setItems] = useState(mockWishlistItems);
  const [viewMode, setViewMode] = useState<"grid" | "moodboard">("moodboard");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("fithaus_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const size = "M";
      const itemUniqueId = `${product.id}-${size}`;
      const existing = prev.find((i) => i.id === itemUniqueId);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((i) =>
          i.id === itemUniqueId ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        const numericPrice = typeof product.price === 'number' 
          ? product.price 
          : parseFloat(product.price.toString().replace('$', ''));
          
        updatedCart = [
          ...prev,
          {
            id: itemUniqueId,
            name: product.name,
            price: numericPrice,
            size: size,
            image: product.image,
            brand: "FITHAUS",
            quantity: 1,
          },
        ];
      }
      localStorage.setItem("fithaus_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      localStorage.setItem("fithaus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveCartItem = (id: string | number) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("fithaus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveWishlistItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const collections = Array.from(new Set(items.map((item) => item.collection)));

  const filteredItems = selectedCollection
    ? items.filter((item) => item.collection === selectedCollection)
    : items;

  return (
    <div className="min-h-screen bg-[#F5F3F0] pt-[76px] pb-28">
      {/* Header */}
      <div className="bg-white border-b border-[#2C2C2C]/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </motion.button>
            </Link>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-full transition-colors ${
                  viewMode === "grid" ? "bg-[#7B9CAC] text-white" : "bg-[#F5F3F0]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3x3 size={20} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("moodboard")}
                className={`p-3 rounded-full transition-colors ${
                  viewMode === "moodboard" ? "bg-[#7B9CAC] text-white" : "bg-[#F5F3F0]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutGrid size={20} />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2">
                <span className="font-light">Your</span>{" "}
                <span className="font-semibold">Wishlist</span>
              </h1>
              <p className="text-[#2C2C2C]/60">{items.length} saved items</p>
            </div>

            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-[#D4927D]/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Heart size={18} className="text-[#D4927D]" fill="#D4927D" />
              <span className="text-sm">All saved</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Collections Filter */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <motion.button
            onClick={() => setSelectedCollection(null)}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
              !selectedCollection
                ? "bg-[#2C2C2C] text-white"
                : "bg-white text-[#2C2C2C]"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            All Items
          </motion.button>
          {collections.map((collection) => (
            <motion.button
              key={collection}
              onClick={() => setSelectedCollection(collection)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCollection === collection
                  ? "bg-[#2C2C2C] text-white"
                  : "bg-white text-[#2C2C2C]"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {collection}
            </motion.button>
          ))}
        </div>

        {/* Items Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-lg shadow-black/5 group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <motion.div
                    className="absolute top-3 right-3 flex gap-2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveWishlistItem(item.id);
                      }}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} className="text-[#D4927D]" />
                    </motion.button>
                  </motion.div>
                </div>
                
                <div className="p-4">
                  <h3 className="mb-2 text-sm">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-[#7B9CAC]">{item.price}</span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center cursor-pointer hover:bg-[#7B9CAC] hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingBag size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Moodboard View */
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, rotate: Math.random() * 6 - 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, rotate: Math.random() * 4 - 2, y: -8 }}
                className="break-inside-avoid relative group cursor-pointer"
                style={{
                  marginTop: index % 2 === 0 ? "0" : "1rem",
                }}
              >
                <div className="bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/5 p-3">
                  <div className="relative rounded-[16px] overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{
                        aspectRatio: index % 3 === 0 ? "3/4" : index % 3 === 1 ? "4/5" : "1/1",
                      }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-[#7B9CAC] hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag size={18} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWishlistItem(item.id);
                        }}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} className="text-[#D4927D]" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm mb-1">{item.name}</h3>
                    <p className="text-[#7B9CAC]">{item.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <MobileNav />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
