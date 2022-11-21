import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '@pages/Login'

const ComponentAppRoute = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to='/home' />},
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> }
  ])
  return routes
}

export default ComponentAppRoute