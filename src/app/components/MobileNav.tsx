import { motion } from "motion/react";
import { Home, Compass, ShoppingBag, Heart, User, Store } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

export function MobileNav() {
  const location = useLocation();
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

  const navItems = [
    { icon: Home, label: "Feed", path: mode === "brands" ? "/" : "/feed" },
    { icon: Compass, label: "Discover", path: mode === "brands" ? "/discover" : "/discover/creators" },
    { icon: Store, label: "Shop", path: "/shop" },
    { icon: Heart, label: "Saved", path: "/wishlist" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#2C2C2C]/10"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <motion.button
                className={`w-full flex flex-col items-center gap-1 px-3 py-2 rounded-[12px] transition-colors ${
                  isActive ? "text-[#2C2C2C] bg-[#F5F3F0]" : "text-[#2C2C2C]/60"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </motion.button>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}