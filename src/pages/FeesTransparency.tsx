
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FeesTransparency = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary">FEES & TRANSPARENCY</h1>
            <p className="text-muted-foreground text-sm">Effective Date: 2026-02-19</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <p>PixelMint charges fees to keep the service running and to cover infrastructure costs.</p>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">What You Pay When Minting</h2>
              <p>When you mint an NFT, you may pay:</p>

              <div className="space-y-4 pt-2">
                <div className="bg-muted/30 p-4 rounded border-2 border-border">
                  <h3 className="font-bold text-foreground">A) PixelMint Maintenance Fee</h3>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>0.0015 SOL per mint</strong></li>
                    <li>Sent to PixelMint treasury wallet:</li>
                  </ul>
                  <code className="block bg-muted p-2 mt-2 rounded text-xs break-all font-mono select-all">
                    GPPeDtd8kh7CB7jXsLDJmZcCgJZU3RxnkqzDUyEf61cX
                  </code>
                  <p className="mt-2 text-sm text-muted-foreground">This supports IPFS pinning and storage, hosting and server costs, and maintenance and development.</p>
                </div>

                <div className="bg-muted/30 p-4 rounded border-2 border-border">
                  <h3 className="font-bold text-foreground">B) Protocol Fee</h3>
                  <p className="mt-1">Minting uses a standard NFT protocol that may require protocol fees (e.g., Metaplex Core).</p>
                </div>

                <div className="bg-muted/30 p-4 rounded border-2 border-border">
                  <h3 className="font-bold text-foreground">C) Network Fees</h3>
                  <p className="mt-1">Solana charges small transaction fees. Fees may increase during congestion.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">Fees Are Shown Before You Confirm</h2>
              <p>PixelMint displays fees before you approve the transaction in your wallet.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesTransparency;
