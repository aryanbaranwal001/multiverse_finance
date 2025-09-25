// Contract configuration for prediction market
export const CONTRACT_CONFIG = {
  // Contract details
  MODULE_ADDRESS: "0x8b421ba847e4a8bb1726290fe9928f19290225fb1424f8b18f70116b61138343",
  MODULE_NAME: "ai_jobs_market",
  NETWORK: "testnet",
  
  // Contract functions
  FUNCTIONS: {
    INITIALIZE_MARKET: "initialize_market",
    BUY_YES_TOKENS: "buy_yes_tokens", 
    BUY_NO_TOKENS: "buy_no_tokens",
    GET_MARKET_INFO: "get_market_info",
    CALCULATE_TOKENS_FOR_APT: "calculate_tokens_for_apt"
  },
  
  // Market configuration (matching contract hardcoded values)
  MARKET: {
    YES_PRICE_CENTS: 62, // APT/USD exchange rate (1 APT = $4.21)
    NO_PRICE_CENTS: 38,  // $0.38
    APT_TO_USD_CENTS: 421, // $4.21 per APT
    DECIMALS: 8
  },
  
  // Token information
  TOKENS: {
    YES: {
      NAME: "AI Jobs Loss YES Token",
      SYMBOL: "AIJL-YES"
    },
    NO: {
      NAME: "AI Jobs Loss NO Token", 
      SYMBOL: "AIJL-NO"
    }
  }
};

// Helper functions for price calculations
export const calculateAPTFromUSD = (usdAmount: number): number => {
  return usdAmount / (CONTRACT_CONFIG.MARKET.APT_TO_USD_CENTS / 100);
};

export const calculateUSDFromAPT = (aptAmount: number): number => {
  return aptAmount * (CONTRACT_CONFIG.MARKET.APT_TO_USD_CENTS / 100);
};

export const calculateTokensFromAPT = (aptAmount: number, isYesToken: boolean): number => {
  const usdValueCents = (aptAmount * CONTRACT_CONFIG.MARKET.APT_TO_USD_CENTS);
  const priceInCents = isYesToken ? CONTRACT_CONFIG.MARKET.YES_PRICE_CENTS : CONTRACT_CONFIG.MARKET.NO_PRICE_CENTS;
  return usdValueCents / priceInCents;
};

export const formatAPT = (amount: number): string => {
  return `${amount.toFixed(4)} APT`;
};

export const formatUSD = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};
