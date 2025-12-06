import React from 'react';

type Props = {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
};

export const CategoryTabs: React.FC<Props> = ({ categories, active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`
              px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200
              ${isActive
                ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
              }
            `}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};