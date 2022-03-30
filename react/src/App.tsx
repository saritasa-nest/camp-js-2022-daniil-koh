import { Suspense, VFC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CircularProgress, ThemeProvider } from '@mui/material';
import { RootRouter } from './routes/RootRouter';
import { Navbar } from './features/common/components/Navbar';
import { themeOptions } from './theme/mui-theme';
import { store } from './store';

export const App: VFC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Suspense fallback={<CircularProgress color="inherit" />}>
          <ThemeProvider theme={themeOptions}>
            <Navbar />
          </ThemeProvider>
          <RootRouter />
        </Suspense>
      </div>
    </BrowserRouter>
  </Provider>
);
