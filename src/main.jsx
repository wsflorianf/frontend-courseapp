import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Login from './routes/Login.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Register from './routes/Register.jsx'
import SearchPage from './routes/SearchPage.jsx'

import './auth/appFirebase.js'
import { AuthContext } from './auth/AuthContext.jsx'
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'
import Home from './routes/Home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'search',
        element: <ProtectedRoute><SearchPage/></ProtectedRoute>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: '*',
        element: <ErrorPage/>  
      }
    ],
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
      <AuthContext>
        <RouterProvider router={router}/>
      </AuthContext>
)
