import WelcomePage from './pages/WelcomePage';
import PixelArtEditor from './pages/PixelArtEditor';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Welcome',
    path: '/',
    element: <WelcomePage />
  },
  {
    name: 'Pixel Art Editor',
    path: '/editor',
    element: <PixelArtEditor />
  }
];

export default routes;
