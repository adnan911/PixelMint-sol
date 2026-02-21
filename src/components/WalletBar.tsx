import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Shield } from "lucide-react";
import { useState, useCallback } from "react";

/**
 * Detects if the current user agent is a mobile device (Android/iOS)
 */
function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function WalletBar() {
  const { connected, select, wallets, connect } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  /**
   * Handles the primary connect button click.
   * On mobile, it attempts to directly trigger the Mobile Wallet Adapter (MWA).
   * On desktop, it opens the selection modal.
   */
  const handleConnectClick = useCallback(async () => {
    if (isMobileUA()) {
      // Find the Mobile Wallet Adapter - more flexible name check
      const mwaWallet = wallets.find(
        (w) => w.adapter.name.includes("Mobile Wallet Adapter")
      );

      if (mwaWallet) {
        try {
          setConnecting(true);
          
          // Selection MUST happen first for the provider state to update
          select(mwaWallet.adapter.name);
          
          // Small delay to let selection propagate
          setTimeout(async () => {
            try {
              await connect();
            } catch (err) {
              console.error("MWA Connect error:", err);
              setVisible(true); // Fallback to modal
            } finally {
              setConnecting(false);
            }
          }, 50);
          
          return;
        } catch (error) {
          console.error("MWA selection error:", error);
          setVisible(true);
          setConnecting(false);
        }
      } else {
        setVisible(true);
      }
    } else {
      // Desktop - Use standard modal
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
