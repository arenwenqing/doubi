import * as React from 'react';
import { render } from "react-dom";
// import ZtPayResult from "../../src/mobile"; // 引入移动组件
import ZtPayResult from '../../src/mobile/result/index'
const App = () => {
  const backHandler = () => {
    console.log('点击事件')
  }
  return <div>
  <ZtPayResult
    type='success'
    onBack={backHandler}
  />
</div>
};

render(<App />, document.getElementById("root"));
