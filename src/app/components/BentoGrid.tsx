import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 3,
    name: "Vintage Denim",
    price: "$156",
    brand: "Vintage Archive",
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc4MDMwNTQyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-1 row-span-2",
    tags: ["Vintage", "Denim"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 4,
    name: "Techwear Essentials",
    price: "$198",
    brand: "TechWear Co",
    image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNod2VhciUyMHVyYmFuJTIwZmFzaGlvbiUyMGJsYWNrfGVufDF8fHx8MTc4MDM4MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-1 row-span-1",
    tags: ["Techwear", "Urban"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 5,
    name: "Y2K Cargo",
    price: "$142",
    brand: "FITHAUS",
    image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5MmslMjBmYXNoaW9uJTIwY2FyZ28lMjBwYW50c3xlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-1 row-span-1",
    tags: ["Y2K", "Pants"],
    sizes: ["28", "30", "32", "34"],
    inStock: true,
  },
  {
    id: 6,
    name: "Sneaker Culture",
    price: "$210",
    brand: "Urban Kicks",
    image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwc25lYWtlcnMlMjBmYXNoaW9uJTIwc2hvb3R8ZW58MXx8fHwxNzgwMzgzMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-2 row-span-1",
    tags: ["Sneakers", "Limited"],
    sizes: ["8", "9", "10", "11", "12"],
    inStock: true,
  },
  {
    id: 7,
    name: "Minimal Blazer",
    price: "$188",
    brand: "FITHAUS",
    image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjBibGF6ZXIlMjBtaW5pbWFsJTIwZmFzaGlvbnxlbnwxfHx8fDE3ODAzODMxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-1 row-span-1",
    tags: ["Minimal", "Oversized"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 8,
    name: "Urban Layers",
    price: "$164",
    brand: "FITHAUS",
    image: "https://images.unsplash.com/photo-1612266686586-70af879c032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB1cmJhbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc4MDM4MzE2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    span: "col-span-1 row-span-2",
    tags: ["Streetwear", "Layering"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
];

export function BentoGrid({ onAddToCart, onAddToWishlist, selectedCategory = "all" }: { 
  onAddToCart: (item: any) => void;
  onAddToWishlist: (item: any) => void;
  selectedCategory?: string;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
  });

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]">
          {filteredProducts.map((product, index) => {
            // If the grid is filtered, remove specific spans to prevent grid layout breaks
            const spanClass = selectedCategory === "all" ? product.span : "col-span-1 row-span-1";

            return (
              <motion.div
                key={product.id}
                className={`${spanClass} relative group cursor-pointer`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onHoverStart={() => setHoveredId(product.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => onAddToCart(product)}
              >
                <div className="h-full rounded-[24px] overflow-hidden bg-white shadow-md border border-[#2C2C2C]/5">
                  {/* Image */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex gap-1.5 mb-2">
                        {product.tags.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-white text-base md:text-lg font-medium leading-tight mb-1">{product.name}</h3>
                      <p className="text-white/95 text-sm font-semibold">{product.price}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToWishlist(product);
                        }}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={14} className="text-[#D4927D]" />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="w-8 h-8 rounded-full bg-[#7B9CAC] flex items-center justify-center shadow-sm text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
