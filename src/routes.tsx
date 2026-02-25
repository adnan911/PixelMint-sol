import SplashPage from './pages/SplashPage';
import WelcomePage from './pages/WelcomePage';
import PixelArtEditor from './pages/PixelArtEditor';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

import GalleryPage from './pages/GalleryPage';
import PrivacyPolicy from './pages/legal-information/PrivacyPolicy';
import TermsOfService from './pages/legal-information/TermsOfService';
import MintingRisk from './pages/legal-information/MintingRisk';
import RefundPolicy from './pages/legal-information/RefundPolicy';
import FeesTransparency from './pages/legal-information/FeesTransparency';
import LegalInfoPage from './pages/LegalInfoPage';
import CopyrightPage from './pages/legal-information/CopyrightPage';
import LicensePage from './pages/legal-information/LicensePage';


const routes: RouteConfig[] = [
  {
    name: 'Splash Logic',
    path: '/',
    element: <SplashPage />,
    visible: false
  },
  {
    name: 'Welcome',
    path: '/welcome',
    element: <WelcomePage />
  },
  {
    name: 'Home (Gallery)',
    path: '/home',
    element: <GalleryPage />
  },
  {
    name: 'Pixel Art Editor',
    path: '/editor',
    element: <PixelArtEditor />
  },
  {
    name: 'Privacy Policy',
    path: '/privacy',
    element: <PrivacyPolicy />
  },
  {
    name: 'Terms of Service',
    path: '/terms',
    element: <TermsOfService />
  },
  {
    name: 'Minting Risk',
    path: '/minting-risk',
    element: <MintingRisk />
  },
  {
    name: 'Refund Policy',
    path: '/refund-policy',
    element: <RefundPolicy />
  },
  {
    name: 'Fees & Transparency',
    path: '/fees-transparency',
    element: <FeesTransparency />
  },
  {
    name: 'Legal Info',
    path: '/legalinfo',
    element: <LegalInfoPage />
  },
  {
    name: 'Copyright Policy',
    path: '/copyright',
    element: <CopyrightPage />
  },
  {
    name: 'License Agreement',
    path: '/license',
    element: <LicensePage />
  }
];

export default routes;
