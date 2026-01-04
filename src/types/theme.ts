import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d2a679'
    },
    secondary: {
      main: '#deb887'
    },
    background: {
      default: '#fdf8f2'
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', sans-serif`
  }
})

export default theme
