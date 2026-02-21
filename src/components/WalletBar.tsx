import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Shield } from "lucide-react";
import { useState, useCallback } from "react";

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Android|iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 0 && /Android/i.test(ua));
}

export function WalletBar() {
  const { connected, select, wallets, connect } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  /**
   * Handles the primary connect button click.
   * On mobile, it attempts to directly trigger the Mobile Wallet Adapter (MWA).
   */
  const handleConnectClick = useCallback(async () => {
    // 1. Check if we have an MWA-compatible adapter (Seed Vault)
    const mwaWallet = wallets.find((w) =>
      w.adapter.name.toLowerCase().includes("mobile wallet adapter")
    );

    // 2. On mobile devices, try to trigger MWA directly to preserve the user gesture
    if (mwaWallet && isMobileUA()) {
      try {
        setConnecting(true);
        
        // Select the adapter first
        select(mwaWallet.adapter.name);
        
        // Trigger the connection immediately. 
        // We avoid setTimeout here because it can break the intent-triggering gesture on Android.
        await connect();
      } catch (error) {
        console.error("MWA connection failed:", error);
        // Fallback to the standard modal if direct connect fails
        setVisible(true);
      } finally {
        setConnecting(false);
      }
    } else {
      // 3. On desktop or if MWA is not ready, show the standard selection modal
      setVisible(true);
    }
  }, [wallets, select, connect, setVisible]);

  if (connected) {
    return (
      <div className="wallet-adapter-button-trigger">
        <WalletMultiButton />
      </div>
    );
  }

  return (
    <>
      <Button 
        onClick={handleConnectClick}
        disabled={connecting}
        className="font-retro pixel-button bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {connecting ? "Connecting..." : "Connect Wallet"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md pixel-card border-4 border-border font-retro">
          <DialogHeader>
            <DialogTitle className="font-pixel text-primary text-xl text-center">
              Connect Wallet
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <p className="text-center text-foreground leading-relaxed">
              Use <span className="font-bold text-primary">Seed Vault</span> on Solana Seeker for the best experience.
            </p>

            <div className="button-group flex flex-col gap-4 w-full px-4">
               <WalletMultiButton />
            </div>

            <p className="text-xs text-muted-foreground text-center flex items-center gap-2">
              <Shield className="h-3 w-3" />
              We never access your private keys.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
