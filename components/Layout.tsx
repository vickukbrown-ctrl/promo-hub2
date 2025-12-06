import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-12 min-h-screen flex flex-col">
       <nav className="mb-12 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="bg-white text-black p-1 rounded">
                <Zap size={18} fill="currentColor" />
            </div>
            PromoHub
         </Link>
       </nav>
       <div className="flex-1">
        {children}
       </div>
    </div>
  );
};