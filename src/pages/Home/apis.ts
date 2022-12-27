import srcConfig from 'requestConfig'
import { getRequestsByRoot } from 'axios-service'

const root = srcConfig.APIS.root

const { get } = getRequestsByRoot({ root })
class Apis  {
  getKeys = get('/mystery/user/keyInfo')
}


export default new Apis()