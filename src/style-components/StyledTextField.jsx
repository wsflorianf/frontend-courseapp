import { TextField, styled, useTheme } from '@mui/material'

const StyledTextField = styled(TextField)(() => {
  
  const theme = useTheme().palette.primary
  
  return {
  '& fieldset': {
    borderRadius: '15px',
    backgroundColor: 'rgba(176, 175, 175, 0.4)',
    transition: '0.1s all',
    borderColor: theme.main
  },
  '& label': {
    color: theme.contrastTextI,
  },
  '& input': {
    color: theme.contrastTextI, 
    zIndex: '10'
  },

  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.contrastTextI,
      boxShadow: `0 0 4px 0.2px ${theme.main}`,
    },
  }
}})

export default StyledTextField
