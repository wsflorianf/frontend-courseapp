import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
    name: 'light',
    palette: {
      primary: {
        main: '#34425e',
        secondColor: '#85c1e9',
        bodyColor: '#edf6f6',
        contrastText: '#fff',
        contrastTextI: '#000',
      }
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#a00'
          }
        }
      }
    }
  })
  
  export const darkTheme = createTheme({
    name: 'dark',
    palette: {
      primary: {
        main: '#85c1e9',
        secondColor: '#34425e',
        bodyColor: '#212121',
        contrastText: '#000',
        contrastTextI: '#fff',
      },
    },
    components: {
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#fff',
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#ff9797'
          }
        }
      }
    }
  })