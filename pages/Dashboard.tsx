import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dataService } from '../services/storage';
import { Creator, PromoCode } from '../types';
import { PromoCard } from '../components/PromoCard';
import { Plus, LogOut, ExternalLink, User } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Creator | null>(null);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);
      const userPromos = await dataService.getPromosByCreator(currentUser.id);
      setPromos(userPromos);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  if (loading) return <div className="text-neutral-500 text-sm">Loading dashboard...</div>;

  if (!user) return null;

  const publicUrl = `#/u/${user.username}`;
  const fullPublicUrl = `${window.location.origin}${window.location.pathname}${publicUrl}`;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
             <User size={14} /> 
             <span>@{user.username}</span>
             <span className="text-neutral-600">•</span>
             <a href={publicUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                View Public Page <ExternalLink size={12} />
             </a>
          </div>
        </div>

        <div className="flex gap-3">
            <button
                onClick={() => navigate('/promo/new')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
                <Plus size={16} /> Add Promo
            </button>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
                <LogOut size={16} /> Log out
            </button>
        </div>
      </header>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-200">Your Active Codes</h2>
        
        {promos.length === 0 ? (
          <div className="border border-dashed border-neutral-800 rounded-xl p-12 text-center space-y-3">
             <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-neutral-500">
                <Plus size={24} />
             </div>
             <p className="text-neutral-400">You don't have any promo codes yet.</p>
             <button onClick={() => navigate('/promo/new')} className="text-sm underline text-white">Create your first one</button>
          </div>
        ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {promos.map(promo => (
                    <PromoCard
                        key={promo.id}
                        {...promo}
                        showEditLink
                        onEdit={() => navigate(`/promo/edit/${promo.id}`)}
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};