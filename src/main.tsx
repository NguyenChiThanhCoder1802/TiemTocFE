import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { SnackbarProvider } from 'notistack';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import theme from './types/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ThemeProvider>
      </SnackbarProvider>
   
  </BrowserRouter>
);
