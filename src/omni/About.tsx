import React from 'react';
import { Globe, Leaf, Award } from 'lucide-react';

const PILLARS = [
  {
    icon: Globe,
    num: '01',
    title: '100% Traceable Fibers',
    desc: 'From the high steppes of Inner Mongolia to Tuscan vegetable-tanneries, every single raw material is certified with verifiable batch provenance.',
  },
  {
    icon: Leaf,
    num: '02',
    title: 'Zero-Waste Patterning',
    desc: 'We engineer cut-and-sew templates digitally to eliminate textile excess, repurposing raw off-cuts into bespoke packaging and small leather accessories.',
  },
  {
    icon: Award,
    num: '03',
    title: 'Direct Artisan Guilds',
    desc: 'We bypass intermediary distributors to partner directly with family-run workshops, ensuring transparent living wages and craft preservation.',
  },
];

/**
 * ABOUT VARIANT 3 — Dark Editorial Ledger.
 * Full-bleed dark band, oversized headline, numbered pillar ledger rows with
 * hairline rules, portrait strip on the right. Same content as About.
 */
export const About: React.FC<{ data?: any }> = ({ data }) => {
  const Headline = data?.Headline || data?.headline || data?.title || "The Architecture of Permanence";
  const headline2 = data?.headline2 || data?.description || data?.subheadline || "Founded on the belief that true luxury is defined by longevity, ethical provenance, and master craftsmanship.";
  const Badge = data?.Badge || data?.badge || "Manifesto & Material Ethics";

  return (
  <div className="bg-zinc-950 text-white animate-fadeIn">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

      {/* Left — headline + ledger */}
      <div className="lg:col-span-8 space-y-10">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            {Badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-[1.05]">
            {Headline}
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            {headline2}
          </p>
        </div>

        {/* Numbered ledger rows */}
        <div>
          {PILLARS.map((pillar) => (
            <div key={pillar.num} className="py-6 border-t border-zinc-800 flex gap-6 items-start last:border-b">
              <span className="text-xs font-mono text-zinc-500 pt-1">{pillar.num}</span>
              <pillar.icon className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-base font-bold font-display">{pillar.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1.5 max-w-xl">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — portrait + milestones */}
      <div className="lg:col-span-4 space-y-8">
        <div className="rounded-none overflow-hidden aspect-[3/4] relative border border-zinc-800">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&auto=format&fit=crop&q=80"
            alt="Workshop & Craft Studio"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-lg font-bold font-display">Generations of Unbroken Tradition</h3>
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">Florence • Paris • Milan</span>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { year: '2018', title: 'Establishment of the Paris Flagship', desc: 'Launched with a curated capsule of 8 tailored overcoats and handmade knitwear.' },
            { year: '2021', title: 'Italian Guild Alliances', desc: 'Welcomed master artisans from Florence and Milan for certified leather and bespoke footwear.' },
            { year: '2026', title: '100% Carbon Neutral Global Fulfillment', desc: 'Full lifecycle verification and certified direct duty-paid courier logistics worldwide.' },
          ].map((m) => (
            <div key={m.year} className="flex gap-3">
              <span className="text-xs font-mono font-bold text-emerald-400 pt-0.5">{m.year}</span>
              <div>
                <h4 className="text-xs font-bold">{m.title}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
  );
};
