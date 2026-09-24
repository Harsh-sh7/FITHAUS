import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

interface CartItem {
  id: string | number;
  name: string;
  price: string | number;
  image: string;
  quantity?: number;
  brand?: string;
  size?: string;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem?: (id: string | number) => void;
  onUpdateQuantity?: (id: string | number, quantity: number) => void;
}) {
  const navigate = useNavigate();
  const updateQuantity = (item: CartItem, delta: number) => {
    const currentQty = item.quantity || 1;
    const newQuantity = Math.max(1, currentQty + delta);
    onUpdateQuantity?.(item.id, newQuantity);
  };

  const handleRemoveItem = (id: string | number) => {
    onRemoveItem?.(id);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const total = items.reduce((sum, item) => {
    const priceStr = typeof item.price === 'string' ? item.price : item.price.toString();
    const price = parseFloat(priceStr.replace('$', ''));
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#F5F3F0] z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-[#2C2C2C]/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-[#7B9CAC] flex items-center justify-center"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <ShoppingBag size={22} className="text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl">Your Bag</h2>
                      <p className="text-sm text-[#2C2C2C]/60">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20"
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#2C2C2C]/5 flex items-center justify-center mx-auto mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ShoppingBag size={32} className="text-[#2C2C2C]/30" />
                      </motion.div>
                      <p className="text-[#2C2C2C]/60">Your bag is empty</p>
                      <p className="text-sm text-[#2C2C2C]/40 mt-2">Start adding some fits!</p>
                    </motion.div>
                  ) : (
                    items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-[24px] p-4 shadow-lg shadow-black/5"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <motion.div
                            className="w-24 h-24 rounded-[16px] overflow-hidden flex-shrink-0 bg-gray-100"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg mb-1 truncate">{item.name}</h3>
                            {item.brand && <p className="text-xs text-[#2C2C2C]/60 mb-1">{item.brand}</p>}
                            {item.size && <p className="text-xs text-[#2C2C2C]/60 mb-1">Size: {item.size}</p>}
                            <p className="text-[#7B9CAC]">
                              {typeof item.price === 'string' ? item.price : `$${item.price}`}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={() => updateQuantity(item, -1)}
                                  className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus size={14} />
                                </motion.button>
                                <span className="w-8 text-center">{item.quantity || 1}</span>
                                <motion.button
                                  onClick={() => updateQuantity(item, 1)}
                                  className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus size={14} />
                                </motion.button>
                              </div>
                              <motion.button
                                onClick={() => handleRemoveItem(item.id)}
                                className="w-8 h-8 rounded-full bg-[#D4927D]/10 flex items-center justify-center text-[#D4927D] hover:bg-[#D4927D] hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 size={14} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="p-6 border-t border-[#2C2C2C]/10 bg-white"
                >
                  {/* Promo Banner */}
                  <motion.div
                    className="mb-4 p-4 bg-gradient-to-r from-[#9BA888]/10 to-[#7B9CAC]/10 rounded-[20px] flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Sparkles size={18} className="text-[#9BA888]" />
                    <p className="text-sm text-[#2C2C2C]/80">
                      Free shipping on orders over $150
                    </p>
                  </motion.div>

                  {/* Total */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg text-[#2C2C2C]/60">Total</span>
                    <motion.span
                      className="text-3xl"
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#2C2C2C] text-white rounded-full text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#7B9CAC] to-[#9BA888]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Checkout</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}