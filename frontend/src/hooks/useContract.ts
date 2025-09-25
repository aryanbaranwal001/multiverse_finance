import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { CONTRACT_CONFIG } from "@/config/contract";

export const useContract = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  
  const aptosConfig = new AptosConfig({ 
    network: Network.TESTNET 
  });
  const aptos = new Aptos(aptosConfig);

  const buyYesTokens = async (usdAmount: number) => {
    if (!account) {
      throw new Error("Wallet not connected");
    }

    // Convert USD to APT (multiply by 100000000 for 8 decimals)
    const aptAmount = Math.floor((usdAmount / (CONTRACT_CONFIG.MARKET.APT_TO_USD_CENTS / 100)) * 100000000);

    const payload = {
      function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTIONS.BUY_YES_TOKENS}`,
      functionArguments: [
        CONTRACT_CONFIG.MODULE_ADDRESS, // market_address
        aptAmount // apt_amount in octas (as number, not string)
      ],
    };

    try {
      console.log("YES transaction payload:", payload);
      console.log("APT amount (octas):", aptAmount);
      console.log("USD amount:", usdAmount);
      
      // @ts-expect-error - Wallet adapter types issue
      const response = await signAndSubmitTransaction(payload);
      console.log("Transaction response:", response);
      
      await aptos.waitForTransaction({ transactionHash: response.hash });
      return response;
    } catch (error) {
      console.error("Error buying YES tokens:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

  const buyNoTokens = async (usdAmount: number) => {
    if (!account) {
      throw new Error("Wallet not connected");
    }

    // Convert USD to APT (multiply by 100000000 for 8 decimals)
    const aptAmount = Math.floor((usdAmount / (CONTRACT_CONFIG.MARKET.APT_TO_USD_CENTS / 100)) * 100000000);

    const payload = {
      function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTIONS.BUY_NO_TOKENS}`,
      functionArguments: [
        CONTRACT_CONFIG.MODULE_ADDRESS, // market_address
        aptAmount // apt_amount in octas (as number, not string)
      ],
    };

    try {
      console.log("NO transaction payload:", payload);
      console.log("APT amount (octas):", aptAmount);
      console.log("USD amount:", usdAmount);
      
      // @ts-expect-error - Wallet adapter types issue
      const response = await signAndSubmitTransaction(payload);
      console.log("Transaction response:", response);
      
      await aptos.waitForTransaction({ transactionHash: response.hash });
      return response;
    } catch (error) {
      console.error("Error buying NO tokens:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

  const getMarketInfo = async () => {
    try {
      const result = await aptos.view({
        payload: {
          function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTIONS.GET_MARKET_INFO}`,
          functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS],
        },
      });
      return result;
    } catch (error) {
      console.error("Error getting market info:", error);
      throw error;
    }
  };

  const getAccountAPTBalance = async () => {
    if (!account) return 0;
    
    try {
      const resources = await aptos.getAccountResources({
        accountAddress: account.address,
      });
      
      const accountResource = resources.find(
        (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      );
      
      if (accountResource) {
        const balance = (accountResource.data as { coin: { value: string } }).coin.value;
        return parseInt(balance) / 100000000; // Convert from octas to APT
      }
      
      return 0;
    } catch (error) {
      console.error("Error getting APT balance:", error);
      return 0;
    }
  };

  return {
    buyYesTokens,
    buyNoTokens,
    getMarketInfo,
    getAccountAPTBalance,
    isConnected: !!account,
    account
  };
};
