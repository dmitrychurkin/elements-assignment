import { useStoreRehydrated } from 'easy-peasy';
import { FC, memo } from 'react';
import * as routerDom from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import AppRoutes from './router';
import theme from './theme';
import AppLayout from './layout';

const App: FC = () => {
  const appRoutes = (routerDom as any).useRoutes(AppRoutes);
  const isRehydrated = useStoreRehydrated();
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        {isRehydrated && appRoutes}
      </AppLayout>
    </ThemeProvider>
  );
};

export default memo(App);
