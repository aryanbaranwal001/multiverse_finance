'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { Market, formatVolume } from '@/data/markets';

interface MarketCardProps {
  market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
  const { color } = useThemeStore();
  const [isBookmarked, setIsBookmarked] = useState(market.isBookmarked || false);
  const [showYesBuy, setShowYesBuy] = useState(false);
  const [showNoBuy, setShowNoBuy] = useState(false);
  const [yesAmount, setYesAmount] = useState('');
  const [noAmount, setNoAmount] = useState('');
  
  const theme = getThemeClasses(color);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.stopPropagation();
    console.log('Filter by category:', category);
  };

  const handleYesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowYesBuy(!showYesBuy);
    setShowNoBuy(false);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNoBuy(!showNoBuy);
    setShowYesBuy(false);
  };

  const handleBuy = (e: React.MouseEvent, type: 'yes' | 'no') => {
    e.stopPropagation();
    const amount = type === 'yes' ? yesAmount : noAmount;
    if (!amount) return;
    
    alert(`Placed ${type.toUpperCase()} order for $${amount} on "${market.title}"`);
    
    if (type === 'yes') {
      setYesAmount('');
      setShowYesBuy(false);
    } else {
      setNoAmount('');
      setShowNoBuy(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg border border-gray-300 ${theme.cardBg} hover:shadow-lg transition-all duration-200 group flex flex-col h-full`}>
      {/* Market Title */}
      <div className="mb-3">
        <Link href={`/${market.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
          <h3 className={`text-lg font-semibold ${theme.text} hover:${theme.primary} hover:underline transition-all cursor-pointer`}>
            {market.title}
          </h3>
        </Link>
      </div>

      {/* Market Description */}
      <p className={`${theme.textSecondary} mb-4 leading-relaxed line-clamp-2`}>
        {market.description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {market.categories.slice(0, 3).map((category) => (
          <span
            key={category}
            onClick={(e) => handleCategoryClick(e, category)}
            className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 transition-colors"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Yes/No Buttons */}
      <div className="mb-4">
        {!showYesBuy && !showNoBuy ? (
          /* Initial Side-by-Side Buttons */
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleYesClick}
              className="py-3 px-4 bg-emerald-100 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-200 transition-colors border border-emerald-200"
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="py-3 px-4 bg-orange-100 text-orange-800 rounded-lg font-semibold hover:bg-orange-200 transition-colors border border-orange-200"
            >
              No
            </button>
          </div>
        ) : (
          /* Expanded Buy Interface */
          <div className="space-y-4">
            {showYesBuy && (
              <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4">
                <div className="space-y-4">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-emerald-800">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="10"
                        value={yesAmount}
                        onChange={(e) => setYesAmount(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full pl-8 pr-4 py-3 bg-white border border-emerald-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      />
                    </div>
                  </div>
                  
                  {/* Potential Winnings */}
                  {yesAmount && (
                    <div className="text-sm text-emerald-700">
                      To win <span className="font-semibold">${(parseFloat(yesAmount) * (100 / (market.yesPercentage || 50)) - parseFloat(yesAmount)).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleBuy(e, 'yes')}
                      disabled={!yesAmount}
                      className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowYesBuy(false);
                        setYesAmount('');
                      }}
                      className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {showNoBuy && (
              <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
                <div className="space-y-4">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-orange-800">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="10"
                        value={noAmount}
                        onChange={(e) => setNoAmount(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full pl-8 pr-4 py-3 bg-white border border-orange-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                      />
                    </div>
                  </div>
                  
                  {/* Potential Winnings */}
                  {noAmount && (
                    <div className="text-sm text-orange-700">
                      To win <span className="font-semibold">${(parseFloat(noAmount) * (100 / (100 - (market.yesPercentage || 50))) - parseFloat(noAmount)).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleBuy(e, 'no')}
                      disabled={!noAmount}
                      className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy No
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNoBuy(false);
                        setNoAmount('');
                      }}
                      className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Section - Volume and Bookmark */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className={`text-xs ${theme.textSecondary} mb-1`}>Volume</span>
          <span className={`text-lg font-semibold ${theme.primary}`}>
            {formatVolume(market.volume)}
          </span>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked
              ? `bg-gray-200 text-gray-800`
              : `${theme.textSecondary} hover:${theme.primary}`
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default MarketCard;
