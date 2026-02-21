import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
} from "@solana-mobile/wallet-adapter-mobile";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

import "@solana/wallet-adapter-react-ui/styles.css";

function getNetwork(): WalletAdapterNetwork {
  const n = import.meta.env.VITE_SOLANA_NETWORK;
  if (n === "devnet") return WalletAdapterNetwork.Devnet;
  if (n === "testnet") return WalletAdapterNetwork.Testnet;
  return WalletAdapterNetwork.Mainnet;
}

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(() => {
    const custom = import.meta.env.VITE_SOLANA_RPC_URL?.trim();
    if (custom) return custom;

    // IMPORTANT: clusterApiUrl wants "mainnet-beta", not "mainnet"
    if (network === WalletAdapterNetwork.Mainnet) return clusterApiUrl("mainnet-beta");
    if (network === WalletAdapterNetwork.Devnet) return clusterApiUrl("devnet");
    return clusterApiUrl("testnet");
  }, [network]);

  const wallets = useMemo(() => {
    const appIdentity = {
      name: "PixelMint",
      uri: "https://pixel-mint-sol.vercel.app/",
      icon: "https://pixel-mint-sol.vercel.app/icons/icon-192.png",
    };

    const mobile = new SolanaMobileWalletAdapter({
      addressSelector: createDefaultAddressSelector(),
      appIdentity,
      authorizationResultCache: createDefaultAuthorizationResultCache(),
      cluster: network,
      onWalletNotFound: createDefaultWalletNotFoundHandler(),
    });

    // ✅ Mobile (Seeker-first): ONLY show Seed Vault / MWA
    if (isMobileUA()) return [mobile];

    // ✅ Desktop: show standard wallets
    return [
      mobile,
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ];
  }, [network]);

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
