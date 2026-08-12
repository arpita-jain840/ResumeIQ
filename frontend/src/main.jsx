import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.94)',
            color: '#e2e8f0',
            border: '1px solid rgba(34, 211, 238, 0.28)',
            boxShadow: '0 16px 60px rgba(2, 6, 23, 0.45)',
          },
          error: {
            style: {
              borderColor: 'rgba(244, 63, 94, 0.45)',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
