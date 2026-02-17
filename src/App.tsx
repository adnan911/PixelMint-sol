import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';

import routes from './routes';

// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import GalleryPage from "@/pages/GalleryPage";
import { WalletBar } from '@/components/WalletBar';

import { Toaster } from '@/components/ui/toaster';

const Layout: React.FC = () => {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/editor');

  return (
      <div className="flex flex-col min-h-screen">
        {!isEditor && (
        <header 
          style={{ 
            display: "flex", 
            justifyContent: "flex-start", 
            padding: 12 
          }} 
          className="relative z-50" 
        >
          <WalletBar />
        </header>
        )}
        {/*<Header />*/}
        <main className="flex-grow p-3">

          <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      {/*<AuthProvider>*/}
      {/*<RouteGuard>*/}
      <IntersectObserver />
      <Layout />
      <Toaster />
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
