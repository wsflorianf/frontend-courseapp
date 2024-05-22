import { Visibility, VisibilityOff } from '@mui/icons-material'
import StyledTextField from './StyledTextField'
import { useState } from 'react'
import { IconButton, InputAdornment, useTheme } from '@mui/material'

export default function PassTextField(props) {
  const [showPassword, setShowPassword] = useState(false)

  const bcolor = useTheme().palette.primary.main


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <StyledTextField
      label={props.label}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              sx={{ color: bcolor, zIndex: '10' }}
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props.register(props.name, {
        required: {
          value: true,
          message: '* Este campo es requerido',
        },
      })}
      helperText={props.errors[props.name] && props.errors[props.name].message}
      type={showPassword ? 'text' : 'password'}
    />
  )
}
