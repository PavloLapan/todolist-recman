import React from 'react';
import { Board } from './components/Board';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Task Board</h1>
        <Board />
      </main>
    </ThemeProvider>
  );
};

export default App;
