import React, { useEffect, useState } from 'react';
import { useStore } from './OmniStoreContext';
import { ArrowRight, ArrowUpRight, Gem, Truck } from 'lucide-react';

/**
 * HERO VARIANT 2 — Split Screen.
 * Solid elevated text panel on the left, full-height image column on the
 * right. Same banners, same CTAs, same auto-rotation; only the layout differs.
 */
export const Hero: React.FC = () => {
  const { activePreset, navigateTo, setFilterState } = useStore();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners = activePreset?.banners && activePreset.banners.length > 0
    ? activePreset.banners
    : [
        {
          id: 'default-hero',
          title: activePreset?.name || 'Curated Essentials',
          subtitle: activePreset?.tagline || 'Modern elegance, uncompromising craft, and timeless design.',
          tag: activePreset?.categoryTag || 'NEW COLLECTION',
          ctaText: 'Explore Collection',
          image: activePreset?.categories?.[0]?.bannerImage || activePreset?.categories?.[0]?.image || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1600&auto=format&fit=crop&q=80',
        },
      ];

  const activeBanner = banners[currentBannerIndex % banners.length] || banners[0];
  const Headline = (activeBanner as any).Headline || (activeBanner as any).headline || activeBanner.title;
  const headline2 = (activeBanner as any).headline2 || (activeBanner as any).subheadline || activeBanner.subtitle;
  const Badge = (activeBanner as any).Badge || (activeBanner as any).badge || activeBanner.tag || activePreset.categoryTag;
  const CTA1 = (activeBanner as any).CTA1 || (activeBanner as any).cta || activeBanner.ctaText || 'Explore Collection';
  const CTA2 = (activeBanner as any).CTA2 || (activeBanner as any).secondaryCta || `${activePreset?.name || 'Store'} New Arrivals`;

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] sm:min-h-[580px] border border-os overflow-hidden bg-os-surface-elevated shadow-xl">

        {/* Left — solid text panel */}
        <div className="order-2 lg:order-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 space-y-6 bg-os-surface-elevated text-os-body">
          <div className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-os-accent/10 border border-os-accent/30 text-os-accent text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-os-accent animate-pulse" />
            <span>{Badge}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight font-display leading-[1.08] text-os-body">
              {Headline}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-os-muted leading-relaxed max-w-md">
              {headline2}
            </p>
          </div>

          {/* Action Buttons — same targets as HeroV1 */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, categoryId: undefined }));
                navigateTo({ name: 'plp' });
              }}
              className="bg-os-primary text-white hover:bg-os-primary-hover font-bold text-xs sm:text-sm px-7 py-3.5 rounded-os transition-all duration-200 flex items-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-102 active:scale-98"
              id="hero-primary-cta"
            >
              <span>{CTA1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setFilterState((prev) => ({ ...prev, isFeatured: true }));
                navigateTo({ name: 'plp' });
              }}
              className="border border-os hover:border-os-primary text-os-body font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-os transition-all flex items-center gap-2"
              id="hero-secondary-cta"
            >
              <span>{activePreset?.name || 'Store'} New Arrivals</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-os-muted" />
            </button>
          </div>

          {/* Trust highlights */}
          <div className="pt-4 flex items-center gap-6 text-[11px] text-os-muted border-t border-os">
            <div className="flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-os-primary" />
              <span>Artisan Provenance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-os-primary" />
              <span>Complimentary Shipping</span>
            </div>
          </div>

          {/* Banner dot switcher (same rotation state as V1's prev/next) */}
          {banners.length > 1 && (
            <div className="flex items-center gap-2 pt-2">
              {banners.map((b, i) => (
                <button
                  key={b.id || i}
                  onClick={() => setCurrentBannerIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentBannerIndex % banners.length
                      ? 'w-8 bg-os-primary'
                      : 'w-3 bg-os-border hover:bg-os-muted'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — full-height image column */}
        <div className="order-1 lg:order-2 relative min-h-[320px] lg:min-h-0 overflow-hidden">
          {activeBanner.image && (
            <img
              key={activeBanner.id || activeBanner.title}
              src={activeBanner.image}
              alt={activeBanner.title}
              className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-os-primary/10" />
        </div>

      </div>
    </section>
  );
};
