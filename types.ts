export enum PromoCategory {
  VPN = 'VPN',
  FINANCE = 'FINANCE',
  TECH = 'TECH',
  GAMING = 'GAMING',
  APPS = 'APPS',
  SHOPPING = 'SHOPPING',
  TRAVEL = 'TRAVEL',
  OTHER = 'OTHER'
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string; // Simulated
  createdAt: string;
}

export interface PromoCode {
  id: string;
  creatorId: string;
  brandName: string;
  promoCode: string;
  destinationUrl: string;
  category: PromoCategory;
  discountSummary?: string;
  expiresAt?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface AuthState {
  user: Creator | null;
  isAuthenticated: boolean;
}