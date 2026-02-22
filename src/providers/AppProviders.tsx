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
  return WalletAdapterNetwork.Mainnet; // mainnet-beta
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const network = getNetwork();

  const endpoint = useMemo(() => {
    const custom = (import.meta.env.VITE_SOLANA_RPC_URL || "").trim();
    if (custom) return custom;

    if (network === WalletAdapterNetwork.Mainnet) return clusterApiUrl("mainnet-beta");
    if (network === WalletAdapterNetwork.Devnet) return clusterApiUrl("devnet");
    return clusterApiUrl("testnet");
  }, [network]);

  const mwaRef = useRef<SolanaMobileWalletAdapter | null>(null);

  const wallets = useMemo(() => {
    if (!mwaRef.current) {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "https://pixel-mint-sol.vercel.app";

      mwaRef.current = new SolanaMobileWalletAdapter({
        cluster: network,
        appIdentity: {
          name: "PixelMint",
          uri: origin,                 // ✅ MUST match current domain exactly
          icon: `${origin}/favicon.ico`, // ✅ always reachable if favicon exists
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
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
