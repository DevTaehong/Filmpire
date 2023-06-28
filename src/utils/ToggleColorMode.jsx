import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(() => ({ toggleColorMode: () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <>
      <ColorModeContext.Provider value={{ colorMode, setMode }}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default ToggleColorMode;
