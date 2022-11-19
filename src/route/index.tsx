import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Test from '../pages/Test'

const ComponentAppRoute = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to='/home' />},
    { path: '/home', element: <Home /> },
    { path: '/test', element: <Test /> }
  ])
  return routes
}

export default ComponentAppRoute