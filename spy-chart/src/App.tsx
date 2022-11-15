import React from 'react';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query'
import Main from './containers/Main';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <Main />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
