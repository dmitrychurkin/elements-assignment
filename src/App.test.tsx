import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import AppRouter from './router';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { act } from 'react-dom/test-utils';

test('renders Weather link', () => {
  let linkElement;
  act(() => {
    render(
      <StoreProvider store={store}>
        <AppRouter>
          <App />
        </AppRouter>
      </StoreProvider>
    );
  });

  linkElement = screen.getByText(/Weather/i);
  expect(linkElement).toBeInTheDocument();
});
