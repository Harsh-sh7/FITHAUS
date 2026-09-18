import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Share2, ShoppingBag, Plus, X, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { CartDrawer } from "../components/CartDrawer";
import { MobileNav } from "../components/MobileNav";

const categories = [
  {
    id: "tops",
    name: "Tops",
    items: [
      { id: "t1", name: "Oversized Hoodie", price: 128, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
      { id: "t2", name: "Essential Tee", price: 48, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400" },
      { id: "t3", name: "Minimal Blazer", price: 188, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
      { id: "t4", name: "Cropped Cardi", price: 88, brand: "FITHAUS", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400" },
      { id: "t5", name: "Vintage Leather", price: 220, brand: "Vintage Archive", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
      { id: "t6", name: "Graphic Knit", price: 110, brand: "Vintage Archive", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=400" },
      { id: "t7", name: "Ribbed Knit Polo", price: 78, brand: "Minimal Co", sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400" },
      { id: "t8", name: "Varsity Jacket", price: 245, brand: "Vintage Archive", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
      { id: "t9", name: "Acid Wash Crew", price: 95, brand: "TechWear Co", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400" },
      { id: "t10", name: "Mesh Long Sleeve", price: 68, brand: "Y2K Club", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=400" },
    ],
  },
  {
    id: "bottoms",
    name: "Bottoms",
    items: [
      { id: "b2", name: "Wide Leg Jeans", price: 124, brand: "Minimal Co", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
      { id: "b3", name: "Parachute Pants", price: 115, brand: "TechWear Co", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
      { id: "b5", name: "Carpenter Shorts", price: 78, brand: "Vintage Archive", sizes: ["30", "32", "34"], image: "https://images.unsplash.com/photo-1565084888279-aca607ecad0c?w=400" },
      { id: "b6", name: "Distressed Denim", price: 135, brand: "Vintage Archive", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400" },
      { id: "b8", name: "Nylon Track Pants", price: 115, brand: "TechWear Co", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
      { id: "b9", name: "Utility Cargo Shorts", price: 85, brand: "TechWear Co", sizes: ["30", "32", "34"], image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
    ],
  },
  {
    id: "shoes",
    name: "Footwear",
    items: [
      { id: "s1", name: "Sneakers", price: 140, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
      { id: "s2", name: "Chunky Trainers", price: 165, brand: "TechWear Co", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
      { id: "s3", name: "Chelsea Boots", price: 195, brand: "Minimal Co", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400" },
      { id: "s4", name: "Utility Slides", price: 60, brand: "FITHAUS", sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400" },
      { id: "s5", name: "Retro Runners", price: 120, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: "s6", name: "Chunky Loafers", price: 175, brand: "Minimal Co", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400" },
      { id: "s7", name: "High Top Canvas", price: 95, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" },
      { id: "s8", name: "Suede Desert Boots", price: 185, brand: "Vintage Archive", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400" },
    ],
  },
];

export default function BuildFit() {
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  useEffect(() => {
    // Sync cart count from localStorage if it exists
    const storedCart = localStorage.getItem("fithaus_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleItem = (categoryId: string, item: any) => {
    setSelectedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId]?.id === item.id ? null : item,
    }));
  };

  const clearAll = () => {
    setSelectedItems({});
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("fithaus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      localStorage.setItem("fithaus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const totalPrice = Object.values(selectedItems).reduce((sum, item) => {
    return sum + (item ? item.price : 0);
  }, 0);

  const selectedCount = Object.values(selectedItems).filter(item => item !== null && item !== undefined).length;

  const handleAddFitToBag = () => {
    const itemsToAdd = Object.values(selectedItems)
      .filter((item) => item !== null && item !== undefined)
      .map((item) => ({
        id: `${item.id}-${item.sizes ? item.sizes[1] : "M"}`,
        name: item.name,
        price: item.price,
        image: item.image,
        brand: item.brand,
        size: item.sizes ? item.sizes[1] : "M",
        quantity: 1,
      }));

    if (itemsToAdd.length === 0) {
      alert("Please select at least one item to build your fit!");
      return;
    }

    setCartItems((prev) => {
      const updatedCart = [...prev];
      itemsToAdd.forEach((newItem) => {
        const existing = updatedCart.find((i) => i.id === newItem.id);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          updatedCart.push(newItem);
        }
      });
      localStorage.setItem("fithaus_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setIsCanvasOpen(false);
    setIsCartOpen(true);
  };

  const handleShareFit = () => {
    alert("Outfit link copied to clipboard! Share it with your friends ⚡️");
  };

  const scrollToSection = (id: string) => {
    setIsCanvasOpen(false); // Close canvas first to reveal elements
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#2C2C2C]/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <motion.button
              className="w-10 h-10 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors flex items-center justify-center text-[#2C2C2C]"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>
          
          <h1 className="text-lg font-semibold text-[#2C2C2C] tracking-tight">
            Build Your Fit
          </h1>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={clearAll}
              className="w-10 h-10 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors flex items-center justify-center text-[#2C2C2C]"
              whileHover={{ rotate: 180, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              title="Reset Fit"
            >
              <RefreshCw size={18} />
            </motion.button>
            <div className="relative">
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="w-10 h-10 rounded-full bg-[#F5F3F0] hover:bg-[#E5E3E0] transition-colors flex items-center justify-center text-[#2C2C2C]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag size={18} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2C2C2C] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-60">
        {/* Category Filter Dropdown */}
        <div className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-neutral-200/50 shadow-sm text-[#2C2C2C]">
          <p className="text-xs uppercase tracking-wider text-[#2C2C2C]/50 font-bold">Catalog Section</p>
          <div className="relative">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-[#2C2C2C]/10 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 pr-10 rounded-full text-[#2C2C2C] shadow-sm hover:border-[#2C2C2C]/30 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="shoes">Footwear</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2C2C2C]/60">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Selection categories */}
        <div className="space-y-12">
          {categories
            .filter((category) => selectedCategoryFilter === "all" || category.id === selectedCategoryFilter)
            .map((category) => (
            <div key={category.id} id={`${category.id}-section`} className="scroll-mt-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#2C2C2C]/40 mb-6 flex items-center gap-2">
                <span>{category.name}</span>
                {selectedItems[category.id] && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9BA888]"></span>
                )}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {category.items.map((item) => {
                  const isSelected = selectedItems[category.id]?.id === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => toggleItem(category.id, item)}
                      className={`relative aspect-[3/4] rounded-[24px] overflow-hidden group border transition-all duration-300 text-left shadow-sm ${
                        isSelected 
                          ? "border-[#2C2C2C] ring-2 ring-[#2C2C2C]/10 scale-[0.98]" 
                          : "border-[#2C2C2C]/5 hover:border-[#2C2C2C]/20"
                      }`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Price Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#2C2C2C] shadow-sm">
                        ${item.price}
                      </div>

                      {/* Selected Indicator Checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#9BA888] flex items-center justify-center border-2 border-white shadow-md text-white"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-[10px] text-white/60 font-medium mb-0.5">{item.brand}</p>
                        <p className="font-semibold text-xs leading-snug">{item.name}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistent Floating Outfit Canvas Tray */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-xl bg-white/95 backdrop-blur-xl border border-neutral-200/50 shadow-[0_24px_48px_rgba(0,0,0,0.16)] rounded-[24px] px-3.5 py-3 flex items-center justify-between gap-3 text-[#2C2C2C]">
        {/* Selected Item Slots */}
        <div className="flex items-center gap-2">
          {["tops", "bottoms", "shoes"].map((catId) => {
            const selectedItem = selectedItems[catId];
            const placeholderText = catId === "tops" ? "Top" : catId === "bottoms" ? "Pants" : "Shoes";
            
            return (
              <div 
                key={catId} 
                className="w-10 h-10 relative flex-shrink-0"
              >
                {selectedItem ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full"
                  >
                    {/* Nested div handles overflow-hidden for image rounding */}
                    <div className="w-full h-full rounded-[10px] overflow-hidden border border-neutral-200/60 relative">
                      <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover animate-none" />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5 font-bold leading-none scale-90">
                        ${selectedItem.price}
                      </span>
                    </div>
                    {/* Close button is outside image overflow-hidden so it renders completely */}
                    <button 
                      onClick={() => toggleItem(catId, selectedItem)}
                      className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-black text-white rounded-full flex items-center justify-center border border-white z-10 shadow-md hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <X size={8} />
                    </button>
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => scrollToSection(`${catId}-section`)}
                    className="w-full h-full rounded-[10px] border border-dashed border-neutral-300 bg-[#F5F3F0] flex flex-col items-center justify-center gap-0.5 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                    <span className="text-[7px] font-bold uppercase tracking-wider">{placeholderText}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Panel */}
        <div className="flex items-center gap-3 flex-grow justify-end">
          {selectedCount > 0 && (
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold leading-none mb-0.5">Total</p>
              <p className="text-sm font-bold text-[#2C2C2C] leading-none">${totalPrice}</p>
            </div>
          )}
          
          <motion.button
            onClick={handleAddFitToBag}
            className={`h-9 px-3 sm:px-4 rounded-full flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider transition-all ${
              selectedCount > 0
                ? "bg-[#2C2C2C] text-white shadow-md hover:bg-black active:scale-95 cursor-pointer"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
            disabled={selectedCount === 0}
            whileHover={selectedCount > 0 ? { scale: 1.02 } : {}}
            whileTap={selectedCount > 0 ? { scale: 0.98 } : {}}
          >
            <ShoppingBag size={11} />
            <span className="hidden sm:inline">Add Fit to Bag</span>
            <span className="inline sm:hidden">Add Fit</span>
          </motion.button>
        </div>
      </div>

      <MobileNav />

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
