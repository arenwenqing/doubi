import React, { Suspense } from 'react'
import ComponentAppRoute from '../route'
import Copyright from '@pages/Copyright'
import './index.less'

const App: React.FC = () => {
  return <Suspense fallback='加载中...'>
    <div className='app-wrapper'>
      <ComponentAppRoute />
      <Copyright />
    </div>
  </Suspense>
}
export default App
