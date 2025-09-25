import { useWallet, type InputTransactionData } from "@aptos-labs/wallet-adapter-react";
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

    try {
      console.log("APT amount (octas):", aptAmount);
      console.log("USD amount:", usdAmount);
      
      // Use the wallet's signAndSubmitTransaction with correct payload format
      const transaction: InputTransactionData = {
        data: {
          function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTIONS.BUY_YES_TOKENS}`,
          functionArguments: [
            CONTRACT_CONFIG.MODULE_ADDRESS, // market_address
            aptAmount.toString() // apt_amount in octas (as string)
          ],
        },
      };
      
      const response = await signAndSubmitTransaction(transaction);
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

    try {
      console.log("APT amount (octas):", aptAmount);
      console.log("USD amount:", usdAmount);
      
      // Use the wallet's signAndSubmitTransaction with correct payload format
      const transaction: InputTransactionData = {
        data: {
          function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTIONS.BUY_NO_TOKENS}`,
          functionArguments: [
            CONTRACT_CONFIG.MODULE_ADDRESS, // market_address
            aptAmount.toString() // apt_amount in octas (as string)
          ],
        },
      };
      
      const response = await signAndSubmitTransaction(transaction);
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
      console.error("Error fetching APT balance:", error);
      return 0;
    }
  };

  const getYesTokenBalance = async () => {
    if (!account) {
      return 0;
    }

    try {
      // Get account resources and look for fungible stores
      const resources = await aptos.getAccountResources({
        accountAddress: account.address
      });
      
      console.log("All account resources:", resources);
      
      // Look for primary fungible stores
      const fungibleStores = resources.filter(resource => 
        resource.type.includes("0x1::primary_fungible_store::PrimaryStore")
      );
      
      console.log("Fungible stores found:", fungibleStores);
      
      // For now, return 0 but log what we find
      return 0;
      
    } catch (error) {
      console.error("Error fetching YES token balance:", error);
      return 0;
    }
  };

  const getNoTokenBalance = async () => {
    if (!account) {
      return 0;
    }

    try {
      // Get account resources and look for fungible stores
      const resources = await aptos.getAccountResources({
        accountAddress: account.address
      });
      
      console.log("NO token - All account resources:", resources);
      
      // Look for primary fungible stores
      const fungibleStores = resources.filter(resource => 
        resource.type.includes("0x1::primary_fungible_store::PrimaryStore")
      );
      
      console.log("NO token - Fungible stores found:", fungibleStores);
      
      // For now, return 0 but log what we find
      return 0;
      
    } catch (error) {
      console.error("Error fetching NO token balance:", error);
      return 0;
    }
  };

  return { 
    buyYesTokens, 
    buyNoTokens, 
    getAPTBalance: getAccountAPTBalance, 
    getYesTokenBalance, 
    getNoTokenBalance,
    getMarketInfo,
    isConnected: !!account,
    account
  };
};
