import { Creator, PromoCode, PromoCategory } from '../types';

const CREATORS_KEY = 'promohub_creators';
const PROMOS_KEY = 'promohub_promos';
const SESSION_KEY = 'promohub_session';

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize storage if empty
const initStorage = () => {
  if (!localStorage.getItem(CREATORS_KEY)) localStorage.setItem(CREATORS_KEY, JSON.stringify([]));
  if (!localStorage.getItem(PROMOS_KEY)) localStorage.setItem(PROMOS_KEY, JSON.stringify([]));
};

initStorage();

// Auth Services
export const authService = {
  async getCurrentUser(): Promise<Creator | null> {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    const creators: Creator[] = JSON.parse(localStorage.getItem(CREATORS_KEY) || '[]');
    return creators.find(c => c.id === id) || null;
  },

  async login(identity: string, password: string): Promise<{ user?: Creator; error?: string }> {
    await delay(500);
    const creators: Creator[] = JSON.parse(localStorage.getItem(CREATORS_KEY) || '[]');
    const user = creators.find(c => 
      (c.email.toLowerCase() === identity.toLowerCase() || c.username.toLowerCase() === identity.toLowerCase()) &&
      c.passwordHash === password // In real app, use bcrypt
    );

    if (!user) return { error: 'Invalid credentials' };
    
    localStorage.setItem(SESSION_KEY, user.id);
    return { user };
  },

  async register(data: Omit<Creator, 'id' | 'createdAt'>): Promise<{ user?: Creator; error?: string }> {
    await delay(500);
    const creators: Creator[] = JSON.parse(localStorage.getItem(CREATORS_KEY) || '[]');
    
    if (creators.some(c => c.email === data.email || c.username === data.username)) {
      return { error: 'Email or username already taken' };
    }

    const newUser: Creator = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    creators.push(newUser);
    localStorage.setItem(CREATORS_KEY, JSON.stringify(creators));
    localStorage.setItem(SESSION_KEY, newUser.id);
    
    return { user: newUser };
  },

  async logout() {
    localStorage.removeItem(SESSION_KEY);
  }
};

// Data Services
export const dataService = {
  async getPromosByCreator(creatorId: string): Promise<PromoCode[]> {
    await delay(300);
    const promos: PromoCode[] = JSON.parse(localStorage.getItem(PROMOS_KEY) || '[]');
    return promos
      .filter(p => p.creatorId === creatorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getCreatorByUsername(username: string): Promise<Creator | null> {
    await delay(300);
    const creators: Creator[] = JSON.parse(localStorage.getItem(CREATORS_KEY) || '[]');
    return creators.find(c => c.username.toLowerCase() === username.toLowerCase()) || null;
  },

  async createPromo(promoData: Omit<PromoCode, 'id' | 'createdAt' | 'isActive'>): Promise<PromoCode> {
    await delay(400);
    const promos: PromoCode[] = JSON.parse(localStorage.getItem(PROMOS_KEY) || '[]');
    const newPromo: PromoCode = {
      ...promoData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      isActive: true
    };
    promos.push(newPromo);
    localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
    return newPromo;
  },

  async updatePromo(id: string, updates: Partial<PromoCode>): Promise<PromoCode> {
    await delay(400);
    const promos: PromoCode[] = JSON.parse(localStorage.getItem(PROMOS_KEY) || '[]');
    const index = promos.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Promo not found");
    
    const updatedPromo = { ...promos[index], ...updates };
    promos[index] = updatedPromo;
    localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
    return updatedPromo;
  },

  async getPromoById(id: string): Promise<PromoCode | null> {
    const promos: PromoCode[] = JSON.parse(localStorage.getItem(PROMOS_KEY) || '[]');
    return promos.find(p => p.id === id) || null;
  }
};