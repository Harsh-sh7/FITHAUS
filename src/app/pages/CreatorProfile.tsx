import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Grid3x3, Bookmark, Heart, ShoppingBag, Users, TrendingUp, X } from "lucide-react";
import { Link, useParams } from "react-router";
import { CartDrawer } from "../components/CartDrawer";

interface Product {
  id: string;
  name: string;
  price: string;
  brand: string;
  x: number;
  y: number;
  sizes: string[];
  inStock: boolean;
}

interface CreatorPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
  products: Product[];
}

const creatorData = {
  username: "style.maven",
  name: "Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1612266686586-70af879c032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  bio: "NYC-based style curator 🗽 Streetwear × Minimalism | Outfit inspo daily",
  followers: "284K",
  following: "892",
  postsCount: 547,
  totalLikes: "2.8M",
  isFollowing: false,
  posts: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 2847,
      caption: "cozy vibes for the weekend 🤎 living in oversized everything rn",
      products: [
        { id: "p1", name: "Oversized Comfort Hoodie", price: "$128", brand: "FITHAUS", x: 30, y: 40, sizes: ["S", "M", "L", "XL"], inStock: true },
        { id: "p2", name: "Relaxed Cargo Pants", price: "$98", brand: "FITHAUS", x: 50, y: 70, sizes: ["28", "30", "32", "34"], inStock: true },
        { id: "p3", name: "Classic Sneakers", price: "$140", brand: "Urban Kicks", x: 60, y: 85, sizes: ["8", "9", "10", "11", "12"], inStock: true },
      ],
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 1923,
      caption: "vintage finds never miss 🔥 thrifted this gem last week",
      products: [
        { id: "p6", name: "Vintage Denim Jacket", price: "$156", brand: "Vintage Archive", x: 40, y: 45, sizes: ["S", "M", "L", "XL"], inStock: true },
        { id: "p7", name: "Essential White Tee", price: "$48", brand: "FITHAUS", x: 50, y: 60, sizes: ["S", "M", "L", "XL"], inStock: true },
      ],
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 3421,
      caption: "basics that aren't basic 🤍 keeping it fresh with clean cuts",
      products: [
        { id: "p20", name: "Essential Cream Tee", price: "$48", brand: "FITHAUS", x: 45, y: 40, sizes: ["S", "M", "L", "XL"], inStock: true },
        { id: "p21", name: "Vintage Canvas Tote", price: "$35", brand: "Vintage Archive", x: 65, y: 70, sizes: ["O/S"], inStock: true },
        { id: "p22", name: "Relaxed Beige Chinos", price: "$88", brand: "Minimal Co", x: 50, y: 80, sizes: ["30", "32", "34"], inStock: true },
      ],
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 4102,
      caption: "less is more 🤍 minimal but make it statement",
      products: [
        { id: "p8", name: "Minimal Blazer", price: "$188", brand: "FITHAUS", x: 45, y: 40, sizes: ["S", "M", "L", "XL"], inStock: true },
        { id: "p9", name: "Wide Leg Trousers", price: "$124", brand: "Minimal Co", x: 50, y: 75, sizes: ["XS", "S", "M", "L"], inStock: true },
      ],
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 3521,
      caption: "techwear season activated ⚡️ utility meets style",
      products: [
        { id: "p4", name: "Tech Utility Vest", price: "$156", brand: "TechWear Co", x: 45, y: 35, sizes: ["S", "M", "L", "XL"], inStock: true },
        { id: "p5", name: "Performance Pants", price: "$142", brand: "TechWear Co", x: 50, y: 65, sizes: ["30", "32", "34", "36"], inStock: true },
      ],
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
      likes: 2156,
      caption: "Y2K aesthetics for a sunny afternoon ☀️ retro energy",
      products: [
        { id: "p30", name: "Y2K Cargo Pants", price: "$98", brand: "FITHAUS", x: 50, y: 65, sizes: ["28", "30", "32", "34"], inStock: true },
        { id: "p31", name: "Graphic Baby Tee", price: "$42", brand: "Y2K Retro", x: 45, y: 40, sizes: ["XS", "S", "M", "L"], inStock: true },
      ],
    },
  ],
};

