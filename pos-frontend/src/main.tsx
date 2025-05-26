import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { CustomerProvider } from './contexts/CustomerContext';

import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CustomerProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CustomerProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
