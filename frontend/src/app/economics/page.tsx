'use client';

import { useState, useEffect } from 'react';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { markets } from '@/data/markets';
import MarketCard from '@/components/MarketCard';
import Navbar from '@/components/Navbar';
import CategoryNav from '@/components/CategoryNav';

export default function EconomicsPage() {
  const { color } = useThemeStore();
  const theme = getThemeClasses(color);
  const [filteredMarkets, setFilteredMarkets] = useState(markets);

  useEffect(() => {
    const economicsMarkets = markets.filter(market => 
      market.categories.includes('economy') || 
      market.category === 'Economics'
    );
    setFilteredMarkets(economicsMarkets);
  }, []);

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <Navbar />
      <CategoryNav />
      
      <main className="pt-16">
        <div className="px-12 sm:px-24 lg:px-48 py-8">
          <div className="mb-8">
            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
              Economics Markets
            </h2>
            <p className={`${theme.textSecondary}`}>
              Predict economic trends and financial market movements
            </p>
          </div>

          {filteredMarkets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${theme.textSecondary}`}>
              <p className="text-lg mb-2">No markets found</p>
              <p>Check back later for new markets in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
