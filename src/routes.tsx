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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MintingRisk from './pages/MintingRisk';
import RefundPolicy from './pages/RefundPolicy';
import FeesTransparency from './pages/FeesTransparency';
import SettingsPage from './pages/SettingsPage';

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
    name: 'Settings',
    path: '/settings',
    element: <SettingsPage />
  }
];

export default routes;
