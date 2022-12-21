import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '@pages/Login'
import ForgetPassword from '@pages/ForgetPassword'
import DoubiExtract from '@pages/DoubiExtract'
import History from '@pages/History'

const ComponentAppRoute = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to='/home' />},
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/forget', element: <ForgetPassword /> },
    { path: '/extract', element: <DoubiExtract /> },
    { path: '/history', element: <History /> }
  ])
  return routes
}

export default ComponentAppRoute