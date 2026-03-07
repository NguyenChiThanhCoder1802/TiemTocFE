import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { SnackbarProvider } from 'notistack';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import theme from './types/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import ToastProvider from './components/common/ToastProvider';
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
          <DndProvider backend={HTML5Backend}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <ToastProvider>
              <App />
            </ToastProvider>
            </LocalizationProvider>
           
            
          </DndProvider>
        </ThemeProvider>
      </SnackbarProvider>
   
  </BrowserRouter>
);
