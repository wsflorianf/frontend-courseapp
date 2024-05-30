import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
} from '@mui/material'
import StyledTextField from '../style-components/StyledTextField'
import '../Form.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { VisibilityOff } from '@mui/icons-material'
import { Visibility } from '@mui/icons-material'
import DialogError from '../components/DialogError'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({state: false, message: ''})
  const navigate = useNavigate()

  const bcolor = useTheme().palette.primary.main

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onClose=()=>{
    setError({state: false, message: ''})
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const auth = getAuth()

  async function handleSingUp(data) {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => navigate('/search'))
      .catch((err) => {
        let messageError = ''
        console.log(err.code)
        if(err.code==='auth/network-request-failed'){
          messageError='Sin conexión al servidor'
        }
        if(err.code==='auth/email-already-in-use'){
          messageError='Ya existe un usuario con el email ingresado'
        }
        setError({state: true, message: messageError})
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      className='form-box'
      sx={{
        bgcolor: 'primary.secondColor',
        borderColor: 'primary.main !important',
      }}
      component={'form'}
      onSubmit={handleSubmit(handleSingUp)}
    >
      <h1>REGISTRO</h1>
      <StyledTextField
        label={'Email'}
        type='email'
        {...register('email', {
          required: {
            value: true,
            message: '* Este campo es requerido',
          },
          pattern: {
            value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
            message: '* El formato del correo no es correcto',
          },
        })}
        helperText={errors['email'] && errors['email'].message}
      />

      <StyledTextField
        type='password'
        label={'Contraseña'}
        {...register('password', {
          required: {
            value: true,
            message: '* Este campo es requerido',
          },
          minLength: {
            value: 6,
            message: 'La contraseña debe contener al menos 6 caracteres'
          }
        })}
        helperText={errors['password'] && errors['password'].message}
      ></StyledTextField>

      <StyledTextField
        label='Repetir Contraseña'
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
        {...register('verify-password', {
          required: {
            value: true,
            message: '* Este campo es requerido',
          },
          validate: (value) => {
            if (value !== watch('password'))
              return 'Las contraseñas no coinciden'
          },
        })}
        helperText={
          errors['verify-password'] && errors['verify-password'].message
        }
        type={showPassword ? 'text' : 'password'}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button type='submit' variant='contained'>
          Registrarse
        </Button>
        <Link to={'/login'}>
          <Button style={{ width: '100%' }} variant='contained'>
            Ya tengo una cuenta
          </Button>
        </Link>
      </div>
      {loading && <Loading />}
      <DialogError open={error.state} closeError={onClose}>{error.message}</DialogError>
    </Box>
  )
}
