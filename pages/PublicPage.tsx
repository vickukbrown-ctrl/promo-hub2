import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/storage';
import { Creator, PromoCode } from '../types';
import { PromoCard } from '../components/PromoCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { Share2 } from 'lucide-react';

export const PublicPage: React.FC = () => {
  const { username } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const load = async () => {
      if (!username) return;
      const foundCreator = await dataService.getCreatorByUsername(username);
      if (foundCreator) {
        setCreator(foundCreator);
        const allPromos = await dataService.getPromosByCreator(foundCreator.id);
        // Only show active
        setPromos(allPromos.filter(p => p.isActive));
      }
      setLoading(false);
    };
    load();
  }, [username]);

  if (loading) return <div className="text-center py-20 text-neutral-500">Loading...</div>;

  if (!creator) {
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-2xl font-bold">Creator not found</h1>
        <Link to="/" className="text-sm underline text-neutral-400">Back to Home</Link>
      </div>
    );
  }

  // Calculate categories
  const categoriesSet = new Set<string>();
  promos.forEach(p => categoriesSet.add(p.category));
  const categories = ['All', ...Array.from(categoriesSet)];

  const filteredPromos = activeCategory === 'All' 
    ? promos 
    : promos.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8 pb-20">
      <header className="space-y-4 text-center border-b border-neutral-800 pb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg shadow-black/50">
           {creator.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-bold">{creator.name}</h1>
        <p className="text-neutral-400 max-w-md mx-auto">
          Exclusive deals and promo codes for my community. 
          Grab them while they last!
        </p>
      </header>

      <CategoryTabs 
        categories={categories} 
        active={activeCategory} 
        onChange={setActiveCategory} 
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPromos.length > 0 ? (
          filteredPromos.map(promo => (
            <PromoCard key={promo.id} {...promo} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-neutral-500 text-sm">
            No promo codes found in this category.
          </div>
        )}
      </div>
      
      <footer className="pt-12 text-center border-t border-neutral-800/50 mt-12">
        <p className="text-xs text-neutral-600">
            Powered by <Link to="/" className="text-neutral-400 hover:text-neutral-200">PromoHub</Link>
        </p>
      </footer>
    </div>
  );
};