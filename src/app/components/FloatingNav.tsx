import { motion } from "motion/react";
import { Search, ShoppingBag, Heart, Home, Compass, User, Store, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export function FloatingNav({ onCartOpen, cartCount, onSearchOpen }: { 
  onCartOpen: () => void; 
  cartCount: number;
  onSearchOpen: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"brands" | "creators">("brands");

  useEffect(() => {
    const stored = localStorage.getItem("fithaus_mode");
    if (stored === "brands" || stored === "creators") {
      setMode(stored);
    } else {
      const path = location.pathname;
      if (path === "/feed" || path === "/discover/creators" || path.startsWith("/creator/")) {
        setMode("creators");
      } else {
        setMode("brands");
      }
    }
  }, [location.pathname]);

  const handleModeChange = (newMode: "brands" | "creators") => {
    setMode(newMode);
    localStorage.setItem("fithaus_mode", newMode);
    
    const path = location.pathname;
    if (newMode === "creators") {
      if (path === "/" || path.startsWith("/brand/")) {
        navigate("/feed");
      } else if (path === "/discover") {
        navigate("/discover/creators");
      }
    } else {
      if (path === "/feed" || path.startsWith("/creator/")) {
        navigate("/");
      } else if (path === "/discover/creators") {
        navigate("/discover");
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#2C2C2C]/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-4">
        {/* Logo */}
        <Link to={mode === "brands" ? "/" : "/feed"}>
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl tracking-tight flex-shrink-0 text-[#2C2C2C]">
              <span className="font-light">FIT</span>
              <span className="font-semibold">HAUS</span>
            </div>
          </motion.div>
        </Link>

        {/* Mode Switcher Mobile only (centered, with compact B/C text to prevent bulkiness) */}
        <div className="flex md:hidden bg-[#F5F3F0] p-0.5 rounded-full border border-[#2C2C2C]/5 text-xs flex-shrink-0">
          <button
            onClick={() => handleModeChange("brands")}
            className={`w-7 h-7 rounded-full font-semibold transition-all duration-200 flex items-center justify-center ${
              mode === "brands"
                ? "bg-[#2C2C2C] text-white shadow-sm"
                : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
            }`}
          >
            B
          </button>
          <button
            onClick={() => handleModeChange("creators")}
            className={`w-7 h-7 rounded-full font-semibold transition-all duration-200 flex items-center justify-center ${
              mode === "creators"
                ? "bg-[#2C2C2C] text-white shadow-sm"
                : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
            }`}
          >
            C
          </button>
        </div>

        {/* Center Navigation & Toggle - Desktop only */}
        <div className="hidden md:flex items-center gap-6">
          <Link to={mode === "brands" ? "/" : "/feed"}>
            <NavLink active={location.pathname === "/" || location.pathname === "/feed"}>
              <Home size={18} />
              Feed
            </NavLink>
          </Link>
          <Link to={mode === "brands" ? "/discover" : "/discover/creators"}>
            <NavLink active={location.pathname === "/discover" || location.pathname === "/discover/creators"}>
              <Compass size={18} />
              Discover
            </NavLink>
          </Link>
          <Link to="/shop">
            <NavLink active={location.pathname === "/shop"}>
              <Store size={18} />
              Shop
            </NavLink>
          </Link>
          <Link to="/build-fit">
            <NavLink active={location.pathname === "/build-fit"}>
              <Sparkles size={18} className="text-[#9BA888]" />
              Build Fit
            </NavLink>
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-[#2C2C2C]/10 mx-1"></div>

          {/* Mode Switcher Desktop */}
          <div className="flex bg-[#F5F3F0] p-0.5 rounded-full border border-[#2C2C2C]/5 text-xs flex-shrink-0">
            <button
              onClick={() => handleModeChange("brands")}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                mode === "brands"
                  ? "bg-[#2C2C2C] text-white shadow-sm"
                  : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => handleModeChange("creators")}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                mode === "creators"
                  ? "bg-[#2C2C2C] text-white shadow-sm"
                  : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]"
              }`}
            >
              Creators
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          <IconButton onClick={onSearchOpen} icon={<Search size={20} />} />
          <Link to="/wishlist" className="hidden sm:block">
            <IconButton icon={<Heart size={20} />} />
          </Link>
          <div className="relative">
            <IconButton onClick={onCartOpen} icon={<ShoppingBag size={20} />} />
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#2C2C2C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
              >
                {cartCount}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors ${
        active ? "bg-[#F5F3F0] text-[#2C2C2C] font-medium" : "text-[#2C2C2C]/60"
      }`}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}

function IconButton({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#2C2C2C] hover:bg-white transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.button>
  );
}