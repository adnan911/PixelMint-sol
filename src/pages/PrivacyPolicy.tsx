
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary">PRIVACY POLICY</h1>
            <p className="text-muted-foreground text-sm">Last Updated: 2026-02-19</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">1. Overview</h2>
              <p>
                PixelMint is a web and Android Trusted Web Activity (TWA) application that allows users to create pixel art and mint it as a digital collectible (NFT) on the Solana blockchain.
              </p>
              <p>
                This Privacy Policy explains what information PixelMint collects, how it is used, and the choices you have.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">2. Information We Collect</h2>
              
              <h3 className="font-bold text-foreground">2.1 Wallet Address and Blockchain Activity</h3>
              <p>When you connect a Solana wallet (including Seed Vault / Mobile Wallet Adapter), we process:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your public wallet address</li>
                <li>Transaction signatures you approve</li>
                <li>On-chain transaction details required to display mint status</li>
              </ul>
              <div className="bg-muted/50 p-4 border-2 border-border rounded-md">
                <p className="font-bold text-destructive text-sm">We do not collect or store your private key, seed phrase, or wallet recovery phrase.</p>
                <p className="text-xs pt-1">Your wallet provider controls authentication and signing.</p>
              </div>

              <h3 className="font-bold text-foreground mt-4">2.2 User-Generated Content (Pixel Art)</h3>
              <p>When you mint, PixelMint uploads your content to IPFS using Pinata. This includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A PNG image of your pixel art</li>
                <li>A metadata JSON file (name, description, attributes, and the IPFS image link)</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2"><strong>Important:</strong> IPFS and blockchain records can be public and permanent.</p>

              <h3 className="font-bold text-foreground mt-4">2.3 Technical and Device Information</h3>
              <p>To operate the service and improve reliability, we may process limited technical data such as:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Device type and OS (e.g., Android)</li>
                <li>Browser type (e.g., Chrome)</li>
                <li>Approximate region/country derived from IP address</li>
                <li>Error logs (e.g., failed RPC requests)</li>
              </ul>
              <p>We do not intentionally collect precise location.</p>

              <h3 className="font-bold text-foreground mt-4">2.4 Local Storage</h3>
              <p>PixelMint may use browser local storage to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Store UI preferences (like Theme)</li>
                <li>Save drafts or editor state (if enabled)</li>
                <li>Improve performance and user experience</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">3. Information We Do Not Collect</h2>
              <p>PixelMint does not intentionally collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Private keys, seed phrases, recovery phrases</li>
                <li>Government ID numbers</li>
                <li>Exact home address</li>
                <li>Sensitive personal data (religion, political opinions, health data, etc.)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">4. How We Use Information</h2>
              <p>We use information to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide wallet connection and minting features</li>
                <li>Upload artwork and metadata to IPFS</li>
                <li>Display minting status and transaction confirmations</li>
                <li>Prevent abuse, fraud, or malicious usage</li>
                <li>Maintain and improve app performance and reliability</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">5. Sharing and Disclosure</h2>
              
              <h3 className="font-bold text-foreground">5.1 Solana Blockchain</h3>
              <p>Minting requires interaction with the Solana blockchain. Wallet addresses, signatures, and on-chain activity may be publicly visible.</p>
              <p>We cannot delete or modify blockchain records.</p>

              <h3 className="font-bold text-foreground mt-4">5.2 IPFS / Pinata</h3>
              <p>Minted images and metadata are uploaded to IPFS via Pinata. This content may be publicly accessible through IPFS gateways and may persist indefinitely.</p>

              <h3 className="font-bold text-foreground mt-4">5.3 Service Providers</h3>
              <p>We rely on third-party services for infrastructure, such as:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pinata (IPFS pinning and uploads)</li>
                <li>Solana RPC providers (network access)</li>
                <li>Hosting providers (e.g., Vercel)</li>
              </ul>
              <p>These providers may process limited technical data required to operate the service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">6. Fees and Payments</h2>
              <p>When minting, you may pay:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solana network fees</li>
                <li>Protocol fees required by NFT standards</li>
                <li>A PixelMint maintenance fee (displayed in the app)</li>
              </ul>
              <p>All fees are executed on-chain and are generally irreversible.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">7. Data Retention</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not store wallet private keys.</li>
                <li>Uploaded IPFS content may persist indefinitely.</li>
                <li>Blockchain transactions are permanent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">8. Security</h2>
              <p>We take reasonable steps to protect the service. However:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Blockchain transactions are irreversible</li>
                <li>Users are responsible for wallet security</li>
                <li>Never share your seed phrase with anyone</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">9. Children’s Privacy</h2>
              <p>
                PixelMint is not designed to collect personal information from children. If you are under 13, you should not use the service. If you are under 18, you should use the service only with permission of a parent or guardian.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">10. International Users</h2>
              <p>
                PixelMint may be accessed globally. Data may be processed in different countries depending on infrastructure providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy. Updates will be posted on this page with a revised effective date.
              </p>
            </section>

            <section className="space-y-3 border-t-4 border-border pt-6 mt-8">
              <h2 className="font-pixel text-xl text-primary">12. Contact</h2>
              <p>If you have questions about privacy, contact:</p>
              <div className="mt-2">
                <p className="font-bold">OnchainersLab</p>
                <p>Email: <a href="mailto:onchainersLab@gmail.com" className="text-primary hover:underline">onchainersLab@gmail.com</a></p>
                <p>Website: <a href="https://pixel-mint-sol.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pixel-mint-sol.vercel.app</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
