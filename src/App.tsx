import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Form } from './components/Form';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const theme = createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
  },
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Form />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}
