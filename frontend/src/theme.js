import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#245b8f',
      dark: '#173b63',
      light: '#3d7ab0',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
})

export default theme
