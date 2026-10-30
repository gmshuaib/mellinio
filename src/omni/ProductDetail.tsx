import React, { useState } from 'react';
import { useStore } from './OmniStoreContext';
import { Product } from './types';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  Check,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';
import { formatCurrency } from './utils';

interface ProductDetailOmniProps {
  data?: any;
  product?: Product;
}

export const ProductDetail: React.FC<ProductDetailOmniProps> = ({ data, product: propProduct }) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currency,
    showToast,
  } = useStore();

  const activeProduct: Product = propProduct || (products && products[0]) || {
    id: 'piece-featured',
    title: 'Monaco Double-Breasted Cashmere Overcoat',
    slug: 'monaco-cashmere-overcoat',
    sku: 'AURA-COAT-01',
    categoryId: 'fashion',
    brand: activePreset?.name || 'AURA',
    price: 680,
    compareAtPrice: 850,
    currency: 'USD',
    type: 'variable',
    stockQuantity: 14,
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1000&auto=format&fit=crop&q=80', alt: 'Coat View 1' },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&auto=format&fit=crop&q=80', alt: 'Coat View 2' },
    ],
    shortDescription: 'Hand-tailored in Biella from Grade-A Mongolian cashmere fibers. Features horn buttons and cupro lining.',
    fullDescription: 'An architectural double-breasted overcoat tailored for a commanding, fluid silhouette. Cut from heavyweight 620gsm organic cashmere with hand-stitched pick detailing along the lapel edge.',
    specifications: {
      'Fiber Content': '100% Mongolian Cashmere (Grade-A)',
      'Lining': '100% Breathable Bemberg Cupro',
      'Buttons': 'Natural Buffalo Horn, Fire-Etched',
      'Origin': 'Handmade in Biella, Italy',
    },
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedColor, setSelectedColor] = useState('Charcoal Melange');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const inWish = isInWishlist(activeProduct.id);

  const images = activeProduct.images && activeProduct.images.length > 0
    ? activeProduct.images
    : [{ id: '1', url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1000&auto=format&fit=crop&q=80', alt: activeProduct.title }];

  const currentImage = images[selectedImageIndex] || images[0];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(activeProduct, { quantity });
    showToast('Added to Cart', `${activeProduct.title} added to your bag.`, 'success');
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery on Left (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
            <img
              src={currentImage.url}
              alt={currentImage.alt || activeProduct.title}
              className="w-full h-full object-cover"
            />
            {activeProduct.compareAtPrice && activeProduct.compareAtPrice > activeProduct.price && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-zinc-950/80 text-white backdrop-blur-xs">
                Sale · Save {Math.round(((activeProduct.compareAtPrice - activeProduct.price) / activeProduct.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.id || i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i
                      ? 'border-zinc-950 dark:border-white scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details on Right (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {activeProduct.brand}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{(activeProduct.rating || 4.8).toFixed(1)}</span>
                <span className="text-zinc-400">({activeProduct.reviewCount || 20})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white font-display">
              {activeProduct.title}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-white">
                {formatCurrency(activeProduct.price, currency)}
              </span>
              {activeProduct.compareAtPrice && activeProduct.compareAtPrice > activeProduct.price && (
                <span className="text-sm line-through text-zinc-400 font-mono">
                  {formatCurrency(activeProduct.compareAtPrice, currency)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {activeProduct.shortDescription}
          </p>

          {/* Size Picker */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-white">Select Size</span>
              <span className="text-zinc-400 underline cursor-pointer">Size Guide</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Small', 'Medium', 'Large', 'X-Large'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSize === sz
                      ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 py-3.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:scale-101 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdding ? 'Adding to Bag...' : 'Add to Bag'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(activeProduct.id)}
              className={`p-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 transition-colors ${
                inWish
                  ? 'bg-rose-500 border-rose-500 text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Specifications Accordion */}
          {activeProduct.specifications && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Specifications & Provenance</span>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {Object.entries(activeProduct.specifications).map(([key, val]) => (
                  <div key={key} className="py-2 flex justify-between">
                    <span className="text-zinc-400">{key}</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping & Returns */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <Truck className="w-4 h-4 text-zinc-400" />
              <span>Complimentary duty-paid express delivery</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
              <RotateCcw className="w-4 h-4 text-zinc-400" />
              <span>30-day effortless worldwide returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailOmni;
