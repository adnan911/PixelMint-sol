import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletBar() {
  return (
    <div className="wallet-adapter-button-trigger">
      <WalletMultiButton />
    </div>
  );
}
