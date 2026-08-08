import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/style.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes';
import { store, StoreContext } from './lib/stores/store';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { zhCN } from "@mui/x-date-pickers/locales";
import { zhCN as dateFnsZhCN } from 'date-fns/locale';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider 
    dateAdapter={AdapterDateFns}
    adapterLocale={dateFnsZhCN}
    localeText={zhCN.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StoreContext.Provider>
    </LocalizationProvider>
  </StrictMode>,
)
