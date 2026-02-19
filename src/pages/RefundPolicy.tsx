
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPolicy = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary">REFUND POLICY</h1>
            <p className="text-muted-foreground text-sm">Effective Date: 2026-02-19</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <p>PixelMint processes minting through on-chain blockchain transactions.</p>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">No Refunds for On-Chain Fees</h2>
              <p>All on-chain fees are final and non-refundable, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solana network fees</li>
                <li>Protocol fees</li>
                <li>PixelMint maintenance fees</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">Failed Transactions</h2>
              <p>If a transaction fails, Solana may still charge a small network fee. PixelMint cannot refund network fees.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">IPFS Uploads</h2>
              <p>If minting fails after IPFS upload, the uploaded files may still exist. Upload costs are not refundable.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
