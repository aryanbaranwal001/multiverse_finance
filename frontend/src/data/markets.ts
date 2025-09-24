export interface Market {
  id: string;
  title: string;
  description: string;
  volume: number;
  categories: string[];
  iconName: string;
  isBookmarked?: boolean;
  yesPercentage?: number;
  resolutionDate?: string;
}

export const markets: Market[] = [
  // Trending Markets
  {
    id: "1",
    title: "Will AI cause more job losses than job creation in 2025?",
    description: "Artificial intelligence adoption accelerates across industries, with automation affecting traditional roles while creating new opportunities in AI development, data science, and human-AI collaboration fields.",
    volume: 4200000,
    categories: ["trending", "tech", "economy"],
    iconName: "ai-jobs.svg",
    yesPercentage: 62,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "2",
    title: "Will Trump and Putin hold a summit in Alaska in 2025?",
    description: "Diplomatic relations between the United States and Russia remain strained amid ongoing geopolitical tensions, with Alaska's strategic location making it a potential neutral venue for high-level diplomatic engagement.",
    volume: 3800000,
    categories: ["trending", "politics", "geopolitics"],
    iconName: "trump-putin.svg",
    yesPercentage: 35,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "3",
    title: "Will virtual world engagement increase significantly in 2025?",
    description: "Virtual reality and metaverse technologies continue evolving with improved hardware, social platforms, and enterprise applications driving adoption across gaming, education, and remote collaboration sectors.",
    volume: 2900000,
    categories: ["trending", "tech"],
    iconName: "virtual-world.svg",
    yesPercentage: 71,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "4",
    title: "Will Germany's economy recover from 2-year contraction in 2025?",
    description: "Germany faces economic headwinds from energy costs, industrial competitiveness challenges, and demographic shifts, while navigating political transitions and European Union policy coordination efforts.",
    volume: 5100000,
    categories: ["trending", "economy", "world"],
    iconName: "germany-economy.svg",
    yesPercentage: 58,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "5",
    title: "Will China maintain 77% confidence in AI job creation through 2025?",
    description: "China's technology sector drives significant investment in artificial intelligence research and development, with government policies supporting AI integration across manufacturing, healthcare, and financial services industries.",
    volume: 3300000,
    categories: ["trending", "tech", "world"],
    iconName: "china-ai.svg",
    yesPercentage: 68,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "6",
    title: "Will personal data leaks increase in 2025?",
    description: "Cybersecurity threats evolve with increasing digitalization, cloud adoption, and sophisticated attack vectors targeting personal information across social media, financial services, and healthcare platforms.",
    volume: 2700000,
    categories: ["trending", "tech"],
    iconName: "data-breach.svg",
    yesPercentage: 74,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "7",
    title: "Will stricter tech company regulations be implemented in 2025?",
    description: "47% anticipate stricter regulations for large tech companies, up from 38% in 2021. Market predicts major regulatory changes.",
    volume: 4600000,
    categories: ["trending", "tech", "politics"],
    iconName: "tech-regulation.svg",
    yesPercentage: 65,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "8",
    title: "Will smartphone bans in schools become widespread in 2025?",
    description: "44% globally predict smartphone bans in schools, led by Netherlands at 74%. Market predicts educational policy changes worldwide.",
    volume: 1800000,
    categories: ["trending", "tech", "world"],
    iconName: "phone-ban.svg",
    yesPercentage: 52,
    resolutionDate: "Dec 31, 2025"
  },

  // New Markets
  {
    id: "9",
    title: "Will global economic optimism reach 55% by mid-2025?",
    description: "Currently at 51%, up from 46% low in 2022. Market predicts if economic confidence will continue recovering toward pre-pandemic levels.",
    volume: 3900000,
    categories: ["new", "economy"],
    iconName: "economic-optimism.svg",
    yesPercentage: 48,
    resolutionDate: "Jun 30, 2025"
  },
  {
    id: "10",
    title: "Will Indonesia maintain highest global optimism in 2025?",
    description: "Indonesia leads with 90% optimism for 2025 vs Japan's 38%. Market predicts if emerging markets will continue outpacing developed nations.",
    volume: 2200000,
    categories: ["new", "world", "economy"],
    iconName: "indonesia-optimism.svg",
    yesPercentage: 76,
    resolutionDate: "Dec 31, 2025"
  },

  // Politics Markets
  {
    id: "11",
    title: "Will Ukraine survive as independent nation through 2025?",
    description: "Critical geopolitical market assessing Ukraine's sovereignty amid ongoing conflict and international support dynamics.",
    volume: 8500000,
    categories: ["politics", "geopolitics", "world"],
    iconName: "ukraine-survival.svg",
    yesPercentage: 78,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "12",
    title: "Will tariff concerns affect Japan's political stability in 2025?",
    description: "Market predicts impact of trade policies on Japanese politics and security relationships, considering economic pressures.",
    volume: 2800000,
    categories: ["politics", "economy", "world"],
    iconName: "japan-tariffs.svg",
    yesPercentage: 42,
    resolutionDate: "Dec 31, 2025"
  },

  // Sports Markets
  {
    id: "13",
    title: "Will 2026 FIFA World Cup preparations stay on schedule?",
    description: "Market predicts if infrastructure and organizational preparations for the expanded 48-team tournament will meet deadlines.",
    volume: 3400000,
    categories: ["sports", "world"],
    iconName: "world-cup-2026.svg",
    yesPercentage: 72,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "14",
    title: "Will space exploration achievements exceed 2024 records?",
    description: "2024 saw lunar landings, Mars samples, and SpaceX innovations. Market predicts if 2025 will surpass these milestones.",
    volume: 2600000,
    categories: ["sports", "tech", "world"],
    iconName: "space-race.svg",
    yesPercentage: 67,
    resolutionDate: "Dec 31, 2025"
  },

  // Crypto Markets
  {
    id: "15",
    title: "Will cryptocurrency adoption drive economic recovery in emerging markets?",
    description: "Market predicts crypto's role in economic growth for developing nations, considering regulatory changes and adoption rates.",
    volume: 4800000,
    categories: ["crypto", "economy", "world"],
    iconName: "crypto-emerging.svg",
    yesPercentage: 59,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "16",
    title: "Will Bitcoin institutional adoption accelerate in 2025?",
    description: "Prediction on corporate and government Bitcoin adoption following recent regulatory clarity and market maturation.",
    volume: 6200000,
    categories: ["crypto", "economy"],
    iconName: "bitcoin-institutional.svg",
    yesPercentage: 73,
    resolutionDate: "Dec 31, 2025"
  },

  // Earnings Markets
  {
    id: "17",
    title: "Will AI companies outperform traditional tech stocks in 2025?",
    description: "Market comparing AI-focused companies' performance against established tech giants amid AI revolution and market dynamics.",
    volume: 5700000,
    categories: ["earnings", "tech"],
    iconName: "ai-stocks.svg",
    yesPercentage: 68,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "18",
    title: "Will quantum computing breakthroughs drive market valuations in 2025?",
    description: "Prediction on quantum computing commercialization impact on tech sector valuations and investment flows.",
    volume: 3100000,
    categories: ["earnings", "tech"],
    iconName: "quantum-computing.svg",
    yesPercentage: 45,
    resolutionDate: "Dec 31, 2025"
  },

  // Geopolitics Markets
  {
    id: "19",
    title: "Will China-Taiwan tensions escalate beyond current levels in 2025?",
    description: "Critical geopolitical market assessing probability of increased military or diplomatic tensions in Taiwan Strait region.",
    volume: 7300000,
    categories: ["geopolitics", "world"],
    iconName: "china-taiwan-tension.svg",
    yesPercentage: 38,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "20",
    title: "Will Russia face significant internal political changes in 2025?",
    description: "Market predicts potential domestic political shifts in Russia considering economic pressures and international isolation.",
    volume: 6800000,
    categories: ["geopolitics", "politics", "world"],
    iconName: "russia-politics.svg",
    yesPercentage: 31,
    resolutionDate: "Dec 31, 2025"
  },

  // Tech Markets
  {
    id: "21",
    title: "Will AGI (Artificial General Intelligence) be achieved by 2025?",
    description: "Market predicts breakthrough in artificial general intelligence development by major AI research organizations.",
    volume: 8900000,
    categories: ["tech"],
    iconName: "agi.svg",
    yesPercentage: 23,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "22",
    title: "Will social media usage reduction trend continue in 2025?",
    description: "37% globally intend to reduce social media usage. Market predicts if this digital wellness trend will accelerate.",
    volume: 2400000,
    categories: ["tech"],
    iconName: "social-media-reduction.svg",
    yesPercentage: 56,
    resolutionDate: "Dec 31, 2025"
  },

  // World Markets
  {
    id: "23",
    title: "Will climate change breakthrough technology emerge in 2025?",
    description: "Only 32% believe breakthrough will halt climate change. Market predicts major technological advancement in climate solutions.",
    volume: 5500000,
    categories: ["world", "tech"],
    iconName: "climate-breakthrough.svg",
    yesPercentage: 34,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "24",
    title: "Will global mental health improvements reach 70% by 2025?",
    description: "69% expect mental health improvements in 2025. Market predicts if post-pandemic recovery will meet optimistic projections.",
    volume: 3600000,
    categories: ["world"],
    iconName: "mental-health.svg",
    yesPercentage: 71,
    resolutionDate: "Dec 31, 2025"
  },

  // Economy Markets
  {
    id: "25",
    title: "Will global inflation return to pre-2020 levels by end of 2025?",
    description: "Market predicts if central bank policies will successfully bring inflation back to historical norms across major economies.",
    volume: 7800000,
    categories: ["economy", "world"],
    iconName: "inflation-control.svg",
    yesPercentage: 54,
    resolutionDate: "Dec 31, 2025"
  },
  {
    id: "26",
    title: "Will emerging markets outperform developed economies in 2025?",
    description: "Emerging markets show higher optimism (Indonesia 82%, China 79%). Market predicts relative economic performance.",
    volume: 4900000,
    categories: ["economy", "world"],
    iconName: "emerging-markets.svg",
    yesPercentage: 66,
    resolutionDate: "Dec 31, 2025"
  }
];

export const categories = [
  "trending",
  "new", 
  "politics",
  "sports",
  "crypto",
  "earnings",
  "geopolitics",
  "tech",
  "world",
  "economy",
  "elections"
];

export function getMarketsByCategory(category: string): Market[] {
  return markets.filter(market => market.categories.includes(category.toLowerCase()));
}

export function searchMarkets(query: string): Market[] {
  const lowercaseQuery = query.toLowerCase();
  return markets.filter(market => 
    market.title.toLowerCase().includes(lowercaseQuery) ||
    market.description.toLowerCase().includes(lowercaseQuery) ||
    market.categories.some(cat => cat.toLowerCase().includes(lowercaseQuery))
  );
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  } else {
    return `$${volume}`;
  }
}
