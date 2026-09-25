import { useState, useEffect } from "react";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { BentoGrid } from "../components/BentoGrid";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Sparkles, X, Heart } from "lucide-react";
import { Link } from "react-router";

const categories = [
  { id: "all", label: "All", color: "#7B9CAC" },
  { id: "streetwear", label: "Streetwear", color: "#7B9CAC" },
  { id: "y2k", label: "Y2K", color: "#D4927D" },
  { id: "oversized", label: "Oversized", color: "#9BA888" },
  { id: "minimal", label: "Minimal", color: "#7B9CAC" },
  { id: "vintage", label: "Vintage", color: "#D4927D" },
  { id: "techwear", label: "Techwear", color: "#2C2C2C" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
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
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const triggerAddToCart = (product: any) => {
    setSelectedProduct(product);
    setSelectedSize("");
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize) {
      setCartItems((prev) => {
        const itemUniqueId = `${selectedProduct.id}-${selectedSize}`;
        const existing = prev.find((i) => i.id === itemUniqueId);
        if (existing) {
          return prev.map((i) =>
            i.id === itemUniqueId ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: itemUniqueId,
            name: selectedProduct.name,
            price: selectedProduct.price,
            size: selectedSize,
            image: selectedProduct.image,
            brand: selectedProduct.brand || "FITHAUS",
            quantity: 1,
          },
        ];
      });
      setSelectedProduct(null);
      setSelectedSize("");
      setIsCartOpen(true);
    }
  };

  const handleAddToWishlist = (item: any) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] relative">
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />
      <MobileNav />

      {/* Main Shop Container */}
      <div className="pt-[76px] pb-28 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Spacing / Category Row */}
          <div className="py-6 overflow-x-auto scrollbar-hide flex gap-3 bg-[#F5F3F0] -mx-4 px-4 mb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-5 py-2.5 rounded-full whitespace-nowrap text-xs font-semibold shadow-sm border border-[#2C2C2C]/5 transition-all flex-shrink-0"
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : "white",
                  color: selectedCategory === category.id ? "white" : "#2C2C2C",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Product Grid */}
          <BentoGrid 
            onAddToCart={triggerAddToCart} 
            onAddToWishlist={handleAddToWishlist} 
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {/* Floating Center Action Buttons */}
      <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-40 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-[#2C2C2C]/10 shadow-lg flex-shrink-0">
        <Link to="/build-fit">
          <motion.button
            className="px-5 py-2.5 bg-[#9BA888] text-white rounded-full flex items-center gap-2 text-xs font-semibold whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={14} />
            Build Your Fit
          </motion.button>
        </Link>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-9 h-9 rounded-full bg-[#7B9CAC] text-white flex items-center justify-center shadow-sm flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </div>

      {/* Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={() => {
              setSelectedProduct(null);
              setSelectedSize("");
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-[28px] md:rounded-[28px] w-full md:max-w-lg max-h-[85vh] overflow-y-auto pb-10"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#2C2C2C]/10 px-6 py-4 flex items-center justify-between rounded-t-[28px]">
                <h3 className="font-medium text-[#2C2C2C]">Quick Add</h3>
                <motion.button
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedSize("");
                  }}
                  className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center text-[#2C2C2C]"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="p-6 text-[#2C2C2C]">
                {/* Product Image */}
                <div className="aspect-square bg-[#F5F3F0] rounded-[20px] overflow-hidden mb-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Brand */}
                <p className="text-sm text-[#2C2C2C]/60 mb-1">{selectedProduct.brand}</p>

                {/* Product Name */}
                <h4 className="text-xl font-medium mb-3">{selectedProduct.name}</h4>

                {/* Price */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-medium">
                    {selectedProduct.price}
                  </span>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-3">Select Size</p>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.sizes?.map((size: string) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-[12px] text-sm font-medium border-2 transition-all ${
                          selectedSize === size
                            ? "border-[#2C2C2C] bg-[#2C2C2C] text-white"
                            : "border-[#2C2C2C]/10 bg-white text-[#2C2C2C]"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {selectedProduct.inStock ? (
                    <p className="text-sm text-[#9BA888] flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#9BA888] rounded-full"></span>
                      In Stock - Ships in 2-3 days
                    </p>
                  ) : (
                    <p className="text-sm text-[#D4927D] flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#D4927D] rounded-full"></span>
                      Out of Stock
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedProduct.inStock}
                    className="w-full py-4 bg-[#2C2C2C] text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed animate-none"
                    whileHover={{ scale: selectedSize && selectedProduct.inStock ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSize && selectedProduct.inStock ? 0.98 : 1 }}
                  >
                    Add to Bag
                  </motion.button>
                  <Link
                    to={`/product/${selectedProduct.id}`}
                    state={{ product: selectedProduct, brandName: selectedProduct.brand || "FITHAUS" }}
                    className="block"
                  >
                    <motion.button
                      className="w-full py-4 border-2 border-[#2C2C2C] text-[#2C2C2C] rounded-full font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Full Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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