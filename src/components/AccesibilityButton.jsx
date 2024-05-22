import { WaterDrop } from '@mui/icons-material'
import { Contrast } from '@mui/icons-material'
import { Nightlight } from '@mui/icons-material'
import { Box, Button, Tooltip, useTheme } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { darkTheme, lightTheme } from '../themes/themes'
import { Accessibility } from '@mui/icons-material'

export default function AccesibilityButton({mode, setMode}) {
  const [grayMode, setGrayMode] = useState(false)
  const [saturateMode, setSaturateMode] = useState(false)
  const colors = useTheme().palette.primary;

  useEffect(() => {
    document.body.style.backgroundColor = mode.palette.primary.bodyColor
  }, [mode])

  useEffect(() => {
    if (grayMode) {
        document.getElementById('root').classList.add('gray-mode')
      
    } else {
        document.getElementById('root').classList.remove('gray-mode')
    }
  }, [grayMode])

  useEffect(() => {
    if (saturateMode) {
        document.getElementById('root').classList.add('saturate-mode')
    } else {
        document.getElementById('root').classList.remove('saturate-mode')
    }
  }, [saturateMode])

  //Posibles fuentes de cursos

  const changeMode = () => {
    setMode((lastMode) => {
      if (lastMode.name == 'light') {
        document.body.classList.add('dark-theme')
        return darkTheme
      } else {
        document.body.classList.remove('dark-theme')
        return lightTheme
      }
    })
  }

  function changeGrayMode() {
    setGrayMode((prev) => !prev)
  }

  function changeSaturateMode() {
    setSaturateMode((prev) => !prev)
  }
  return (
    <Box id='accesibility'>
      <div style={{
        backgroundColor: colors.main,
        width: '30px',
        height: '30px',
        borderRadius: '15px 0 0 15px',
        padding: '5px 5px',
        paddingLeft: '10px',
        border: `2px ${colors.contrastTextI} solid`
      }}>
        <Accessibility sx={{color: colors.contrastText}}/>
      </div>
    <div id='tools' style={{backgroundColor: colors.secondColor}}>
      <Tooltip placement='top' title='Cambiar Tema'>
        <Button onClick={changeMode} variant='contained'>
          <Nightlight />
        </Button>
      </Tooltip>
      <Tooltip placement='top' title='Modo Saturado'>
        <Button onClick={changeSaturateMode} variant='contained'>
          <WaterDrop />
        </Button>
      </Tooltip>
      <Tooltip placement='top' title='Modo Blanco y Negro'>
        <Button onClick={changeGrayMode} variant='contained'>
          <Contrast />
        </Button>
      </Tooltip>
    </div>
    </Box>
  )
}
