import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate, Link, useLocation } from "react-router";
import { Heart, ShoppingBag, ArrowLeft, Package, Truck, Shield, ChevronDown } from "lucide-react";
import { FloatingNav } from "../components/FloatingNav";
import { MobileNav } from "../components/MobileNav";
import { CartDrawer } from "../components/CartDrawer";
import { SearchOverlay } from "../components/SearchOverlay";

interface ProductDetailsData {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  description: string;
  details: string[];
  material: string;
  fit: string;
}

const mockProducts: Record<string, ProductDetailsData> = {
  "nike-air-max-1": {
    id: "nike-air-max-1",
    name: "Air Max 97 SE",
    price: 175,
    salePrice: 140,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    brand: {
      id: "nike",
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    },
    description: "Elevated comfort meets street-ready style. The Air Max 97 SE features full-length visible Max Air cushioning and a sleek, futuristic design that's stood the test of time.",
    details: [
      "Full-length visible Air-Sole unit for cushioning",
      "Mesh and synthetic upper for breathability and durability",
      "Rubber outsole with waffle pattern for traction",
      "Reflective piping for visibility in low light",
    ],
    material: "Mesh and synthetic leather",
    fit: "True to size",
  },
  "nike-hoodie-1": {
    id: "nike-hoodie-1",
    name: "Tech Fleece Hoodie",
    price: 120,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    brand: {
      id: "nike",
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    },
    description: "Premium comfort engineered for everyday wear. Nike Tech Fleece delivers warmth without the weight for all-day versatility.",
    details: [
      "Nike Tech Fleece fabric for lightweight warmth",
      "Kangaroo pocket for storage",
      "Ribbed cuffs and hem for a snug fit",
      "Slightly brushed interior for comfort",
    ],
    material: "100% Polyester",
    fit: "Regular fit",
  },
  "stussy-tee-1": {
    id: "stussy-tee-1",
    name: "Vintage Wash Logo Tee",
    price: 45,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    brand: {
      id: "stussy",
      name: "Stüssy",
      logo: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
    },
    description: "Classic streetwear staple with a vintage-inspired wash. The Stüssy logo tee brings timeless style with a worn-in feel that gets better with every wear.",
    details: [
      "Vintage wash for unique character",
      "Screen-printed logo graphic",
      "Ribbed crew neck",
      "Preshrunk for lasting fit",
    ],
    material: "100% Cotton",
    fit: "Relaxed fit",
  },
  "zara-blazer-1": {
    id: "zara-blazer-1",
    name: "Structured Double Breasted Blazer",
    price: 129,
    salePrice: 89,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    brand: {
      id: "zara",
      name: "ZARA",
      logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop",
    },
    description: "Effortless elegance meets modern minimalism. This structured blazer features a timeless double-breasted silhouette that elevates any look.",
    details: [
      "Double-breasted front with button closure",
      "Structured shoulders for refined silhouette",
      "Front flap pockets",
      "Fully lined interior",
    ],
    material: "Polyester blend",
    fit: "Tailored fit",
  },
  "zara-pants-1": {
    id: "zara-pants-1",
    name: "Wide Leg Trousers",
    price: 59,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    brand: {
      id: "zara",
      name: "ZARA",
      logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop",
    },
    description: "Contemporary wide-leg trousers that combine comfort with sophisticated style. Perfect for creating elegant, modern looks.",
    details: [
      "High-rise waist",
      "Wide leg silhouette",
      "Side pockets",
      "Back welt pockets",
    ],
    material: "Polyester blend",
    fit: "Wide leg",
  },
  "adidas-forum-1": {
    id: "adidas-forum-1",
    name: "Forum Low Classic",
    price: 110,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    inStock: true,
    brand: {
      id: "adidas",
      name: "adidas Originals",
      logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop",
    },
    description: "Retro vibes meet modern performance. The Forum Low Classic brings basketball heritage to the streets with iconic style.",
    details: [
      "Leather upper for premium feel",
      "Rubber cupsole for durability",
      "Ankle strap with hook-and-loop closure",
      "EVA midsole for comfort",
    ],
    material: "Leather and synthetic",
    fit: "True to size",
  },
  "adidas-track-1": {
    id: "adidas-track-1",
    name: "Adicolor Classics Track Jacket",
    price: 85,
    image: "https://images.unsplash.com/photo-1614252368036-9a3d8f6b7f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1614252368036-9a3d8f6b7f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    brand: {
      id: "adidas",
      name: "adidas Originals",
      logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop",
    },
    description: "Classic track style with signature 3-Stripes. This Adicolor jacket delivers timeless athletic aesthetics.",
    details: [
      "Stand-up collar with zipper closure",
      "Iconic 3-Stripes on sleeves",
      "Ribbed cuffs and hem",
      "Front zip pockets",
    ],
    material: "Polyester tricot",
    fit: "Regular fit",
  },
  "nb-990-1": {
    id: "nb-990-1",
    name: "990v6 Made in USA",
    price: 199,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    brand: {
      id: "newbalance",
      name: "New Balance",
      logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop",
    },
    description: "Made in USA premium craftsmanship. The 990v6 continues the legacy with superior comfort and timeless style.",
    details: [
      "Premium pigskin and mesh upper",
      "ENCAP midsole for support and durability",
      "Blown rubber outsole",
      "Made in USA with premium materials",
    ],
    material: "Pigskin and mesh",
    fit: "True to size",
  },
  "carhartt-jacket-1": {
    id: "carhartt-jacket-1",
    name: "Detroit Jacket",
    price: 169,
    salePrice: 135,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    brand: {
      id: "carhartt",
      name: "Carhartt WIP",
      logo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=200&h=200&fit=crop",
    },
    description: "Workwear heritage meets contemporary street style. The Detroit Jacket is an essential layering piece built to last.",
    details: [
      "Durable cotton canvas construction",
      "Blanket lined body for warmth",
      "Multiple utility pockets",
      "Adjustable cuffs and waistband",
    ],
    material: "Cotton canvas with blanket lining",
    fit: "Relaxed fit",
  },
};

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const stored = localStorage.getItem("fithaus_cart");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("fithaus_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Helper to find or generate a product details model dynamically
  const getProduct = (): ProductDetailsData | null => {
    if (!productId) return null;
    
    // 1. Check static mock database
    if (mockProducts[productId]) {
      return mockProducts[productId];
    }
    
    // 2. Check location state
    if (location.state?.product) {
      const sp = location.state.product;
      const numericPrice = typeof sp.price === 'number' 
        ? sp.price 
        : parseFloat(sp.price.toString().replace('$', ''));
        
      const salePrice = sp.salePrice ? (
        typeof sp.salePrice === 'number' ? sp.salePrice : parseFloat(sp.salePrice.toString().replace('$', ''))
      ) : undefined;

      return {
        id: sp.id.toString(),
        name: sp.name,
        price: numericPrice,
        salePrice: salePrice,
        image: sp.image,
        images: sp.images || [sp.image],
        sizes: sp.sizes || ["S", "M", "L", "XL"],
        inStock: sp.hasOwnProperty('inStock') ? sp.inStock : true,
        brand: {
          id: sp.brand?.id || sp.brand?.name?.toLowerCase().replace(/\s+/g, '-') || "fithaus",
          name: sp.brand?.name || sp.brand || "FITHAUS",
          logo: sp.brand?.logo || "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
        },
        description: `${sp.name} by ${sp.brand?.name || sp.brand || "FITHAUS"}. Elevated streetwear crafted with premium quality materials, comfortable fit, and modern aesthetics.`,
        details: [
          "Premium construction designed for comfort",
          "Relaxed silhouette matching modern styles",
          "Double stitched seams for durability",
          "Easy care fabric",
        ],
        material: sp.material || "Premium Cotton blend",
        fit: sp.fit || "Relaxed fit",
      };
    }
    
    // 3. Fallback: Lookup in catalog item lists
    const allCatalogItems = [
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
      
      { id: "b2", name: "Wide Leg Jeans", price: 124, brand: "Minimal Co", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
      { id: "b3", name: "Parachute Pants", price: 115, brand: "TechWear Co", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
      { id: "b5", name: "Carpenter Shorts", price: 78, brand: "Vintage Archive", sizes: ["30", "32", "34"], image: "https://images.unsplash.com/photo-1565084888279-aca607ecad0c?w=400" },
      { id: "b6", name: "Distressed Denim", price: 135, brand: "Vintage Archive", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400" },
      { id: "b8", name: "Nylon Track Pants", price: 115, brand: "TechWear Co", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
      { id: "b9", name: "Utility Cargo Shorts", price: 85, brand: "TechWear Co", sizes: ["30", "32", "34"], image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },

      { id: "s1", name: "Sneakers", price: 140, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
      { id: "s2", name: "Chunky Trainers", price: 165, brand: "TechWear Co", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400" },
      { id: "s3", name: "Chelsea Boots", price: 195, brand: "Minimal Co", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400" },
      { id: "s4", name: "Utility Slides", price: 60, brand: "FITHAUS", sizes: ["7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400" },
      { id: "s5", name: "Retro Runners", price: 120, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: "s6", name: "Chunky Loafers", price: 175, brand: "Minimal Co", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400" },
      { id: "s7", name: "High Top Canvas", price: 95, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" },
      { id: "s8", name: "Suede Desert Boots", price: 185, brand: "Vintage Archive", sizes: ["8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400" },

      { id: "p1", name: "Oversized Comfort Hoodie", price: 128, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400" },
      { id: "p2", name: "Relaxed Cargo Pants", price: 98, brand: "FITHAUS", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
      { id: "p3", name: "Classic Sneakers", price: 140, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400" },
      { id: "p4", name: "Tech Utility Vest", price: 156, brand: "TechWear Co", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?w=400" },
      { id: "p5", name: "Performance Pants", price: 142, brand: "TechWear Co", sizes: ["30", "32", "34", "36"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
      { id: "p6", name: "Vintage Denim Jacket", price: 156, brand: "Vintage Archive", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400" },
      { id: "p7", name: "Essential White Tee", price: 48, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400" },
      { id: "p8", name: "Minimal Blazer", price: 188, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
      { id: "p9", name: "Wide Leg Trousers", price: 124, brand: "Minimal Co", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
      { id: "p20", name: "Essential Cream Tee", price: 48, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400" },
      { id: "p21", name: "Vintage Canvas Tote", price: 35, brand: "Vintage Archive", sizes: ["O/S"], image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=400" },
      { id: "p22", name: "Relaxed Beige Chinos", price: 88, brand: "Minimal Co", sizes: ["30", "32", "34"], image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
      { id: "p30", name: "Y2K Cargo Pants", price: 98, brand: "FITHAUS", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?w=400" },
      { id: "p31", name: "Graphic Baby Tee", price: 42, brand: "Y2K Retro", sizes: ["XS", "S", "M", "L"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400" },

      { id: 3, name: "Vintage Denim", price: 156, brand: "Vintage Archive", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400" },
      { id: 4, name: "Techwear Essentials", price: 198, brand: "TechWear Co", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1535732278552-5a8a57552b63?w=400" },
      { id: 5, name: "Y2K Cargo", price: 142, brand: "FITHAUS", sizes: ["28", "30", "32", "34"], image: "https://images.unsplash.com/photo-1700676195086-81b936390de4?w=400" },
      { id: 6, name: "Sneaker Culture", price: 210, brand: "Urban Kicks", sizes: ["8", "9", "10", "11", "12"], image: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?w=400" },
      { id: 7, name: "Minimal Blazer", price: 188, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1616715623022-65d18f0042ae?w=400" },
      { id: 8, name: "Urban Layers", price: 164, brand: "FITHAUS", sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1612266686586-70af879c032d?w=400" },
    ];

    const match = allCatalogItems.find(item => item.id.toString() === productId.toString());
    if (match) {
      return {
        id: match.id.toString(),
        name: match.name,
        price: match.price,
        image: match.image,
        images: [match.image],
        sizes: match.sizes,
        inStock: true,
        brand: {
          id: match.brand.toLowerCase().replace(/\s+/g, '-'),
          name: match.brand,
          logo: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
        },
        description: `${match.name} by ${match.brand}. Premium streetwear designed for high visual aesthetic and everyday durability.`,
        details: [
          "Premium construct designed for comfort",
          "Relaxed silhouette matching modern styles",
          "Double stitched seams for durability",
        ],
        material: "100% Premium fabric",
        fit: "Regular fit",
      };
    }

    // 4. Dynamic Fallback: return a default structured object based on the ID
    const formattedIdName = productId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      id: productId,
      name: formattedIdName,
      price: 120,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"],
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      brand: {
        id: "fithaus",
        name: "FITHAUS",
        logo: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
      },
      description: `${formattedIdName} by FITHAUS. Elevated streetwear crafted with premium quality materials, comfortable fit, and modern aesthetics.`,
      details: [
        "Premium construct designed for comfort",
        "Relaxed silhouette matching modern styles",
        "Double stitched seams for durability",
      ],
      material: "Premium Cotton blend",
      fit: "Relaxed fit",
    };
  };

  const product = getProduct();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#2C2C2C] text-white rounded-full"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      const newItem = {
        id: `${product.id}-${selectedSize}`,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        brand: product.brand.name,
        size: selectedSize,
        quantity: 1,
      };
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === newItem.id);
        if (existing) {
          return prev.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, newItem];
      });
      setIsCartOpen(true);
      setTimeout(() => setIsCartOpen(false), 2000);
    }
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
      <FloatingNav
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      <div className="pt-[60px] pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-[#2C2C2C] hover:text-[#2C2C2C]/70 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </motion.button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <motion.div
                className="aspect-square bg-white rounded-[24px] overflow-hidden mb-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-[16px] overflow-hidden ${
                      selectedImageIndex === index
                        ? "ring-2 ring-[#2C2C2C]"
                        : "opacity-60"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div>
              {/* Brand */}
              <Link to={`/brand/${product.brand.id}`}>
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-[#2C2C2C]/10">
                    <img
                      src={product.brand.logo}
                      alt={product.brand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-lg">{product.brand.name}</p>
                </motion.div>
              </Link>

              {/* Product Name */}
              <h1 className="text-4xl font-medium mb-4">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-medium">
                  ${product.salePrice || product.price}
                </span>
                {product.salePrice && (
                  <>
                    <span className="text-xl text-[#2C2C2C]/40 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-[#D4927D] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-[#2C2C2C]/80 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="font-medium mb-3">Select Size</p>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-[12px] font-medium border-2 transition-all ${
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

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 py-4 bg-[#2C2C2C] text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                  whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                >
                  <ShoppingBag size={20} />
                  Add to Bag
                </motion.button>
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-[#2C2C2C]/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={22}
                    className={isLiked ? "text-[#D4927D]" : "text-[#2C2C2C]"}
                    fill={isLiked ? "#D4927D" : "none"}
                  />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <FeatureCard icon={<Package size={20} />} title="Free Returns" />
                <FeatureCard icon={<Truck size={20} />} title="Fast Shipping" />
                <FeatureCard icon={<Shield size={20} />} title="Authentic" />
              </div>

              {/* Product Details Accordion */}
              <div className="bg-white rounded-[20px] p-6">
                <motion.button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-between"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium text-lg">Product Details</span>
                  <motion.div
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3 text-[#2C2C2C]/80">
                        <div>
                          <p className="font-medium text-[#2C2C2C] mb-1">Material</p>
                          <p>{product.material}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#2C2C2C] mb-1">Fit</p>
                          <p>{product.fit}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#2C2C2C] mb-2">Features</p>
                          <ul className="space-y-1">
                            {product.details.map((detail, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-[#2C2C2C] rounded-full mt-2 flex-shrink-0"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
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
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      className="bg-[#F5F3F0] rounded-[16px] p-4 text-center"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-center mb-2 text-[#7B9CAC]">{icon}</div>
      <p className="text-xs font-medium">{title}</p>
    </motion.div>
  );
}
