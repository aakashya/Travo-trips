import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <CustomerAuthProvider>
        <App />
      </CustomerAuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
