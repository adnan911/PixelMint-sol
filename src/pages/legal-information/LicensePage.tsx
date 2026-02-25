
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LicensePage = () => {
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
            <h1 className="font-pixel text-2xl sm:text-4xl text-primary uppercase">License Agreement & Legal Compliance Disclosure</h1>
            <p className="text-muted-foreground text-sm">Last Updated: March 2026</p>
            <p className="text-muted-foreground text-sm font-bold">Operated by OnchainersLab</p>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">1. Software License Grant</h2>
              <p>PixelMint is proprietary software.</p>
              <p>Subject to compliance with these terms, users are granted a limited, non-exclusive, revocable, non-transferable license to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Install and use the Application</li>
                <li>Create pixel artwork</li>
                <li>Mint NFTs on supported blockchain networks</li>
              </ul>
              <p>This license does not transfer ownership of the Application.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">2. Prohibited Activities</h2>
              <p>Users may not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Reverse engineer or decompile the Application</li>
                <li>Extract source code</li>
                <li>Modify or redistribute the Application</li>
                <li>Create derivative works of proprietary components</li>
                <li>Circumvent security or wallet integrations</li>
              </ul>
              <p>Violation may result in termination of access.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">3. Blockchain & Web3 Disclosure</h2>
              <p>PixelMint facilitates interaction with decentralized blockchain networks.</p>
              <p>Users acknowledge:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Transactions are irreversible once confirmed.</li>
                <li>Blockchain fees (“gas” or network fees) are paid directly to the network.</li>
                <li>NFT minting is subject to network conditions.</li>
                <li>OnchainersLab does not control blockchain validators or transaction confirmation.</li>
                <li>Users assume full responsibility for wallet security and private key management.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">4. Fees & Revenue Transparency</h2>
              <p>PixelMint may charge service fees for NFT minting operations.</p>
              <p>Service fees are clearly displayed prior to transaction confirmation. </p>
              <p>Users authorize the smart contract or backend system to transfer applicable service fees during mint transactions.</p>
              <p>OnchainersLab does not custody user funds.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">5. Open Source Acknowledgment</h2>
              <p>The Application incorporates open-source software including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>React</li>
                <li>Vite</li>
                <li>@solana/web3.js</li>
                <li>Solana Wallet Adapter</li>
                <li>Node.js</li>
              </ul>
              <p>Each component remains under its respective license (MIT, Apache 2.0, or similar).</p>
              <p>Open-source licenses are available upon request.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">6. No Financial Advice</h2>
              <p>PixelMint does not provide financial, investment, or legal advice.</p>
              <p>NFT minting and digital asset markets carry inherent risk.</p>
              <p>Users are solely responsible for evaluating risks associated with blockchain transactions.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law:</p>
              <p>OnchainersLab shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of funds due to wallet compromise</li>
                <li>Smart contract bugs in third-party protocols</li>
                <li>Blockchain network outages</li>
                <li>Market volatility</li>
                <li>IPFS downtime</li>
                <li>NFT resale value</li>
              </ul>
              <p>Use of the Application is at your own risk.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">8. Warranty Disclaimer</h2>
              <p>The Application is provided “AS IS” and “AS AVAILABLE.”</p>
              <p>No warranties, express or implied, including merchantability or fitness for a particular purpose.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-pixel text-xl text-primary">9. Governing Law</h2>
              <p>These terms shall be governed by applicable international digital commerce principles and relevant jurisdictional law.</p>
            </section>

            <section className="space-y-3 border-t-4 border-border pt-6 mt-8">
              <h2 className="font-pixel text-xl text-primary">10. Contact Information</h2>
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

export default LicensePage;
