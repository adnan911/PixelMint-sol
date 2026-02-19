
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Shield, FileText, BadgeDollarSign, AlertTriangle, RefreshCcw } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Shield, label: 'Privacy Policy', path: '/privacy' },
    { icon: FileText, label: 'Terms of Service', path: '/terms' },
    { icon: BadgeDollarSign, label: 'Fees & Transparency', path: '/fees-transparency' },
    { icon: AlertTriangle, label: 'Minting Risk Disclosure', path: '/minting-risk' },
    { icon: RefreshCcw, label: 'Refund Policy', path: '/refund-policy' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 font-retro animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="font-pixel mb-4 hover:bg-transparent hover:text-primary p-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="pixel-card p-6 sm:p-8 space-y-6 bg-card text-card-foreground border-4 border-border shadow-sm">
          <div className="space-y-2 border-b-4 border-border pb-4">
            <h1 className="font-pixel text-2xl sm:text-3xl text-primary">LEGAL INFORMATION</h1>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="flex items-center justify-between p-4 rounded-md border-2 border-transparent hover:border-primary/50 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-retro text-lg">{item.label}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          
          <div className="pt-6 text-center text-xs text-muted-foreground">
            <p>PixelMint v1.0.0</p>
            <p>© {new Date().getFullYear()} OnchainersLab</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
