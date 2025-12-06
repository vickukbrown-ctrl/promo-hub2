'use client';

type Props = {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
};

export default function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`px-3 py-1.5 text-xs rounded-full border ${
              isActive
                ? 'bg-white text-black border-white'
                : 'border-neutral-700 text-neutral-300'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
