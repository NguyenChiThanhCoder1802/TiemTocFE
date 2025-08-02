import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './context/CartProvider';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <CartProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </CartProvider>
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>
);
