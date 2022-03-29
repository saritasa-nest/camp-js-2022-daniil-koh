import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { Navbar } from './features/common/components/Navbar';
import { themeOptions } from './theme/mui-theme';

export const App: React.VFC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
          <ThemeProvider theme={themeOptions}>
            <Navbar />
          </ThemeProvider>
          <RootRouter />
        </Suspense>
      </div>
    </BrowserRouter>
  </Provider>
);
