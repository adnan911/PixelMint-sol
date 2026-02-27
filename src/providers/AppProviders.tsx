import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

import "@solana/wallet-adapter-react-ui/styles.css";

function getNetwork(): WalletAdapterNetwork {
  const n = import.meta.env.VITE_SOLANA_NETWORK;
  if (n === "devnet") return WalletAdapterNetwork.Devnet;
  if (n === "testnet") return WalletAdapterNetwork.Testnet;
  return WalletAdapterNetwork.Mainnet;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const network = getNetwork();

  const endpoint = useMemo(() => {
    const custom = import.meta.env.VITE_SOLANA_RPC_URL?.trim();
    return custom || clusterApiUrl(network);
  }, [network]);

  // MWA is registered via registerMwa() in main.tsx (Wallet Standard).
  // Only desktop wallets need to be listed here.
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
