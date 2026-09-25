import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Upload, X, Plus, Tag, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router";

interface TaggedProduct {
  id: string;
  name: string;
  price: string;
  brand: string;
  x: number;
  y: number;
}

export default function UploadFit() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [taggedProducts, setTaggedProducts] = useState<TaggedProduct[]>([]);
  const [isTagging, setIsTagging] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [tagPosition, setTagPosition] = useState({ x: 0, y: 0 });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTagging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTagPosition({ x, y });
    setShowProductModal(true);
  };

  const addProduct = (product: { name: string; price: string; brand: string }) => {
    const newProduct: TaggedProduct = {
      id: Date.now().toString(),
      ...product,
      x: tagPosition.x,
      y: tagPosition.y,
    };
    setTaggedProducts([...taggedProducts, newProduct]);
    setShowProductModal(false);
    setIsTagging(false);
  };

  const removeProduct = (id: string) => {
    setTaggedProducts(taggedProducts.filter(p => p.id !== id));
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
              <span>Cancel</span>
            </motion.button>
          </Link>
          <h1 className="text-lg font-medium">Upload Your Fit</h1>
          <motion.button
            className="px-6 py-2 bg-[#2C2C2C] text-white rounded-full text-sm disabled:opacity-50"
            disabled={!uploadedImage || !caption}
            whileHover={{ scale: uploadedImage && caption ? 1.05 : 1 }}
            whileTap={{ scale: uploadedImage && caption ? 0.95 : 1 }}
          >
            Post
          </motion.button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Upload */}
          <div>
            {!uploadedImage ? (
              <motion.label
                htmlFor="image-upload"
                className="aspect-[4/5] bg-white rounded-[28px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-[#2C2C2C]/20 hover:border-[#7B9CAC] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-[#7B9CAC]/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Upload size={32} className="text-[#7B9CAC]" />
                </motion.div>
                <p className="text-lg mb-2">Upload Your Fit</p>
                <p className="text-sm text-[#2C2C2C]/60">PNG, JPG up to 10MB</p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </motion.label>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div
                  className="aspect-[4/5] bg-white rounded-[28px] overflow-hidden relative cursor-crosshair"
                  onClick={handleImageClick}
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded fit"
                    className="w-full h-full object-cover"
                  />

                  {/* Tagged Products */}
                  {taggedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg group"
                      style={{ left: `${product.x}%`, top: `${product.y}%` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Tag size={16} className="text-[#7B9CAC]" />
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProduct(product.id);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4927D] rounded-full items-center justify-center text-white hidden group-hover:flex"
                        whileHover={{ scale: 1.1 }}
                      >
                        <X size={12} />
                      </motion.button>
                    </motion.div>
                  ))}

                  {isTagging && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <p className="bg-white px-6 py-3 rounded-full text-sm">
                        Click to tag a product
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Actions */}
                <div className="flex gap-3 mt-4">
                  <motion.button
                    onClick={() => setIsTagging(!isTagging)}
                    className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 ${
                      isTagging
                        ? "bg-[#7B9CAC] text-white"
                        : "bg-white text-[#2C2C2C]"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Tag size={18} />
                    {isTagging ? "Tagging..." : "Tag Products"}
                  </motion.button>
                  <motion.button
                    onClick={() => setUploadedImage(null)}
                    className="px-6 py-3 bg-white rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: "#FFE5E5" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Caption */}
            <div>
              <label className="block text-sm mb-2">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share your fit story... What's the vibe? 🔥"
                className="w-full h-32 px-4 py-3 bg-white rounded-[20px] resize-none outline-none focus:ring-2 focus:ring-[#7B9CAC]"
                maxLength={300}
              />
              <p className="text-xs text-[#2C2C2C]/60 mt-2">
                {caption.length}/300 characters
              </p>
            </div>

            {/* Tagged Products List */}
            {taggedProducts.length > 0 && (
              <div>
                <label className="block text-sm mb-3">Tagged Products ({taggedProducts.length})</label>
                <div className="space-y-3">
                  {taggedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-white rounded-[16px]"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-[#2C2C2C]/60">{product.brand} • {product.price}</p>
                      </div>
                      <motion.button
                        onClick={() => removeProduct(product.id)}
                        className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center hover:bg-[#D4927D] hover:text-white transition-colors"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <motion.div
              className="p-6 bg-gradient-to-br from-[#7B9CAC]/10 to-[#9BA888]/10 rounded-[20px]"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-[#7B9CAC]" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-[#2C2C2C]/80">
                <li>• Use natural lighting for best results</li>
                <li>• Tag products to help followers shop the look</li>
                <li>• Add hashtags to increase discoverability</li>
                <li>• Engage with your followers in comments</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProductModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[28px] p-8 max-w-md w-full"
          >
            <h3 className="text-2xl mb-6">Tag Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addProduct({
                  name: formData.get("name") as string,
                  price: formData.get("price") as string,
                  brand: formData.get("brand") as string,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm mb-2">Product Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g., Oversized Comfort Hoodie"
                  className="w-full px-4 py-3 bg-[#F5F3F0] rounded-[16px] outline-none focus:ring-2 focus:ring-[#7B9CAC]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Brand</label>
                <input
                  name="brand"
                  required
                  placeholder="e.g., FITHAUS"
                  className="w-full px-4 py-3 bg-[#F5F3F0] rounded-[16px] outline-none focus:ring-2 focus:ring-[#7B9CAC]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Price</label>
                <input
                  name="price"
                  required
                  placeholder="e.g., $128"
                  className="w-full px-4 py-3 bg-[#F5F3F0] rounded-[16px] outline-none focus:ring-2 focus:ring-[#7B9CAC]"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-3 bg-[#F5F3F0] rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 py-3 bg-[#2C2C2C] text-white rounded-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Product
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
