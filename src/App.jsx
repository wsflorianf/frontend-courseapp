import { useState } from 'react'
import { Button, ThemeProvider, Tooltip } from '@mui/material'
import './App.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { lightTheme} from './themes/themes.js'
import { getAuth, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Context } from './auth/AuthContext.jsx'
import { Logout } from '@mui/icons-material'
import AccesibilityButton from './components/AccesibilityButton.jsx'
import appImage from "./assets/logo.ico"


function App() {
  
  const [mode, setMode] = useState(lightTheme)
  const { user } = useContext(Context)

  const auth = getAuth()

  async function handleSingOut(e) {
    e.preventDefault()
    try {
      await signOut(auth)
    } catch (err) {
      console.log(err)
    }
    const expires = new Date(Date.now() - 1000).toUTCString();
    document.cookie = `session=; expires=${expires}; path=/; samesite=None; secure=false`;
  }  

  return (
    <ThemeProvider theme={mode}>
      <nav style={{ backgroundColor: mode.palette.primary.secondColor }}>
        <Link id='icon-app'>
          <img
            id='courseApp-icon'
            src={appImage}
            alt='Course App icon'
          />
        </Link>
        {user && (
          <div id='log-out'>
            <Tooltip title='Cerrar Sesión'>
              <Button onClick={handleSingOut} variant='contained'>
                <Logout />
              </Button>
            </Tooltip>
          </div>
        )}
      </nav>
      <div id='container'>
        <Outlet />        
        <AccesibilityButton mode={mode} setMode={setMode}/>
      </div>
    </ThemeProvider>
  )
}

export default App
