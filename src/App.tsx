import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';

import routes from './routes';

// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import { WalletBar } from '@/components/WalletBar';
import { WalletActions } from '@/components/WalletActions';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  return (
    <Router>
      {/*<AuthProvider>*/}
      {/*<RouteGuard>*/}
      <IntersectObserver />
      <div className="flex flex-col min-h-screen">
        <header style={{ display: "flex", justifyContent: "space-between", padding: 12 }}>
          <div className="text-xl font-bold">Pixel Mint</div>
          <WalletBar />
        </header>
        {/*<Header />*/}
        <main className="flex-grow p-3">
          <WalletActions />
          <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
