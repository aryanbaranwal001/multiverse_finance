'use client';

import { useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

export const useWalletPersistence = () => {
  const { connected, wallet } = useWallet();

  useEffect(() => {
    // Save connection state
    if (connected && wallet) {
      localStorage.setItem('wallet-connected', 'true');
      localStorage.setItem('last-wallet', wallet.name);
    } else {
      localStorage.setItem('wallet-connected', 'false');
      localStorage.removeItem('last-wallet');
    }
  }, [connected, wallet]);

  return { connected };
};
