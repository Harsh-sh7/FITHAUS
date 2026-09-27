import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2, ShoppingBag, Sparkles, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { MobileNav } from "../components/MobileNav";
import { FloatingNav } from "../components/FloatingNav";

export default function Checkout() {
  const navigate = useNavigate();
  
  // Checkout States
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Form Fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Validation State
  const [formErrors, setFormErrors] = useState<string | null>(null);

  // Sync Cart
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

  const subtotal = cartItems.reduce((sum, item) => {
    const priceStr = typeof item.price === "string" ? item.price : item.price.toString();
    const price = parseFloat(priceStr.replace("$", ""));
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleFillDemo = () => {
    setEmail("harsh@contraco.com");
    setName("Harsh Vardhan");
    setAddress("123 Streetwear Blvd");
    setCity("San Francisco");
    setZip("94103");
    setCardNumber("4111 2222 3333 4444");
    setCardExpiry("12/28");
    setCardCvv("123");
    setFormErrors(null);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    // Basic Validation
    if (!email || !name || !address || !city || !zip || !cardNumber || !cardExpiry || !cardCvv) {
      setFormErrors("Please fill in all shipping and payment fields.");
      return;
    }

    if (cartItems.length === 0) {
      setFormErrors("Your bag is empty! Add some fits before placing an order.");
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setOrderNumber(`FH-${Math.floor(100000 + Math.random() * 900000)}`);
      
      // Clear cart
      localStorage.removeItem("fithaus_cart");
      setCartItems([]);
    }, 2500);
  };

  // Simple custom Confetti particle generator
  const confettiParticles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // width offset
    y: Math.random() * -100 - 50, // start above
    color: ["#7B9CAC", "#D4927D", "#9BA888", "#2C2C2C", "#FFD700"][i % 5],
    delay: Math.random() * 0.5,
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="min-h-screen bg-[#F5F3F0] pt-[76px] pb-28 text-[#2C2C2C]">
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => navigate("/shop")} // Go search in Shop
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/50 flex items-center justify-center text-[#2C2C2C] shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Form Side */}
              <form onSubmit={handlePay} className="lg:col-span-7 space-y-6">
                
                {/* Demo Mode Banner */}
                <div className="bg-[#9BA888]/10 border border-[#9BA888]/20 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9BA888]">Demo Sandbox Mode</p>
                    <p className="text-xs text-[#2C2C2C]/70 mt-0.5">Quickly pre-fill forms with mockup buyer data to complete checkout.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="px-4 py-2 bg-[#2C2C2C] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Auto-Fill
                  </button>
                </div>

                {formErrors && (
                  <div className="bg-[#D4927D]/10 border border-[#D4927D]/20 p-4 rounded-2xl flex items-center gap-3 text-[#D4927D] text-xs">
                    <AlertCircle size={16} />
                    <span>{formErrors}</span>
                  </div>
                )}

                {/* Shipping Details */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/50">
                  <h2 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Truck size={18} className="text-[#7B9CAC]" />
                    <span>Shipping Address</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Delivery Address</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address, Apt, Suite"
                        className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">City</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Zip / Postal Code</label>
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="ZIP Code"
                          className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/50">
                  <h2 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-[#D4927D]" />
                    <span>Mock Credit Card</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">CVV</label>
                        <input
                          type="text"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="3 digits"
                          className="w-full bg-[#F5F3F0]/60 border border-neutral-200 rounded-[14px] px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C]/50 transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center gap-2 justify-center py-2 text-xs text-neutral-400 font-semibold">
                  <ShieldCheck size={16} className="text-[#9BA888]" />
                  <span>Secure 256-bit SSL encrypted mock payment checkout.</span>
                </div>
              </form>

              {/* Summary Side */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/50 sticky top-[96px]">
                  <h2 className="text-base font-bold uppercase tracking-wider mb-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
                    <ShoppingBag size={18} className="text-[#9BA888]" />
                    <span>Order Summary</span>
                  </h2>

                  {/* Product List */}
                  <div className="max-h-[220px] overflow-y-auto pr-2 space-y-3 mb-6">
                    {cartItems.length === 0 ? (
                      <p className="text-xs text-neutral-400 text-center py-6">Your checkout bag is empty.</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center justify-between">
                          <div className="flex gap-2.5 items-center min-w-0">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold truncate leading-tight">{item.name}</p>
                              <p className="text-[9px] text-neutral-400">Size: {item.size} • Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold">${item.price * (item.quantity || 1)}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 border-t border-neutral-100 pt-4 text-xs">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-500">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-500">
                      <span>Est. Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold border-t border-neutral-100 pt-3 text-[#2C2C2C] mt-2">
                      <span>Total Amount</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || cartItems.length === 0}
                    onClick={handlePay}
                    className={`w-full mt-6 py-4 bg-[#2C2C2C] text-white rounded-full text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                      isLoading || cartItems.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-black active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Place Mock Order • ${total.toFixed(2)}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Order Success State */
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-3xl shadow-lg border border-neutral-200/50 mt-12 relative overflow-hidden"
            >
              {/* Confetti Explosion particles */}
              {confettiParticles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    borderRadius: p.id % 2 === 0 ? "50%" : "0px",
                    transform: `rotate(${p.rotation}deg)`,
                    left: "50%",
                    top: "30%",
                  }}
                  animate={{
                    x: [0, p.x],
                    y: [0, p.y + 150], // simulate gravity falling
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    ease: "easeOut",
                    delay: p.delay,
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 bg-[#9BA888]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={44} className="text-[#9BA888]" />
              </motion.div>

              <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-4">
                Thank you for your purchase
              </p>
              
              <div className="bg-[#F5F3F0] rounded-2xl p-4 mb-6 text-xs border border-neutral-200/40 font-mono">
                <p className="text-neutral-400 uppercase tracking-wider text-[10px] mb-1">Order Identifier</p>
                <p className="text-sm font-bold">{orderNumber}</p>
              </div>

              <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                Your purchase was mock processed successfully. Confirmed items will be shipped to your demo address: <strong>{name}, {address}, {city}</strong>.
              </p>

              <div className="flex flex-col gap-3">
                <Link to="/shop">
                  <motion.button
                    className="w-full py-3 bg-[#2C2C2C] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Shop
                  </motion.button>
                </Link>
                <Link to="/">
                  <motion.button
                    className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-[#2C2C2C] text-xs font-bold uppercase tracking-wider rounded-full border border-neutral-200/50 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Main Feed
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileNav />
    </div>
  );
}
