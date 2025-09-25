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
        <Link href={`/${market.id}`}>
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
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleYesClick}
              className="py-2.5 px-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition-colors text-sm"
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="py-2.5 px-3 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors text-sm"
            >
              No
            </button>
          </div>
        ) : (
          /* Expanded Buy Interface */
          <div className="space-y-3">
            {showYesBuy && (
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                <div className="space-y-3">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-green-400">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="10"
                        value={yesAmount}
                        onChange={(e) => setYesAmount(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  {/* Potential Winnings */}
                  {yesAmount && (
                    <div className="text-sm text-green-300">
                      To win <span className="font-semibold text-green-400">${(parseFloat(yesAmount) * (100 / (market.yesPercentage || 50)) - parseFloat(yesAmount)).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleBuy(e, 'yes')}
                      disabled={!yesAmount}
                      className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Buy Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowYesBuy(false);
                        setYesAmount('');
                      }}
                      className="px-3 py-2.5 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {showNoBuy && (
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                <div className="space-y-3">
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-red-400">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="10"
                        value={noAmount}
                        onChange={(e) => setNoAmount(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  {/* Potential Winnings */}
                  {noAmount && (
                    <div className="text-sm text-red-300">
                      To win <span className="font-semibold text-red-400">${(parseFloat(noAmount) * (100 / (100 - (market.yesPercentage || 50))) - parseFloat(noAmount)).toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleBuy(e, 'no')}
                      disabled={!noAmount}
                      className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Buy No
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNoBuy(false);
                        setNoAmount('');
                      }}
                      className="px-3 py-2.5 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm"
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
