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
  }
];

export default routes;
