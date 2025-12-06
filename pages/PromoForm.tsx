import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService, dataService } from '../services/storage';
import { PromoCode, PromoCategory } from '../types';
import { CATEGORY_OPTIONS } from '../constants';
import { ArrowLeft, Save } from 'lucide-react';

export const PromoForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  
  const [formData, setFormData] = useState<Partial<PromoCode>>({
    brandName: '',
    promoCode: '',
    destinationUrl: '',
    discountSummary: '',
    category: PromoCategory.OTHER,
    expiresAt: '',
  });

  useEffect(() => {
    const load = async () => {
      const user = await authService.getCurrentUser();
      if (!user) {
        navigate('/login');
        return;
      }

      if (isEdit && id) {
        const promo = await dataService.getPromoById(id);
        if (promo && promo.creatorId === user.id) {
          setFormData({
             ...promo,
             expiresAt: promo.expiresAt ? new Date(promo.expiresAt).toISOString().split('T')[0] : ''
          });
        } else {
            navigate('/dashboard');
        }
      }
      setInitialLoading(false);
    };
    load();
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const user = await authService.getCurrentUser();
    if (!user) return;

    const payload = {
        ...formData,
        creatorId: user.id,
        brandName: formData.brandName!,
        promoCode: formData.promoCode!,
        destinationUrl: formData.destinationUrl!,
        category: formData.category as PromoCategory,
        discountSummary: formData.discountSummary || undefined,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt as string).toISOString() : null,
    };

    try {
        if (isEdit && id) {
            await dataService.updatePromo(id, payload);
        } else {
            await dataService.createPromo(payload as any);
        }
        navigate('/dashboard');
    } catch (error) {
        console.error(error);
        alert('Failed to save');
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (initialLoading) return <div className="text-neutral-500">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 text-sm transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-8">{isEdit ? 'Edit Promo Code' : 'Add New Promo Code'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-300">Brand Name</label>
                <input
                    name="brandName"
                    required
                    value={formData.brandName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
                    placeholder="e.g. NordVPN"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">Promo Code</label>
                <input
                    name="promoCode"
                    required
                    value={formData.promoCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-mono focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
                    placeholder="SAVE20"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
                >
                    {CATEGORY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-300">Destination URL</label>
                <input
                    name="destinationUrl"
                    type="url"
                    required
                    value={formData.destinationUrl}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
                    placeholder="https://..."
                />
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-300">Discount Summary</label>
                <input
                    name="discountSummary"
                    value={formData.discountSummary}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all"
                    placeholder="e.g. 82% off + 3 months free"
                />
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-300">Expires At (Optional)</label>
                <input
                    name="expiresAt"
                    type="date"
                    value={formData.expiresAt as string}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all [color-scheme:dark]"
                />
            </div>
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white text-black py-3 text-sm font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
        >
            {loading ? 'Saving...' : <><Save size={16} /> Save Promo Code</>}
        </button>
      </form>
    </div>
  );
};