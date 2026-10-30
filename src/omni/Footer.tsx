import React, { useState } from 'react';
import { useStore } from './OmniStoreContext';
import { ArrowRight } from 'lucide-react';

/**
 * FOOTER VARIANT 2 — Centered Newsletter Band.
 * Structural remix of the original footer: light elevated surface, a large
 * centered newsletter call-out, inline category chip row, and a compact
 * two-column link layout. Same navigation targets, same subscribe handler.
 */
export const Footer: React.FC<{ data?: any }> = ({ data }) => {
  const { activePreset, categories, navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const Headline = data?.Headline || data?.headline || data?.title || `Join the ${activePreset.name} list`;
  const headline2 = data?.headline2 || data?.subheadline || data?.description || `${activePreset.tagline}. New arrivals, private sales and artisan stories — straight to your inbox.`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('Subscribed', 'You will receive our latest updates and lookbooks.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-os-surface-elevated text-os-body border-t border-os transition-colors duration-200 mt-24">

      {/* Newsletter Band — centered hero-style call-out */}
      <div className="border-b border-os">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-medium font-display tracking-tight text-os-body">
            {Headline}
          </h3>
          <p className="text-xs text-os-muted leading-relaxed max-w-md mx-auto">
            {headline2}
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-os-surface border border-os text-os-body text-xs px-4 py-2.5 rounded-os flex-1 focus:outline-none focus:border-os-primary placeholder:text-os-muted"
              required
            />
            <button
              type="submit"
              className="bg-os-primary text-white font-semibold text-xs px-5 py-2.5 rounded-os hover:bg-os-primary-hover transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>

      {/* Category Chip Row */}
      <div className="border-b border-os">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigateTo({ name: 'plp', categoryId: cat.id })}
              className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider border border-os rounded-full text-os-muted hover:text-os-body hover:border-os-primary transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">

          {/* Brand */}
          <div className="space-y-3">
            <button
              onClick={() => navigateTo({ name: 'home' })}
              className="text-sm font-bold text-os-body font-display tracking-tight"
            >
              {activePreset.name}
            </button>
            <p className="text-[11px] text-os-muted leading-relaxed">
              © {new Date().getFullYear()} {activePreset.name}. All rights reserved.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-muted mb-3">Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo({ name: 'faq' })} className="text-os-muted hover:text-os-primary transition-colors">Help & FAQs</button></li>
              <li><button onClick={() => navigateTo({ name: 'shipping-policy' })} className="text-os-muted hover:text-os-primary transition-colors">Shipping Information</button></li>
              <li><button onClick={() => navigateTo({ name: 'order-tracking' })} className="text-os-muted hover:text-os-primary transition-colors">Track Order</button></li>
              <li><button onClick={() => navigateTo({ name: 'contact' })} className="text-os-muted hover:text-os-primary transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-muted mb-3">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo({ name: 'about' })} className="text-os-muted hover:text-os-primary transition-colors">About</button></li>
              <li><button onClick={() => navigateTo({ name: 'blog' })} className="text-os-muted hover:text-os-primary transition-colors">Journal</button></li>
              <li><button onClick={() => navigateTo({ name: 'account', tab: 'orders' })} className="text-os-muted hover:text-os-primary transition-colors">Orders</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-os-muted mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigateTo({ name: 'terms' })} className="text-os-muted hover:text-os-primary transition-colors">Terms</button></li>
              <li><button onClick={() => navigateTo({ name: 'privacy' })} className="text-os-muted hover:text-os-primary transition-colors">Privacy</button></li>
              <li>
                <button
                  onClick={() => navigateTo({ name: 'vendor-store', vendorId: activePreset.vendors[0]?.id || '' })}
                  className="text-os-muted hover:text-os-primary transition-colors"
                >
                  Artisan Houses
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Secure line */}
      <div className="border-t border-os py-4">
        <p className="text-center text-[11px] text-os-muted">Secure Checkout</p>
      </div>
    </footer>
  );
};
