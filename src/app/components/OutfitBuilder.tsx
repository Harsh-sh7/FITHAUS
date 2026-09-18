import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ShoppingBag, RotateCcw, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '../App';

interface OutfitBuilderProps {
  onAddToCart: (product: Product) => void;
}

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'top' | 'bottom' | 'shoes' | 'accessory';
  position: { x: number; y: number };
}

const availableItems: ClothingItem[] = [
  {
    id: 'outfit-top-1',
    name: 'Archive Hoodie',
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 128,
    category: 'top',
    position: { x: 0, y: 0 },
  },
  {
    id: 'outfit-top-2',
    name: 'Graphic Tee',
    image: 'https://images.unsplash.com/photo-1589902860314-e910697dea18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 65,
    category: 'top',
    position: { x: 0, y: 0 },
  },
  {
    id: 'outfit-bottom-1',
    name: 'Cargo Pants',
    image: 'https://images.unsplash.com/photo-1760998209708-5fc89d7983c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 145,
    category: 'bottom',
    position: { x: 0, y: 0 },
  },
  {
    id: 'outfit-bottom-2',
    name: 'Vintage Denim',
    image: 'https://images.unsplash.com/photo-1741941171881-40832346c7fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 125,
    category: 'bottom',
    position: { x: 0, y: 0 },
  },
  {
    id: 'outfit-shoes-1',
    name: 'Cloud Sneakers',
    image: 'https://images.unsplash.com/photo-1626379625260-7111605463e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 180,
    category: 'shoes',
    position: { x: 0, y: 0 },
  },
  {
    id: 'outfit-acc-1',
    name: 'Urban Beanie',
    image: 'https://images.unsplash.com/photo-1768489038869-965addf93811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    price: 35,
    category: 'accessory',
    position: { x: 0, y: 0 },
  },
];

function DraggableItem({ item, onSelect }: { item: ClothingItem; onSelect: (item: ClothingItem) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'clothing',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-move rounded-2xl overflow-hidden bg-white border-2 border-neutral-200 shadow-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onSelect(item)}
    >
      <div className="aspect-square relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <p className="text-sm text-neutral-900 truncate">{item.name}</p>
        <p className="text-xs text-neutral-600">${item.price}</p>
      </div>
    </motion.div>
  );
}

function DropZone({ onDrop, children }: { onDrop: (item: ClothingItem) => void; children: React.ReactNode }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'clothing',
    drop: (item: ClothingItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative w-full aspect-[3/4] rounded-[40px] border-4 border-dashed transition-all ${
        isOver ? 'border-neutral-900 bg-neutral-100' : 'border-neutral-300 bg-white/60'
      }`}
    >
      {children}
    </div>
  );
}

export function OutfitBuilder({ onAddToCart }: OutfitBuilderProps) {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);

  const handleDrop = (item: ClothingItem) => {
    // Remove existing item of same category, then add new one
    setSelectedItems((prev) => {
      const filtered = prev.filter((i) => i.category !== item.category);
      return [...filtered, item];
    });
  };

  const handleSelect = (item: ClothingItem) => {
    handleDrop(item);
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const addAllToCart = () => {
    selectedItems.forEach((item) => {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <div className="inline-block mb-3">
              <span className="px-4 py-1.5 bg-[#81A4CD]/20 text-[#81A4CD] rounded-full text-sm border border-[#81A4CD]/30">
                Interactive
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-2">
              Build Your Fit
            </h2>
            <p className="text-neutral-600">Drag and drop items to create your perfect outfit</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Canvas */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#F5F3F0] to-white p-8 rounded-[40px] border border-neutral-200 shadow-lg sticky top-24">
                <DropZone onDrop={handleDrop}>
                  <div className="absolute inset-4 flex items-center justify-center">
                    {selectedItems.length === 0 ? (
                      <div className="text-center text-neutral-400">
                        <p className="text-lg mb-2">Drag items here</p>
                        <p className="text-sm">or tap to add</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <AnimatePresence>
                          {selectedItems.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-neutral-200"
                            >
                              <div className="aspect-square">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-2">
                                <p className="text-xs text-neutral-900 truncate">{item.name}</p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </DropZone>

                {/* Actions */}
                {selectedItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-3"
                  >
                    <div className="flex items-center justify-between px-4 py-3 bg-white/60 backdrop-blur-sm rounded-3xl border border-neutral-200">
                      <span className="text-neutral-700">Total</span>
                      <span className="text-2xl text-neutral-900">${totalPrice}</span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full flex-shrink-0"
                        onClick={() => setSelectedItems([])}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full flex-shrink-0"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        className="flex-1 rounded-full bg-neutral-900 hover:bg-neutral-800"
                        onClick={addAllToCart}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Items Library */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {['top', 'bottom', 'shoes', 'accessory'].map((category) => {
                  const categoryItems = availableItems.filter((item) => item.category === category);
                  return (
                    <div key={category}>
                      <h3 className="text-xl text-neutral-900 mb-4 capitalize">{category}s</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {categoryItems.map((item) => (
                          <DraggableItem key={item.id} item={item} onSelect={handleSelect} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </DndProvider>
  );
}
