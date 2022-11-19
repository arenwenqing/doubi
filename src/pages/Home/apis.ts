import srcConfig from '../../../requestConfig'
import { getRequestsByRoot } from 'axios-service'

// const root = srcConfig.APIS.root
console.log(getRequestsByRoot, srcConfig)
// const { get } = getRequestsByRoot({ root })
// console.log(get)
// class Apis  {
//   getUser = get('/legal/api/v1/user/loginInfo')
// }

const Apis = {
  getUser: () => {
    return 111
  }
}


export default Apis