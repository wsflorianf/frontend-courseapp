import StyledTextField from '../style-components/StyledTextField'
import '../Form.css'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Loading from '../components/Loading'
import { VisibilityOff } from '@mui/icons-material'
import { Visibility } from '@mui/icons-material'
import DialogError from '../components/DialogError'

export default function Login() {
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
    formState: { errors },
  } = useForm()

  const { user } = useContext(Context)
  const auth = getAuth()

  async function handleSingIn(data) {
    //e.preventDefault()
    setLoading(true)

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        fetch('http://127.0.0.1:5000/session_login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken: data.user.accessToken }),
        }).then(response => response.json()).then(data=>{
          const expires = new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString();
          document.cookie = `session=${data.cookie}; expires=${expires}; path=/; samesite=None; secure=false`;
        })
        navigate('/search')
      })
      .catch((err) => {
        let messageError = ''
        console.log(err.code) 
        if(err.code==='auth/invalid-credential'){
          messageError='Credenciales inválidas'
        }
        if(err.code==='auth/network-request-failed'){
          messageError='Sin conexión al servidor'
        }
        setError({state: true, message: messageError})
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (user) {
    return <Navigate to={'/search/'} replace />
  }

  return (
    <Box
      className='form-box'
      component='form'
      onSubmit={handleSubmit(handleSingIn)}
      sx={{
        bgcolor: 'primary.secondColor',
        borderColor: 'primary.main !important',
      }}
    >
      <h1>INICIO DE SESIÓN</h1>
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
        label='Contraseña'
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
        {...register('password', {
          required: {
            value: true,
            message: '* Este campo es requerido',
          },
        })}
        helperText={errors['password'] && errors['password'].message}
        type={showPassword ? 'text' : 'password'}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button type='submit' variant='contained'>
          Iniciar Sesión
        </Button>
        <Link to={'/register'}>
          <Button style={{ width: '100%' }} variant='contained'>
            ¡Registrarme!
          </Button>
        </Link>
      </div>
      {loading && <Loading />}
      <DialogError open={error.state} closeError={onClose}>{error.message}</DialogError>
    </Box>
  )
}
