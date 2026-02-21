import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useCallback } from "react";

export function WalletBar() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnectClick = useCallback(() => {
    // Always open the official wallet modal.
    // If Mobile Wallet Adapter is correctly configured in AppProviders,
    // Seed Vault / MWA will appear automatically on Seeker.
    setVisible(true);
  }, [setVisible]);

  if (connected) {
    return (
      <div className="wallet-adapter-button-trigger">
        <WalletMultiButton />
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnectClick}
      className="font-retro pixel-button bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
