import { useStoreRehydrated } from 'easy-peasy';
import { FC, memo } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { routes } from './router';
import theme from './theme';
import AppLayout from './layout';

const App: FC = () => {
  const appRoutes = useRoutes(routes);
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
