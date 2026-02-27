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

export function AppProviders({ children }: { children: React.ReactNode }) {
  const network = getNetwork();

  // ✅ Use custom RPC if provided, otherwise Solana public cluster URL
  const endpoint = useMemo(() => {
    const custom = import.meta.env.VITE_SOLANA_RPC_URL?.trim();
    return custom || clusterApiUrl(network);
  }, [network]);

  /**
   * ✅ CRITICAL FOR SEEKER:
   * Never conditionally change the wallets array based on user agent.
   * Keep the wallets list stable across renders so MWA authorization works.
   */
  const wallets = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    const appIdentity = {
      name: import.meta.env.VITE_APP_NAME || "PixelMint",
      uri: import.meta.env.VITE_APP_URL || origin || "https://pixel-mint-sol.vercel.app/",
      // ✅ Use absolute URL to avoid silent failures in TWA/Seeker
      icon:
        import.meta.env.VITE_APP_ICON ||
        `${origin}/icons/icon-192.png`,
    };

    return [
      // ✅ Solana Seeker / Seed Vault (MWA)
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        appIdentity,
        cluster: network,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),

      // ✅ Desktop wallets (Seeker will ignore these automatically)
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ];
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}