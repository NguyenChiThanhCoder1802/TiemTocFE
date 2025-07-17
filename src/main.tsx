import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './context/CartProvider';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <CartProvider>
            <App />
        </CartProvider>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>
);
