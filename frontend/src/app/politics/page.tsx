'use client';

import { useState, useEffect } from 'react';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { markets } from '@/data/markets';
import MarketCard from '@/components/MarketCard';
import Navbar from '@/components/Navbar';
import CategoryNav from '@/components/CategoryNav';

export default function PoliticsPage() {
  const { color } = useThemeStore();
  const theme = getThemeClasses(color);
  const [filteredMarkets, setFilteredMarkets] = useState(markets);

  useEffect(() => {
    const politicsMarkets = markets.filter(market => 
      market.categories.includes('politics') || 
      market.category === 'Politics'
    );
    setFilteredMarkets(politicsMarkets);
  }, []);

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <Navbar />
      <CategoryNav />
      
      <main className="container mx-auto px-4 py-8 pt-16">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${theme.primary}`}>Politics Markets</h1>
          <p className={`text-lg ${theme.textSecondary}`}>
            Predict the outcomes of political events and elections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl ${theme.textSecondary}`}>No politics markets available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}
