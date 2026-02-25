
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary">TERMS OF SERVICE</h1>
            <p className="text-muted-foreground text-sm">Effective Date: 2026-02-19</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing or using PixelMint, you agree to these Terms of Service. If you do not agree, do not use PixelMint.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">2. Service Description</h2>
              <p>PixelMint provides:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A pixel art editor</li>
                <li>The ability to mint pixel art as a digital collectible (NFT)</li>
                <li>Uploading artwork and metadata to IPFS through Pinata</li>
                <li>On-chain transactions on Solana mainnet</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">3. Wallets and User Responsibility</h2>
              <p>PixelMint requires a Solana wallet to mint.</p>
              <p>You understand and agree:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You are solely responsible for your wallet and private credentials</li>
                <li>We do not custody your assets</li>
                <li>We cannot reverse transactions</li>
                <li>We cannot recover lost funds sent to the wrong address</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">4. Fees</h2>
              <p>Minting may require payment of:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solana network fees</li>
                <li>Protocol fees required by the NFT standard (e.g., Metaplex Core)</li>
                <li>A PixelMint maintenance fee (currently displayed in-app)</li>
              </ul>
              <p className="font-bold text-destructive">All fees are on-chain. All payments are final. No refunds are provided for on-chain fees.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">5. User Content and Rights</h2>
              
              <h3 className="font-bold text-foreground">5.1 Your Content</h3>
              <p>You own the pixel art you create, subject to any rights of third parties.</p>

              <h3 className="font-bold text-foreground mt-4">5.2 Public Nature of Minting</h3>
              <p>By minting, you acknowledge:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your content may become publicly accessible</li>
                <li>IPFS content may persist indefinitely</li>
                <li>Blockchain records are permanent</li>
              </ul>

              <h3 className="font-bold text-foreground mt-4">5.3 License to Operate the Service</h3>
              <p>You grant PixelMint a limited license to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upload your content to IPFS</li>
                <li>Display your content in the app</li>
                <li>Process your content for minting and presentation</li>
              </ul>
              <p>This license is limited to operating and improving PixelMint.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">6. Prohibited Uses</h2>
              <p>You may not use PixelMint to create, mint, or distribute content that:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Violates any law or regulation</li>
                <li>Infringes copyrights, trademarks, or other rights</li>
                <li>Contains malware, exploits, or harmful code</li>
                <li>Promotes violence, exploitation, or abuse</li>
                <li>Is used for fraud, impersonation, or scams</li>
              </ul>
              <p>We may restrict or terminate access for violations.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">7. No Financial Advice</h2>
              <p>
                PixelMint does not provide financial, investment, tax, or legal advice. NFTs are speculative digital assets. You are responsible for your own decisions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">8. Service Availability</h2>
              <p>PixelMint is provided “as is” and “as available”. We do not guarantee:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uninterrupted access</li>
                <li>Successful minting</li>
                <li>Availability of third-party services (wallets, RPC providers, Pinata)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">9. Disclaimers</h2>
              <p>To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We disclaim all warranties, express or implied</li>
                <li>We do not guarantee the value, uniqueness, or marketability of any NFT</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">10. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, OnchainersLab is not liable for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of funds due to user error</li>
                <li>Failed or delayed blockchain transactions</li>
                <li>Wallet bugs or incompatibility</li>
                <li>IPFS unavailability or gateway downtime</li>
                <li>Third-party outages (RPC providers, Pinata, hosting)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless OnchainersLab from claims arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your use of PixelMint</li>
                <li>Your minted content</li>
                <li>Your violation of these Terms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">12. Termination</h2>
              <p>We may suspend or terminate access if:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You violate these Terms</li>
                <li>You attempt abuse or malicious actions</li>
                <li>Required by law or security reasons</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">13. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by the laws of Bangladesh. Any disputes shall be handled under Bangladesh jurisdiction.
              </p>
            </section>

            <section className="space-y-3 border-t-4 border-border pt-6 mt-8">
              <h2 className="font-pixel text-xl text-primary">14. Contact</h2>
              <div className="mt-2">
                <p className="font-bold">OnchainersLab</p>
                <p>Email: <a href="mailto:onchainersLab@gmail.com" className="text-primary hover:underline">onchainersLab@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
