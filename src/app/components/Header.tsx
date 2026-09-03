import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export function Header({ cartCount, onCartClick, onWishlistClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchSuggestions = [
    'Oversized hoodies',
    'Cargo pants',
    'Vintage denim',
    'Minimal tees',
    'Techwear',
  ];

  const filteredSuggestions = searchSuggestions.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-[#F5F3F0]/80 backdrop-blur-xl border-b border-neutral-200/50"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl tracking-tight text-neutral-900"
          >
            <span className="font-light">STREET</span>
            <span className="font-semibold">FITS</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink>New Drops</NavLink>
            <NavLink>Collections</NavLink>
            <NavLink>Archive</NavLink>
            <NavLink>Community</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-neutral-200/60 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-neutral-200/60 transition-colors"
                onClick={onWishlistClick}
              >
                <Heart className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-neutral-200/60 transition-colors"
                onClick={onCartClick}
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#E07A5F] text-white text-xs rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.div>
              )}
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-neutral-200/60"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 relative">
                <input
                  type="text"
                  placeholder="Search for styles, fits, vibes..."
                  className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm rounded-3xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#81A4CD]/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                
                {searchQuery && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-3xl border border-neutral-200 overflow-hidden shadow-lg"
                  >
                    {filteredSuggestions.map((suggestion, i) => (
                      <motion.div
                        key={suggestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-6 py-3 hover:bg-neutral-100 cursor-pointer transition-colors"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setIsSearchOpen(false);
                        }}
                      >
                        {suggestion}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-6 flex flex-col gap-3"
            >
              <MobileNavLink>New Drops</MobileNavLink>
              <MobileNavLink>Collections</MobileNavLink>
              <MobileNavLink>Archive</MobileNavLink>
              <MobileNavLink>Community</MobileNavLink>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      className="text-neutral-700 hover:text-neutral-900 transition-colors relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neutral-900 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}

function MobileNavLink({ children }: { children: React.ReactNode }) {
  return (
    <motion.a
      href="#"
      className="text-neutral-700 hover:text-neutral-900 py-2 px-4 rounded-2xl hover:bg-neutral-100 transition-colors"
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
