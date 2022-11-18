import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'

const ComponentAppRoute = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to='/home' />},
    { path: '/home', element: <Home /> }
  ])
  return routes
}

export default ComponentAppRoute