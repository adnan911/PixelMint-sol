import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { AppProviders } from "./providers/AppProviders.tsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.tsx";

// Global error handler to suppress Chrome extension errors
// This prevents extension conflicts from breaking the application
window.addEventListener('error', (event) => {
  // Check if error is from a Chrome extension
  if (event.filename && event.filename.includes('chrome-extension://')) {
    console.warn('Suppressed Chrome extension error:', event.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension://')) {
    console.warn('Suppressed Chrome extension promise rejection:', event.reason);
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppWrapper>
        <AppProviders>
          <App />
        </AppProviders>
      </AppWrapper>
    </ErrorBoundary>
  </StrictMode>
);
