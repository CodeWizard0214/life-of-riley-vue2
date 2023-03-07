import axios from 'axios'
import router from '../../router'
// const baseURL = 'https://www.thelifeofriley.com/api'
const baseURL = 'https://admin.experientialstar.com/api'
// const baseURL = 'http://www.lor.com/api'
// const baseURL = 'https://admin.expstar.dev/api'
const setup = () => {
  axios.defaults.baseURL = baseURL
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const loginException = [
        '/auth/signin',
        '/removeFromBucketList',
        '/addToBucketList'
      ]
      if (
        error.response.status === 401 &&
        loginException.indexOf(error.response.config.url) === -1
      ) {
        router.push({
          name: 'page-login'
        })
      } else if (
        error.response.status === 404 &&
        (error.response.config.url.indexOf('api.tripadvisor.com') === -1 && error.response.config.url.indexOf('/auth/reset-password')===-1)
      ) {
        router.push({
          name: '404'
        })
      }
      return Promise.reject(error)
    }
  )
}
export default setup
