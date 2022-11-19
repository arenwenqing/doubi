import srcConfig from 'requestConfig'
import { getRequestsByRoot } from 'axios-service'

const root = srcConfig.APIS.root

const { get } = getRequestsByRoot({ root })
class Apis  {
  getUser = get('/legal/api/v1/user/loginInfo')
}


export default new Apis()