
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CopyrightPage = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary uppercase">Copyright & Intellectual Property Policy</h1>
            <p className="text-muted-foreground text-sm">Last Updated: March 2026</p>
            <p className="text-muted-foreground text-sm font-bold">Operated by: OnchainersLab</p>
            <p className="text-muted-foreground text-sm">Contact: onchainersLab@gmail.com</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">1. Ownership of Intellectual Property</h2>
              <p>
                PixelMint (the “Application”) is developed, owned, and operated by OnchainersLab.
              </p>
              <p>
                All intellectual property rights in and to the Application, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Source code and compiled code</li>
                <li>Application architecture</li>
                <li>UI/UX design elements</li>
                <li>Graphics, branding, logos, and trademarks</li>
                <li>Documentation</li>
                <li>Backend infrastructure</li>
                <li>Website content</li>
              </ul>
              <p>are owned exclusively by OnchainersLab unless otherwise explicitly stated.</p>
              <p className="font-bold">© 2026 OnchainersLab. All Rights Reserved.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">2. User-Generated Content (UGC)</h2>
              <p>Users retain full copyright ownership of pixel artwork they create using PixelMint.</p>
              <p>By minting NFTs through the Application, users acknowledge that:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Minting does not transfer copyright ownership to OnchainersLab.</li>
                <li>OnchainersLab does not claim ownership of user-generated artwork.</li>
                <li>Users are solely responsible for ensuring they have legal rights to any artwork they mint.</li>
                <li>OnchainersLab reserves the right to remove content that violates applicable laws or intellectual property rights.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">3. Trademark Notice</h2>
              <p>“PixelMint” and associated branding elements are proprietary identifiers of OnchainersLab.</p>
              <p>Unauthorized use, reproduction, or imitation of these marks is strictly prohibited.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">4. Third-Party Technologies</h2>
              <p>The Application integrates with third-party services including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solana Blockchain</li>
                <li>Solana Mobile Wallet Adapter</li>
                <li>IPFS (via Pinata)</li>
                <li>Open-source JavaScript libraries</li>
              </ul>
              <p>All third-party components operate under their respective licenses and terms.</p>
              <p>OnchainersLab does not claim ownership of these technologies.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">5. DMCA & Copyright Complaints</h2>
              <p>If you believe content within PixelMint infringes your intellectual property rights, please submit a written notice including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Description of copyrighted work</li>
                <li>URL or blockchain reference</li>
                <li>Proof of ownership</li>
                <li>Contact details</li>
              </ul>
              <p>Send to:</p>
              <p className="font-bold">onchainersLab@gmail.com</p>
              <p>We will respond in accordance with applicable intellectual property laws.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">6. Reservation of Rights</h2>
              <p>All rights not expressly granted are reserved by OnchainersLab.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightPage;
