import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useCallback } from "react";

export function WalletBar() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const open = useCallback(() => setVisible(true), [setVisible]);

  if (connected) {
    return (
      <div className="wallet-adapter-button-trigger">
        <WalletMultiButton />
      </div>
    );
  }

  return (
    <Button
      onClick={open}
      className="font-retro pixel-button bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
