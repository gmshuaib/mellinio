import React, { useState } from 'react';
import { useStore } from './OmniStoreContext';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * PRODUCT GRID VARIANT 3 — Horizontal Discovery Rail.
 * Same tabs and data, but products render in a scrollable horizontal rail
 * with edge arrows. Header collapses to a single row. Identical view-all.
 */
export const Products: React.FC<{ data?: any; products?: Product[]; onQuickView?: (p: Product) => void }> = ({ data, products: propProducts, onQuickView }) => {
  const { navigateTo, setFilterState, products: storeProducts } = useStore();
  const products = propProducts && propProducts.length > 0 ? propProducts : (storeProducts || []);
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');
  const railRef = React.useRef<HTMLDivElement>(null);

  const Badge = data?.Badge || data?.badge || 'SIGNATURE OFFERINGS';
  const Headline = data?.Headline || data?.headline || data?.title || 'Selected Pieces';
  const headline2 = data?.headline2 || data?.subheadline || data?.description || '';

  const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  const newArrivals = [...products].reverse().slice(0, 8);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  const displayedProducts =
    activeTab === 'featured'
      ? featured.length > 0 ? featured : products.slice(0, 8)
      : activeTab === 'bestsellers'
      ? bestSellers
      : newArrivals;

  const scrollRail = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="py-2">
      {/* Single-row header: title left, tabs middle, arrows right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {Badge}
          </span>
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white font-display mt-0.5">
            {Headline}
          </h2>
          {headline2 && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {headline2}
            </p>
          )}
        </div>

        <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full text-xs font-semibold border border-zinc-200/80 dark:border-zinc-800">
          {(['featured', 'bestsellers', 'new'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab === 'featured' ? 'Featured' : tab === 'bestsellers' ? 'Best Sellers' : 'New Arrivals'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollRail(-1)}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 transition-colors"
            aria-label="Scroll products left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollRail(1)}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 transition-colors"
            aria-label="Scroll products right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden max-w-7xl mx-auto px-4 mb-4 flex gap-2">
        {(['featured', 'bestsellers', 'new'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500'
            }`}
          >
            {tab === 'featured' ? 'Featured' : tab === 'bestsellers' ? 'Best Sellers' : 'New'}
          </button>
        ))}
      </div>

      {/* Horizontal scroll rail */}
      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 sm:px-6 lg:px-[max(1rem,calc((100vw-80rem)/2+1.5rem))] pb-2"
      >
        {displayedProducts.map((product) => (
          <div key={product.id} className="w-[260px] sm:w-[280px] shrink-0 snap-start">
            <ProductCard
              product={product}
              onQuickView={onQuickView}
            />
          </div>
        ))}

        {/* End card — doubles as view-all */}
        <button
          onClick={() => {
            setFilterState((prev) => ({ ...prev, categoryId: undefined }));
            navigateTo({ name: 'plp' });
          }}
          className="w-[180px] shrink-0 snap-start rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-white hover:text-zinc-950 dark:hover:text-white transition-colors flex flex-col items-center justify-center gap-2 text-xs font-bold"
        >
          <ArrowRight className="w-5 h-5" />
          <span>Explore Complete Catalog</span>
        </button>
      </div>
    </section>
  );
};
