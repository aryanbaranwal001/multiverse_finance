'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Brain, X } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { markets, Market, formatVolume } from '@/data/markets';
import Navbar from '@/components/Navbar';
import CategoryNav from '@/components/CategoryNav';

const MarketDetailPage = () => {
  const params = useParams();
  const { color } = useThemeStore();
  const [market, setMarket] = useState<Market | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [marketSentiment, setMarketSentiment] = useState<string>('');
  const [loadingSentiment, setLoadingSentiment] = useState(false);
  const [showYesBuy, setShowYesBuy] = useState(false);
  const [showNoBuy, setShowNoBuy] = useState(false);
  const [yesAmount, setYesAmount] = useState('');
  const [noAmount, setNoAmount] = useState('');
  
  const theme = getThemeClasses(color);

  // Generate static chart data based on market percentage
  const generateChartData = (yesPercentage: number) => {
    const data = [];
    const baseValue = yesPercentage;
    
    for (let i = 0; i < 30; i++) {
      const variation = Math.sin(i * 0.3) * 8 + (Math.random() - 0.5) * 6;
      const value = Math.max(5, Math.min(95, baseValue + variation));
      data.push({
        day: i + 1,
        probability: Math.round(value * 100) / 100,
        date: `Day ${i + 1}`
      });
    }
    return data;
  };

  useEffect(() => {
    if (params.slug) {
      // Find market by matching slug with title
      const foundMarket = markets.find(m => {
        const slug = m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return slug === params.slug;
      });
      
      if (foundMarket) {
        setMarket(foundMarket);
        setIsBookmarked(foundMarket.isBookmarked || false);
      }
    }
  }, [params.slug]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const fetchMarketSentiment = async () => {
    if (!market) return;
    
    setLoadingSentiment(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sentiments = [
        `Current market sentiment for "${market.title}" shows ${market.yesPercentage}% probability. Recent global surveys indicate mixed opinions with emerging markets showing more optimism than developed nations.`,
        `Analysis suggests strong correlation with recent geopolitical developments. Market participants are closely watching policy announcements and economic indicators.`,
        `Technical analysis indicates potential volatility ahead. Trading volume of ${formatVolume(market.volume)} suggests high market interest and liquidity.`
      ];
      
      setMarketSentiment(sentiments[Math.floor(Math.random() * sentiments.length)]);
    } catch {
      setMarketSentiment('Unable to fetch market sentiment at this time. Please try again later.');
    } finally {
      setLoadingSentiment(false);
    }
  };

  const handleYesClick = () => {
    setShowYesBuy(!showYesBuy);
    setShowNoBuy(false);
  };

  const handleNoClick = () => {
    setShowNoBuy(!showNoBuy);
    setShowYesBuy(false);
  };

  const handleBuy = (type: 'yes' | 'no') => {
    const amount = type === 'yes' ? yesAmount : noAmount;
    if (!amount || !market) return;
    
    alert(`Placed ${type.toUpperCase()} order for $${amount} on "${market.title}"`);
    
    // Reset state
    if (type === 'yes') {
      setYesAmount('');
      setShowYesBuy(false);
    } else {
      setNoAmount('');
      setShowNoBuy(false);
    }
  };

  if (!market) {
    return (
      <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Market Not Found</h1>
          <Link href="/" className={`${theme.primary} hover:underline`}>
            Return to Markets
          </Link>
        </div>
      </div>
    );
  }

  const chartData = generateChartData(market.yesPercentage || 50);

  return (
    <div className={`min-h-screen ${theme.background}`}>
      <Navbar />
      <CategoryNav />
      
      <div className={`${theme.text} pt-32`}>
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/" className={`p-2 rounded-lg ${theme.hoverBg} transition-colors`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Market Details</h1>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">{market.title}</h2>
              <p className={`${theme.textSecondary} text-lg leading-relaxed mb-4`}>
                {market.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {market.categories.map((category) => (
                  <span
                    key={category}
                    className={`px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleBookmark}
              className={`p-3 rounded-full transition-colors ${
                isBookmarked
                  ? `bg-gray-200 text-gray-800`
                  : `${theme.textSecondary} hover:${theme.primary}`
              }`}
            >
              <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price Chart */}
              <div className={`p-6 border-t border-gray-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Yes Probability: {market.yesPercentage || 50}%
                  </h3>
                  <div className="text-sm text-green-500 font-medium">
                    +2.3% (24h)
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="day" 
                        stroke="#666"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#666"
                        fontSize={12}
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Probability']}
                        labelFormatter={(label) => `Day ${label}`}
                        contentStyle={{
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="probability" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#22c55e' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Market Sentiment */}
              <div className={`p-6 border-t border-gray-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Market Sentiment
                  </h3>
                  <button
                    onClick={fetchMarketSentiment}
                    disabled={loadingSentiment}
                    className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors disabled:opacity-50`}
                  >
                    {loadingSentiment ? 'Analyzing...' : 'Get Sentiment'}
                  </button>
                </div>
                {marketSentiment && (
                  <div className={`${theme.textSecondary} leading-relaxed`}>
                    {marketSentiment}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Trading Panel */}
            <div className="space-y-6">
              {/* Trading Buttons */}
              <div className={`p-6 border-t border-gray-300`}>
                <h3 className="text-xl font-semibold mb-6">Trade</h3>
                
                {/* Yes Button */}
                <div className="mb-4">
                  <button
                    onClick={handleYesClick}
                    className="w-full py-4 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-between"
                  >
                    <span>Yes ${((market.yesPercentage || 50) / 100).toFixed(2)}</span>
                    <span>{market.yesPercentage || 50}%</span>
                  </button>
                  
                  {showYesBuy && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-green-800">Buy Yes</span>
                        <button
                          onClick={() => setShowYesBuy(false)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={yesAmount}
                          onChange={(e) => setYesAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-green-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={() => handleBuy('yes')}
                          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Buy Yes
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* No Button */}
                <div>
                  <button
                    onClick={handleNoClick}
                    className="w-full py-4 px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-between"
                  >
                    <span>No ${(1 - (market.yesPercentage || 50) / 100).toFixed(2)}</span>
                    <span>{100 - (market.yesPercentage || 50)}%</span>
                  </button>
                  
                  {showNoBuy && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-red-800">Buy No</span>
                        <button
                          onClick={() => setShowNoBuy(false)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={noAmount}
                          onChange={(e) => setNoAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-red-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                          onClick={() => handleBuy('no')}
                          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          Buy No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Market Info */}
              <div className={`p-6 border-t border-gray-300`}>
                <h3 className="text-xl font-semibold mb-4">Market Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Market ID</span>
                    <span>{market.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Volume</span>
                    <span>{formatVolume(market.volume)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Fee</span>
                    <span>2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>Resolution</span>
                    <span>{market.resolutionDate || 'Dec 31, 2025'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;
