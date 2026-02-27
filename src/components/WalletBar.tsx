import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolanaMobileWalletAdapterWalletName } from "@solana-mobile/wallet-standard-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";

export function WalletBar() {
  const { connected, connect, wallet, wallets, select } = useWallet();
  const { setVisible: showWalletSelectionModal } = useWalletModal();
  const [open, setOpen] = useState(false);

  // MWA Connect Button pattern (from official guide)
  const handleConnectClick = async () => {
    // Close our custom dialog first
    setOpen(false);

    // Find MWA in wallets list
    const mwaWallet = wallets.find(
      (w) => w.adapter.name === SolanaMobileWalletAdapterWalletName
    );

    if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
      // If MWA is already selected, immediately connect.
      await connect();
    } else if (mwaWallet) {
      // If MWA is not selected, but available, select it.
      select(SolanaMobileWalletAdapterWalletName);
    } else {
      // Else (desktop), show modal as usual.
      showWalletSelectionModal(true);
    }
  };

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
        onClick={() => setOpen(true)}
        className="font-retro pixel-button bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
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
              Use{" "}
              <span className="font-bold text-primary">Seed Vault</span> on
              Solana Seeker for the best experience.
            </p>

            <Button
              onClick={handleConnectClick}
              className="w-full font-retro pixel-button bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Use Installed Wallet
            </Button>

            <p className="text-xs text-muted-foreground text-center flex items-center gap-2">
              <ShieldIcon className="h-3 w-3" />
              We never access your private keys.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}