export default function CreatorProfile() {
  const { creatorId } = useParams();
  const [isFollowing, setIsFollowing] = useState(creatorData.isFollowing);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePost, setActivePost] = useState<CreatorPost | null>(null);
  const [showProducts, setShowProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

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
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#2C2C2C]/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/feed">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>
          </Link>
          <p className="text-lg font-medium">@{creatorData.username}</p>
          <div className="relative">
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="p-3 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={20} className="text-[#2C2C2C]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2C2C2C] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartItems.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={creatorData.avatar}
                alt={creatorData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#9BA888] flex items-center justify-center border-4 border-[#F5F3F0]"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <TrendingUp size={20} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl mb-1 text-[#2C2C2C]">{creatorData.name}</h1>
              <p className="text-[#2C2C2C]/60 mb-4">@{creatorData.username}</p>
              <p className="text-[#2C2C2C]/80 mb-6 max-w-md">{creatorData.bio}</p>

              {/* Stats */}
              <div className="flex gap-6 mb-6 text-[#2C2C2C]">
                <div>
                  <p className="text-2xl">{creatorData.postsCount}</p>
                  <p className="text-sm text-[#2C2C2C]/60">Posts</p>
                </div>
                <div>
                  <p className="text-2xl">{creatorData.followers}</p>
                  <p className="text-sm text-[#2C2C2C]/60">Followers</p>
                </div>
                <div>
                  <p className="text-2xl">{creatorData.following}</p>
                  <p className="text-sm text-[#2C2C2C]/60">Following</p>
                </div>
                <div>
                  <p className="text-2xl">{creatorData.totalLikes}</p>
                  <p className="text-sm text-[#2C2C2C]/60">Total Likes</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-8 py-3 rounded-full flex items-center gap-2 font-medium ${
                    isFollowing
                      ? "bg-[#E5E3E0] text-[#2C2C2C]"
                      : "bg-[#2C2C2C] text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users size={18} />
                  {isFollowing ? "Following" : "Follow"}
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (creatorData.posts.length > 0) {
                      setActivePost(creatorData.posts[0]);
                      setShowProducts(true);
                    }
                  }}
                  className="px-6 py-3 bg-[#7B9CAC] text-white rounded-full flex items-center gap-2 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={18} />
                  Shop Fits
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-[#2C2C2C]/10 mb-8">
          <motion.button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors font-medium ${
              activeTab === "posts"
                ? "border-[#2C2C2C] text-[#2C2C2C]"
                : "border-transparent text-[#2C2C2C]/40"
            }`}
            whileHover={{ y: -2 }}
          >
            <Grid3x3 size={18} />
            <span>Posts</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors font-medium ${
              activeTab === "saved"
                ? "border-[#2C2C2C] text-[#2C2C2C]"
                : "border-transparent text-[#2C2C2C]/40"
            }`}
            whileHover={{ y: -2 }}
          >
            <Bookmark size={18} />
            <span>Saved</span>
          </motion.button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {creatorData.posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => {
                setActivePost(post);
                setShowProducts(true);
              }}
              className="relative aspect-square rounded-[20px] overflow-hidden bg-white shadow-lg shadow-black/5 cursor-pointer group"
            >
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center gap-2 text-white">
                  <Heart size={20} fill="white" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ShoppingBag size={20} />
                  <span>{post.products.length} items</span>
                </div>
              </motion.div>

              {/* Product Count Badge */}
              <motion.div
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1 font-medium text-[#2C2C2C]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ShoppingBag size={12} />
                {post.products.length}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shoppable Post Modal Overlay */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setActivePost(null);
              setSelectedProduct(null);
              setSelectedSize("");
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[28px] overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[550px]"
            >
              {/* Left Side: Post Image with tags */}
              <div className="relative md:w-[50%] bg-[#F5F3F0] aspect-square md:aspect-auto md:h-full flex items-center justify-center overflow-hidden">
                <img
                  src={activePost.image}
                  alt="Post details"
                  className="w-full h-full object-cover"
                />

                {/* Product Tag Indicators */}
                {showProducts && activePost.products.map((product) => (
                  <motion.button
                    key={product.id}
                    className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#2C2C2C] z-10 text-[#2C2C2C]"
                    style={{ left: `${product.x}%`, top: `${product.y}%`, transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <ShoppingBag size={14} />
                  </motion.button>
                ))}

                {/* Toggle Products Tags Button */}
                <motion.button
                  onClick={() => setShowProducts(!showProducts)}
                  className="absolute bottom-4 left-4 px-4 py-2 bg-white rounded-full flex items-center gap-2 text-sm font-medium shadow-lg z-10 text-[#2C2C2C]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={16} />
                  {showProducts ? "Hide" : "View"} Products
                </motion.button>
              </div>

              {/* Right Side: Post Details & Tagged Products List */}
              <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[45vh] md:max-h-full">
                {/* Header with Close */}
                <div className="flex items-center justify-between pb-4 border-b border-[#2C2C2C]/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#2C2C2C]/10">
                      <img
                        src={creatorData.avatar}
                        alt={creatorData.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[15px] text-[#2C2C2C]">@{creatorData.username}</p>
                      <p className="text-xs text-[#2C2C2C]/60">Creator</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      setActivePost(null);
                      setSelectedProduct(null);
                      setSelectedSize("");
                    }}
                    className="w-10 h-10 rounded-full bg-[#F5F3F0] flex items-center justify-center text-[#2C2C2C]"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Caption / Comments Info */}
                <div className="mb-6">
                  <p className="text-[#2C2C2C] text-sm mb-4">
                    <span className="font-semibold mr-2">@{creatorData.username}</span>
                    {activePost.caption}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#2C2C2C]/60">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-[#D4927D]" fill="#D4927D" />
                      {activePost.likes.toLocaleString()} Likes
                    </span>
                    <span>•</span>
                    <span>Shop the Look Below</span>
                  </div>
                </div>

                {/* Tagged Products list */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2C2C2C]/40 mb-2">
                    Tagged Items ({activePost.products.length})
                  </h4>
                  {activePost.products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between p-3.5 bg-[#F5F3F0] rounded-[16px] border border-[#2C2C2C]/5"
                    >
                      <div>
                        <p className="font-medium text-sm text-[#2C2C2C]">{product.name}</p>
                        <p className="text-xs text-[#2C2C2C]/60">{product.brand}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-[#7B9CAC]">{product.price}</span>
                        <motion.button
                          onClick={() => setSelectedProduct(product)}
                          className="px-4 py-2 bg-[#2C2C2C] text-white rounded-full text-xs font-medium hover:bg-black transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    src={activePost ? activePost.image : creatorData.posts[0].image}
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
                    onClick={() => {
                      if (selectedProduct && selectedSize) {
                        handleAddToCart({
                          id: `${selectedProduct.id}-${selectedSize}`,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          size: selectedSize,
                          image: activePost ? activePost.image : creatorData.posts[0].image,
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
                    state={{
                      product: {
                        ...selectedProduct,
                        image: activePost ? activePost.image : creatorData.posts[0].image,
                      },
                      brandName: selectedProduct.brand,
                    }}
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