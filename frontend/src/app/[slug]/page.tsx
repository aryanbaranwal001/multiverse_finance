'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Bookmark, X, Brain } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { markets, Market } from '@/data/markets';
import { useThemeStore } from '@/store/themeStore';
import { getThemeClasses } from '@/store/themeStore';
import { useContract } from '@/hooks/useContract';
import { calculateAPTFromUSD, formatAPT } from '@/config/contract';
import { formatVolume } from '@/data/markets';
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
  const [aptBalance, setAptBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { buyYesTokens, buyNoTokens, getAccountAPTBalance, isConnected } = useContract();
  
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
    const slug = params.slug as string;
    if (slug) {
      const foundMarket = markets.find(m => m.id === slug);
      if (foundMarket) {
        setMarket(foundMarket);
        setIsBookmarked(foundMarket.isBookmarked || false);
      }
    }
  }, [params.slug]);

  // Load APT balance when wallet connects
  useEffect(() => {
    if (isConnected) {
      getAccountAPTBalance().then(setAptBalance);
    }
  }, [isConnected, getAccountAPTBalance]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const fetchMarketSentiment = async () => {
    if (!market) return;
    
    setLoadingSentiment(true);
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-bbe0f6dcc0f9487494f96b1c18899a06',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a professional market analyst specializing in prediction markets. Provide detailed, insightful analysis that is exactly 100-120 words long.'
            },
            {
              role: 'user',
              content: `Analyze the prediction market: "${market.title}". Current probability: ${market.yesPercentage}%. Provide a comprehensive analysis covering: 1) Key factors influencing this outcome, 2) Market sentiment drivers, 3) Risk assessment, 4) Trading considerations. Be specific and professional, exactly 100-120 words.`
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        setMarketSentiment(data.choices[0].message.content.trim());
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching market sentiment:', error);
      // Fallback to mock data if API fails
      const fallbackSentiments = [
        `Market analysis for "${market.title}" reveals complex dynamics at ${market.yesPercentage}% probability. Key factors include regulatory developments, technological adoption rates, and geopolitical stability. Current sentiment reflects cautious optimism among institutional traders, while retail investors show mixed positioning. Risk factors include policy uncertainty and external market volatility. Technical indicators suggest potential for significant price movement in either direction. Trading volume of ${formatVolume(market.volume)} indicates strong market interest and adequate liquidity for position adjustments. Recommended approach involves careful position sizing and continuous monitoring of fundamental catalysts that could shift market dynamics substantially.`,
        `Current market positioning at ${market.yesPercentage}% reflects sophisticated trader analysis of underlying fundamentals. Primary drivers include economic indicators, policy announcements, and sector-specific developments. Market sentiment shows institutional confidence with measured retail participation. Key risks encompass regulatory changes, competitive dynamics, and broader market conditions. The probability distribution suggests efficient price discovery with room for volatility. High trading volume of ${formatVolume(market.volume)} demonstrates robust market engagement and sufficient depth for strategic entries and exits. Traders should focus on catalyst timing, position management, and risk-adjusted returns while maintaining awareness of correlation effects with related markets and external economic factors.`
      ];
      setMarketSentiment(fallbackSentiments[Math.floor(Math.random() * fallbackSentiments.length)]);
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

  const handleBuy = async (type: 'yes' | 'no') => {
    const amount = type === 'yes' ? yesAmount : noAmount;
    if (!amount || !market || !isConnected) return;
    
    setIsLoading(true);
    try {
      const usdAmount = parseFloat(amount);
      if (type === 'yes') {
        await buyYesTokens(usdAmount);
        alert(`Successfully bought YES tokens for $${amount}!`);
      } else {
        await buyNoTokens(usdAmount);
        alert(`Successfully bought NO tokens for $${amount}!`);
      }
      
      // Refresh balance
      const newBalance = await getAccountAPTBalance();
      setAptBalance(newBalance);
      
      // Reset state
      if (type === 'yes') {
        setYesAmount('');
        setShowYesBuy(false);
      } else {
        setNoAmount('');
        setShowNoBuy(false);
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
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
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#ffffff',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }}
                        labelStyle={{
                          color: '#d1d5db',
                          fontWeight: '500'
                        }}
                        itemStyle={{
                          color: '#22c55e',
                          fontWeight: '600'
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
                  <h3 className="text-xl font-semibold">Market Context</h3>
                  <button
                    onClick={fetchMarketSentiment}
                    disabled={loadingSentiment}
                    className={`px-4 py-2 ${theme.primaryBg} text-white rounded-lg ${theme.primaryHover} transition-colors disabled:opacity-50 flex items-center gap-2`}
                  >
                    {loadingSentiment ? (
                      <>
                        <div className="relative">
                          <div className={`w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin`}></div>
                        </div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        <span>Get Market Context</span>
                      </>
                    )}
                  </button>
                </div>
                {marketSentiment && !loadingSentiment && (
                  <div className={`${theme.text} leading-relaxed p-4 rounded-lg ${theme.cardBg} border ${theme.border}`}>
                    {marketSentiment}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Trading Panel */}
            <div className="space-y-6">
              {/* Trading Panel */}
              <div className={`p-6 ${theme.cardBg} rounded-xl  ${theme.border} shadow-sm`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${theme.text}`}>Trade</h3>
                  {isConnected && (
                    <div className={`text-sm ${theme.text} opacity-75`}>
                      Balance: {formatAPT(aptBalance)} APT
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Market Odds Display */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-lg  ${theme.border} bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${((market.yesPercentage || 50) / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                          Yes | {market.yesPercentage || 50}%
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg  ${theme.border} bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          ${(1 - (market.yesPercentage || 50) / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300 font-medium">
                          No | {100 - (market.yesPercentage || 50)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trade Buttons */}
                  {!showYesBuy && !showNoBuy ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleYesClick}
                        className="group py-4 px-6 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300 rounded-lg font-semibold transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>Buy Yes</span>
                          <span className="text-xs opacity-70">{market.yesPercentage || 50}%</span>
                        </div>
                      </button>
                      
                      <button
                        onClick={handleNoClick}
                        className="group py-4 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-lg font-semibold transition-all duration-200"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>Buy No</span>
                          <span className="text-xs opacity-70">{100 - (market.yesPercentage || 50)}%</span>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {showYesBuy && (
                        <div className="bg-green-500/5 rounded-xl p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-green-400">Buy Yes Shares</h4>
                            <button
                              onClick={() => setShowYesBuy(false)}
                              className="p-2 hover:bg-green-500/10 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-green-400" />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-green-300 mb-2">
                                Investment Amount (USD)
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 font-semibold">$</span>
                                <input
                                  type="number"
                                  placeholder="100"
                                  value={yesAmount}
                                  onChange={(e) => setYesAmount(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  onFocus={(e) => e.stopPropagation()}
                                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-lg outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 font-medium"
                                />
                              </div>
                              {yesAmount && (
                                <div className="mt-2 text-sm text-green-300">
                                  ≈ {formatAPT(calculateAPTFromUSD(parseFloat(yesAmount)))} APT
                                </div>
                              )}
                            </div>
                            
                            
                            <div className="flex gap-3 pt-2">
                              <button
                                onClick={() => handleBuy('yes')}
                                disabled={!yesAmount || !isConnected || isLoading}
                                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                {isLoading ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                  </>
                                ) : !isConnected ? (
                                  'Connect Wallet'
                                ) : (
                                  'Confirm Purchase'
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  setShowYesBuy(false);
                                  setYesAmount('');
                                }}
                                className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {showNoBuy && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-red-400">Buy No Shares</h4>
                            <button
                              onClick={() => setShowNoBuy(false)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-red-300 mb-2">
                                Investment Amount (USD)
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 font-semibold">$</span>
                                <input
                                  type="number"
                                  placeholder="100"
                                  value={noAmount}
                                  onChange={(e) => setNoAmount(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  onFocus={(e) => e.stopPropagation()}
                                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-red-500/30 rounded-lg outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-white placeholder-gray-400 font-medium"
                                />
                              </div>
                              {noAmount && (
                                <div className="mt-2 text-sm text-red-300">
                                  ≈ {formatAPT(calculateAPTFromUSD(parseFloat(noAmount)))} APT
                                </div>
                              )}
                            </div>
                            
                            
                            <div className="flex gap-3 pt-2">
                              <button
                                onClick={() => handleBuy('no')}
                                disabled={!noAmount || !isConnected || isLoading}
                                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                {isLoading ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                  </>
                                ) : !isConnected ? (
                                  'Connect Wallet'
                                ) : (
                                  'Confirm Purchase'
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  setShowNoBuy(false);
                                  setNoAmount('');
                                }}
                                className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
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
