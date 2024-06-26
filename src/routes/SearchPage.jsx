import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from '@mui/material'
import Course from '../components/Course'
import { useState } from 'react'
//import { faker } from '@faker-js/faker'
import StyledTextField from '../style-components/StyledTextField'
import { Search } from '@mui/icons-material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import DialogError from '../components/DialogError'

export default function SearchPage() {
  const mode = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const querySearch = new URLSearchParams(location.search)

  const [search, setSearch] = useState(
    querySearch.get('search-query') ? querySearch.get('search-query') : ''
  )
  const [courses, setCourses] = useState([])
  const [error, setError] = useState({ state: false, message: '' })
  const [loading, setLoading] = useState(false)

  const pages = ['coursera', 'domestika', 'udacity']

  const onClose = () => {
    setError({ state: false, message: '' })
  }

  const searchCourses = async () => {
    setLoading(true)
    let coursesObtained = []
    await fetch('http://localhost:5000/search' + location.search, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        let dataCourses = []
        for (let pageOrigin in data['results']) {
          for (let course in data['results'][pageOrigin]) {
            let numberScore = data['results'][pageOrigin][course]['Score']
            if(pageOrigin==='coursera')numberScore=Number(numberScore.slice(0,4))
            if(pageOrigin==='udacity')numberScore=Number(numberScore.slice(6,9))
            if(pageOrigin==='domestika')numberScore=5

            dataCourses.push({
              name: data['results'][pageOrigin][course]['Title'],
              description: data['results'][pageOrigin][course]['Description'],
              image: data['results'][pageOrigin][course]['Image'],
              url: data['results'][pageOrigin][course]['CourseLink'],
              score: numberScore,
              page: pageOrigin,
            })
          }
        }

        dataCourses.sort(() => 0.5 - Math.random())

        coursesObtained = dataCourses
      })
      .catch((e) => {
        setError({ state: true, message: e.message })
      })
      .finally(() => {
        setLoading(false)
      })

    //Datos falsos de prueba
    // let coursesObtained = [];
    // for (let index = 0; index < 100; index++) {
    //   let myPage = pages[Math.floor(Math.random() * pages.length)]
    //   coursesObtained.push({
    //     name: faker.commerce.productName(),
    //     description: faker.commerce.productDescription(),
    //     image: faker.image.urlLoremFlickr({ category: search }),
    //     url: `http://www.${myPage}.com`,
    //     page: myPage,
    //   })
    // }

    setCourses(coursesObtained)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    let values = ''
    pages.forEach((page) => {
      values += '&' + page + '=' + document.getElementById(page).checked
    })
    values += '&' + 'price' + '=' + document.getElementById('price').value
    values += '&' + 'level' + '=' + document.getElementById('level').value
    values += '&' + 'duration' + '=' + document.getElementById('duration').value
    values += '&' + 'language' + '=' + document.getElementById('language').value
    navigate('/search?search-query=' + search + values)
  }

  useEffect(() => {
    if (search != '') searchCourses(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div id='search-container'>
      <form id='search-box' method='get' onSubmit={handleSearch}>
        <StyledTextField
          id='search-bar'
          name='search-query'
          fullWidth
          label='Buscar'
          onChange={handleChange}
          value={search}
        ></StyledTextField>
        <Tooltip title='Buscar'>
          <Button
            type='submit'
            variant='contained'
            sx={{ borderRadius: '25%' }}
          >
            <Search sx={{ transform: 'scale(1.8)' }} />
          </Button>
        </Tooltip>
      </form>
      <hr style={{ width: '100%' }}></hr>

      <div id='searchFilters'>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
        <FormControl>
          <FormLabel>Sitios</FormLabel>
          <FormGroup row>
            {pages.map((page, index) => {
              return (
                <FormControlLabel
                  key={index}
                  label={page}
                  control={
                    <Checkbox
                      name={page}
                      id={page}
                      defaultChecked={querySearch.get(page) === 'true'}
                    ></Checkbox>
                  }
                ></FormControlLabel>
              )
            })}
          </FormGroup>
        </FormControl>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
        <FormControl size='small' variant='standard' sx={{ width: '100px' }}>
          <FormLabel>Precio</FormLabel>
          <Select displayEmpty defaultValue={''} inputProps={{ id: 'price' }}>
            <MenuItem value=''>Elegir..</MenuItem>
            <MenuItem value={'free'}>Gratis</MenuItem>
            <MenuItem value={'paid'}>Paga</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
        <FormControl size='small' variant='standard' sx={{ width: '110px' }}>
          <FormLabel>Nivel</FormLabel>
          <Select displayEmpty defaultValue={''} inputProps={{ id: 'level' }}>
            <MenuItem value=''>Elegir..</MenuItem>
            <MenuItem value={'begginer'}>Principante</MenuItem>
            <MenuItem value={'intermediate'}>Intermedio</MenuItem>
            <MenuItem value={'advanced'}>Avanzado</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
        <FormControl size='small' variant='standard' sx={{ width: '110px' }}>
          <FormLabel>Duración</FormLabel>
          <Select
            displayEmpty
            defaultValue={''}
            inputProps={{ id: 'duration' }}
          >
            <MenuItem value=''>Elegir..</MenuItem>
            <MenuItem value={'hours'}>Horas</MenuItem>
            <MenuItem value={'days'}>Días</MenuItem>
            <MenuItem value={'weeks'}>Semanas</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
        <FormControl size='small' variant='standard' sx={{ width: '100px' }}>
          <FormLabel>Lenguaje</FormLabel>
          <Select displayEmpty defaultValue={''} inputProps={{ id: 'language' }}>
            <MenuItem value=''>Elegir..</MenuItem>
            <MenuItem value={'spanish'}>Español</MenuItem>
            <MenuItem value={'english'}>Inglés</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ borderWidth: '1px' }} variant='fullWidth' />
      </div>
      <hr style={{ width: '100%' }}></hr>
      <main>
        <div id='results'>
          {courses.map((course, i) => (
            <Course key={i} {...course} palette={mode}></Course>
          ))}
        </div>
      </main>
      {loading && <Loading type='search' />}
      <DialogError open={error.state} closeError={onClose}>
        No se pudo procesar la solicitud
      </DialogError>
    </div>
  )
}
