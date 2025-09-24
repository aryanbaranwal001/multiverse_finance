'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { categories } from '@/data/markets';

const CategoryNav = () => {
  const { color } = useThemeStore();
  const pathname = usePathname();
  
  const theme = getThemeClasses(color);

  const categoryLabels: Record<string, string> = {
    trending: 'Trending',
    new: 'New',
    politics: 'Politics',
    sports: 'Sports',
    crypto: 'Crypto',
    earnings: 'Earnings',
    geopolitics: 'Geopolitics',
    tech: 'Tech',
    world: 'World',
    economy: 'Economy',
    elections: 'Elections',
  };

  const getCategoryPath = (category: string) => {
    return category === 'trending' ? '/' : `/${category}`;
  };

  const isActiveCategory = (category: string) => {
    const categoryPath = getCategoryPath(category);
    return pathname === categoryPath;
  };

  return (
    <div className={`sticky top-16 z-40 ${theme.background} border-b ${theme.border}`}>
      <div className="px-12 sm:px-24 lg:px-48">
        <div className="flex items-center justify-center space-x-8 overflow-x-auto py-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={getCategoryPath(category)}
              className={`whitespace-nowrap transition-colors cursor-pointer ${
                isActiveCategory(category)
                  ? `${theme.primary}`
                  : `${theme.textSecondary} hover:${theme.primary}`
              }`}
            >
              {categoryLabels[category]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
