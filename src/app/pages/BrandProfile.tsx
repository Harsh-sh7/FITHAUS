import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Grid3x3, Store, ShoppingBag, Users, Check, X } from "lucide-react";
import { Link, useParams } from "react-router";
import { CartDrawer } from "../components/CartDrawer";

const brandData = {
  id: "nike",
  name: "Nike",
  logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  bio: "Just Do It. Official Nike account. Bringing innovation and inspiration to every athlete* in the world. (*If you have a body, you are an athlete)",
  website: "nike.com",
  followers: "2.8M",
  posts: 1247,
  verified: true,
  categories: ["Sportswear", "Sneakers", "Athletic"],
  products: [
    {
      id: "nike-air-max-1",
      name: "Air Max 97 SE",
      brand: "Nike",
      price: 175,
      salePrice: 140,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["7", "8", "9", "10", "11", "12"],
      inStock: true,
      likes: 24783,
    },
    {
      id: "nike-tracksuit-1",
      name: "Essential Tech Fleece Tracksuit",
      brand: "Nike",
      price: 140,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      likes: 18293,
    },
    {
      id: "nike-hoodie-1",
      name: "Tech Fleece Hoodie",
      brand: "Nike",
      price: 120,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      likes: 31204,
    },
    {
      id: "nike-shoe-2",
      name: "Quest 5 Running Shoe",
      brand: "Nike",
      price: 95,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["8", "9", "10", "11", "12"],
      inStock: true,
      likes: 19847,
    },
    {
      id: "nike-shoe-3",
      name: "Free Run 5.0",
      brand: "Nike",
      price: 110,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["8", "9", "10", "11", "12"],
      inStock: true,
      likes: 15632,
    },
    {
      id: "nike-shoe-4",
      name: "Downshifter 12",
      brand: "Nike",
      price: 85,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      sizes: ["8", "9", "10", "11", "12"],
      inStock: true,
      likes: 22156,
    },
  ],
};

export default function BrandProfile() {
  const { brandId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const handleAddToCart = (newItem: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
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
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#2C2C2C]/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/">
            <motion.button
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#F5F3F0] transition-colors cursor-pointer"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <p className="font-medium">{brandData.name}</p>
            {brandData.verified && (
              <svg className="w-4 h-4 text-[#7B9CAC]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-[#2C2C2C]">
          <img
            src={brandData.coverImage}
            alt={brandData.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20 relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white shadow-xl bg-white"
            >
              <img
                src={brandData.logo}
                alt={brandData.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1 bg-white rounded-[20px] p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{brandData.name}</h1>
                    {brandData.verified && (
                      <svg className="w-6 h-6 text-[#7B9CAC]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-[#2C2C2C]/80 mb-4 max-w-2xl">{brandData.bio}</p>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {brandData.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-[#F5F3F0] text-[#2C2C2C]/70 text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="font-bold text-lg">{brandData.posts}</span>
                      <span className="text-[#2C2C2C]/60 ml-1">posts</span>
                    </div>
                    <div>
                      <span className="font-bold text-lg">{brandData.followers}</span>
                      <span className="text-[#2C2C2C]/60 ml-1">followers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex-1 md:flex-initial px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 cursor-pointer ${
                    isFollowing
                      ? "bg-[#F5F3F0] text-[#2C2C2C]"
                      : "bg-[#2C2C2C] text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isFollowing ? (
                    <>
                      <Check size={18} />
                      Following
                    </>
                  ) : (
                    <>
                      <Users size={18} />
                      Follow
                    </>
                  )}
                </motion.button>
                <motion.a
                  href={`https://${brandData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] rounded-full font-medium flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Store size={18} />
                  <span className="hidden md:inline">Website</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-[#2C2C2C]/10 bg-white sticky top-[60px] z-30">
          <div className="px-4 flex items-center">
            <motion.button
              className="flex items-center gap-2 px-6 py-4 border-b-2 border-[#2C2C2C]"
              whileHover={{ y: -2 }}
            >
              <Grid3x3 size={18} />
              <span className="font-medium">Products</span>
            </motion.button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {brandData.products.map((product, index) => (
            <motion.div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="relative aspect-square rounded-[16px] overflow-hidden bg-white shadow-sm cursor-pointer group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.button
                  className="px-6 py-3 bg-white text-[#2C2C2C] rounded-full font-medium flex items-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={18} />
                  Quick Add
                </motion.button>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                ${product.price}
              </div>
            </motion.div>
          ))}
        </div>
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
                    ${selectedProduct.salePrice || selectedProduct.price}
                  </span>
                  {selectedProduct.salePrice && (
                    <span className="text-lg text-[#2C2C2C]/40 line-through">
                      ${selectedProduct.price}
                    </span>
                  )}
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
                    onClick={() => {
                      if (selectedProduct && selectedSize) {
                        handleAddToCart({
                          id: `${selectedProduct.id}-${selectedSize}`,
                          name: selectedProduct.name,
                          price: selectedProduct.salePrice || selectedProduct.price,
                          size: selectedSize,
                          image: selectedProduct.image,
                          brand: selectedProduct.brand,
                        });
                        setSelectedProduct(null);
                        setSelectedSize("");
                      }
                    }}
                    disabled={!selectedSize || !selectedProduct.inStock}
                    className="w-full py-4 bg-[#2C2C2C] text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed animate-none"
                    whileHover={{ scale: selectedSize && selectedProduct.inStock ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSize && selectedProduct.inStock ? 0.98 : 1 }}
                  >
                    Add to Bag
                  </motion.button>
                  <Link
                    to={`/product/${selectedProduct.id}`}
                    state={{ product: selectedProduct, brandName: selectedProduct.brand }}
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
    </div>
  );
}
