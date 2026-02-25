
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MintingRisk = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 font-retro animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="font-pixel mb-4 hover:bg-transparent hover:text-primary p-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="pixel-card p-6 sm:p-10 space-y-8 bg-card text-card-foreground border-4 border-border shadow-sm">
          <div className="space-y-2 border-b-4 border-border pb-6">
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary">MINTING RISK DISCLOSURE</h1>
            <p className="text-muted-foreground text-sm">Effective Date: 2026-02-19</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <p className="font-bold">PixelMint allows you to mint NFTs on Solana.</p>
            <p>By using the mint feature, you understand:</p>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">1. Blockchain Transactions Are Final</h2>
              <p>All transactions are irreversible. If you approve a transaction, it cannot be undone.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">2. Fees Are Required</h2>
              <p>Minting may require:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solana network fees</li>
                <li>Protocol fees (e.g., Metaplex Core)</li>
                <li>PixelMint maintenance fee</li>
              </ul>
              <p>These fees may change due to network conditions.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">3. No Guarantee of Success</h2>
              <p>Minting may fail due to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>RPC outages</li>
                <li>Wallet issues</li>
                <li>Network congestion</li>
                <li>Insufficient SOL balance</li>
              </ul>
              <p>If minting fails after uploads, your IPFS uploads may still remain pinned.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">4. Public and Permanent Data</h2>
              <p>NFT metadata and IPFS-hosted content may become publicly accessible and may persist indefinitely.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">5. Market Risk</h2>
              <p>PixelMint does not guarantee:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any resale value</li>
                <li>Any market demand</li>
                <li>Any future compatibility with marketplaces</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">6. User Responsibility</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Wallet security</li>
                <li>Approving correct transactions</li>
                <li>Ensuring you have sufficient SOL balance</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintingRisk;
