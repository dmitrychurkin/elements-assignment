import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from './ScrollTop';
import { useStore, useStoreActions, useStoreState } from '../store';
import useNetwork from '../hook/useNetwork';

const AppLayout: FC<PropsWithChildren<{}>> = ({ children, ...restProps }) => {
  const store = useStore();
  const fetchCities = useStoreActions(actions => actions.fetchCities);
  const isLoading = useStoreState(state => state.isLoading);
  const isOnline = useNetwork();

  useEffect(() => {
    if (store.getState().cities.length === 0) {
      fetchCities();
    }
  }, [isOnline, fetchCities, store]);

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link component={RouterLink} to="/">
            <Typography style={{ color: '#fff' }} variant="h6">Weather</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box display="flex" justifyContent='center' my={2}>
          {isLoading ? <CircularProgress /> : children}
        </Box>
      </Container>
      <ScrollTop {...restProps}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default memo(AppLayout);