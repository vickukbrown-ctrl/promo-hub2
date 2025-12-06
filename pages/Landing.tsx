import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="space-y-24 py-10 md:py-20">
      <section className="space-y-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Now open for creators
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          One link for all your <span className="text-neutral-500">promos</span>.
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed max-w-lg">
          Stop sending viewers to dead links. Create a single, auto-updating page for all your affiliate deals and discount codes.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            Start for free <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-neutral-800 text-neutral-300 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 border-t border-neutral-900 pt-16">
        {[
            { title: "Always Up-to-Date", desc: "Expired codes are automatically hidden or flagged." },
            { title: "Zero Maintenance", desc: "Update one dashboard, all your video descriptions stay valid." },
            { title: "Better Conversion", desc: "Clean, professional cards that viewers trust." }
        ].map((item, i) => (
            <div key={i} className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                    <CheckCircle size={20} className="text-neutral-400" />
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </section>
    </div>
  );
};