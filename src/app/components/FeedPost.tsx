import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Bookmark, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

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

interface FeedPostProps {
  post: {
    id: string;
    creator: {
      id: string;
      username: string;
      avatar: string;
      isFollowing: boolean;
    };
    image: string;
    caption: string;
    likes: number;
    comments: number;
    products: Product[];
    timestamp: string;
  };
  onAddToCart: (product: any) => void;
}

export function FeedPost({ post, onAddToCart }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddToBag = () => {
    if (selectedProduct && selectedSize) {
      onAddToCart({
        id: `${selectedProduct.id}-${selectedSize}`,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: selectedSize,
        image: post.image,
        brand: selectedProduct.brand,
      });
      setSelectedProduct(null);
      setSelectedSize("");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white mb-1"
      >
        {/* Creator Header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to={`/creator/${post.creator.id}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#2C2C2C]/10">
              <img
                src={post.creator.avatar}
                alt={post.creator.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-medium text-[15px]">@{post.creator.username}</p>
              </div>
              <p className="text-xs text-[#2C2C2C]/60">{post.timestamp}</p>
            </div>
          </Link>

          {!post.creator.isFollowing && (
            <motion.button
              className="px-5 py-2 bg-[#2C2C2C] text-white rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow
            </motion.button>
          )}
        </div>

        {/* Image with Product Tags */}
        <div className="relative bg-[#F5F3F0]">
          <img
            src={post.image}
            alt={post.caption}
            className="w-full aspect-[4/5] object-cover"
          />

          {/* Product Tag Indicators */}
          {showProducts && post.products.map((product) => (
            <motion.button
              key={product.id}
              className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#2C2C2C]"
              style={{ left: `${product.x}%`, top: `${product.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedProduct(product)}
            >
              <ShoppingBag size={14} />
            </motion.button>
          ))}

          {/* View Products Button */}
          <motion.button
            onClick={() => setShowProducts(!showProducts)}
            className="absolute bottom-3 left-3 px-4 py-2 bg-white rounded-full flex items-center gap-2 text-sm font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag size={16} />
            {showProducts ? "Hide" : "View"} Products
          </motion.button>
        </div>

        {/* Actions */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={24}
                  className={isLiked ? "text-[#D4927D]" : "text-[#2C2C2C]"}
                  fill={isLiked ? "#D4927D" : "none"}
                  strokeWidth={2}
                />
              </motion.button>

              <motion.button whileTap={{ scale: 0.9 }}>
                <MessageCircle size={24} strokeWidth={2} />
              </motion.button>
            </div>

            <motion.button
              onClick={() => setIsSaved(!isSaved)}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark
                size={24}
                className={isSaved ? "text-[#2C2C2C]" : "text-[#2C2C2C]"}
                fill={isSaved ? "#2C2C2C" : "none"}
                strokeWidth={2}
              />
            </motion.button>
          </div>

          {/* Likes */}
          <p className="font-medium text-sm mb-2">{likesCount.toLocaleString()} likes</p>

          {/* Caption */}
          <p className="text-sm">
            <Link to={`/creator/${post.creator.id}`} className="font-medium mr-2">
              @{post.creator.username}
            </Link>
            <span className="text-[#2C2C2C]/80">{post.caption}</span>
          </p>

          {/* View Comments */}
          {post.comments > 0 && (
            <button className="text-sm text-[#2C2C2C]/60 mt-2">
              View all {post.comments} comments
            </button>
          )}
        </div>
      </motion.div>

      {/* Tagged Products list (when products list is toggled) */}
      {showProducts && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 space-y-3 border-t border-[#2C2C2C]/10 pt-4 mt-2 bg-white mb-1"
        >
          {post.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-[16px]"
            >
              <div>
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-[#2C2C2C]/60">{product.brand}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#7B9CAC]">{product.price}</span>
                <motion.button
                  onClick={() => setSelectedProduct(product)}
                  className="px-4 py-2 bg-[#2C2C2C] text-white rounded-full text-sm"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

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
                <h3 className="font-medium">Quick Add</h3>
                <motion.button
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedSize("");
                  }}
                  className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="p-6">
                {/* Product Image */}
                <div className="aspect-square bg-[#F5F3F0] rounded-[20px] overflow-hidden mb-4">
                  <img
                    src={post.image}
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
                    {selectedProduct.sizes?.map((size) => (
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
                    onClick={handleAddToBag}
                    disabled={!selectedSize || !selectedProduct.inStock}
                    className="w-full py-4 bg-[#2C2C2C] text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    whileHover={{ scale: selectedSize && selectedProduct.inStock ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSize && selectedProduct.inStock ? 0.98 : 1 }}
                  >
                    Add to Bag
                  </motion.button>
                  <Link
                    to={`/product/${selectedProduct.id}`}
                    state={{ product: { ...selectedProduct, image: post.image }, brandName: selectedProduct.brand }}
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
    </>
  );
}
