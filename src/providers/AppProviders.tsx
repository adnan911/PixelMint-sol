import React, { useMemo, useRef } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

import "@solana/wallet-adapter-react-ui/styles.css";

function getNetwork(): WalletAdapterNetwork {
  const n = (import.meta.env.VITE_SOLANA_NETWORK || "").trim().toLowerCase();
  if (n === "devnet") return WalletAdapterNetwork.Devnet;
  if (n === "testnet") return WalletAdapterNetwork.Testnet;
  // Default mainnet-beta behavior
  return WalletAdapterNetwork.Mainnet;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const network = getNetwork();

  // ✅ Stable endpoint (prevents wrong "mainnet" mapping)
  const endpoint = useMemo(() => {
    const custom = (import.meta.env.VITE_SOLANA_RPC_URL || "").trim();
    if (custom) return custom;

    if (network === WalletAdapterNetwork.Mainnet) return clusterApiUrl("mainnet-beta");
    if (network === WalletAdapterNetwork.Devnet) return clusterApiUrl("devnet");
    return clusterApiUrl("testnet");
  }, [network]);

  // ✅ Create ONE stable adapter instance (prevents instant-close)
  const mwaRef = useRef<SolanaMobileWalletAdapter | null>(null);

  const wallets = useMemo(() => {
    if (!mwaRef.current) {
      mwaRef.current = new SolanaMobileWalletAdapter({
        cluster: network,
        appIdentity: {
          name: "PixelMint",
          uri: "https://pixel-mint-sol.vercel.app/",
          // Keep icon simple + guaranteed reachable
          icon: "https://pixel-mint-sol.vercel.app/favicon.ico",
        },
        addressSelector: createDefaultAddressSelector(),
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      });
    }
    return [mwaRef.current];
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* ✅ autoConnect OFF for Seeker stability */}
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
