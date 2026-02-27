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
  const network = getNetwork();

  const endpoint = useMemo(() => {
    const custom = import.meta.env.VITE_SOLANA_RPC_URL?.trim();
    return custom || clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(() => {
    const appIdentity = {
      name: import.meta.env.VITE_APP_NAME || "Pixel Mint",
      uri: import.meta.env.VITE_APP_URL || window.location.origin,
      icon: import.meta.env.VITE_APP_ICON || "/icons/icon-192.png",
    };

    const mobile = new SolanaMobileWalletAdapter({
      addressSelector: createDefaultAddressSelector(),
      appIdentity,
      authorizationResultCache: createDefaultAuthorizationResultCache(),
      cluster: network,
      onWalletNotFound: createDefaultWalletNotFoundHandler(),
    });

    // ✅ Mobile (Seeker): show ONLY MWA/Seed Vault (smooth)
    if (isMobileUA()) return [mobile];

    // ✅ Desktop: show Phantom + Solflare
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
