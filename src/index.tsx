import React from 'react'
import ReactDOM from 'react-dom'
import ComponentAppRoute from './route'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '../requestIntercept'
import 'antd-mobile/es/global'

ReactDOM.render(
  <Router>
    <ComponentAppRoute />
  </Router>,
  document.getElementById('root')
)