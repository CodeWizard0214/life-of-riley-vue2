import axios from 'axios'
// import Nprogress from 'nprogress'

// const baseURL = 'https://www.thelifeofriley.com/api'
const baseURL = 'https://admin.experientialstar.com/api'
// const baseURL = 'http://www.lor.com/api'
// const baseURL = 'https://admin.expstar.dev/api'

const apiClient = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// apiClient.interceptors.request.use(config => {
//   Nprogress.start()
//   return config
// })

// apiClient.interceptors.request.use(response => {
//   Nprogress.done()
//   return response
// })

export default {
  getEvents(parameters, requestToken) {
    let defaultParameters = {
      page: 1,
      urlSearchKeyword: '',
      tags: '',
      months: '',
      budgets: '',
      regions: '',
      keyword: '',
      upcoming: 0,
      check_new: 0,
      trending: 0,
      expiringsoon: 0,
      member_tag: 0
    }
    defaultParameters = {
      ...defaultParameters,
      ...parameters
    }
    return apiClient.get(
      '/events' +
        '?page=' +
        defaultParameters.page +
        '&urlSearchKeyword=' +
        defaultParameters.urlSearchKeyword +
        '&tags=' +
        defaultParameters.tags +
        '&months=' +
        defaultParameters.months +
        '&budgets=' +
        defaultParameters.budgets +
        '&regions=' +
        defaultParameters.regions +
        '&keyword=' +
        defaultParameters.keyword +
        '&upcoming=' +
        defaultParameters.upcoming +
        '&check_new=' +
        defaultParameters.check_new +
        '&trending=' +
        defaultParameters.trending +
        '&expiringsoon=' +
        defaultParameters.expiringsoon +
        '&member_tag=' +
        defaultParameters.member_tag,
      {
        cancelToken: requestToken
      }
    )
  },
  searchAllEvents(term = '') {
    // console.log(apiClient.interceptors);
    // apiClient.headers['X-Requested-With'] = 'XMLHttpRequest';
    return apiClient.get('/searchAllEvents?term=' + term, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  },
  getEventsByType(type) {
    switch (type) {
      case 'adventure':
        return apiClient.get('/getAdventure/12')
      case 'party':
        return apiClient.get('/getParty/12')
      case 'hotel':
        return apiClient.get('/getHotels/12')
      case 'romance':
        return apiClient.get('/getRomance/12')
      case 'sport':
        return apiClient.get('/getSport/12')
      case 'glamour':
        return apiClient.get('/getGlam/12')
      case 'spiritual':
        return apiClient.get('/getSpiritual/12')
      case 'cultural':
        return apiClient.get('/getCultural/12')
      case 'inspiration':
        return apiClient.get('/getInspiration/12')
      case 'featured':
        return apiClient.get('/getFeatured/30')
      default:
        break
    }
    return apiClient.get('/getParty/?_limit=5')
  },

  getEventBySlug(slug, type = '') {
    if (type) {
      return axios.get('/getEventBySlug/' + slug.trim() + '/' + type.trim())
    } else {
      return axios.get('/getEventBySlug/' + slug.trim())
    }
  },
  getUserByCode(code) {
    return apiClient.get('/getUserByCode/' + code)
  },
  getInboxByUserId(id) {
    return axios.get('/getInboxByUserId/' + id)
  },
  getConversations(id) {
    return axios.get('/getConversations/' + id)
  },
  sendMessage(data) {
    return axios.post('/sendMessage', data)
  },
  getExpired() {
    return apiClient.get('/getExpired')
  },
  getFourRandom() {
    return apiClient.get('/getFourRandom')
  },
  getRelated(category) {
    return apiClient.get(`/getRelated/${category}`)
  },
  getTags() {
    return apiClient.get('/getTags')
  },
  getCountry() {
    return apiClient.get('/getCountry')
  },
  getBlogs(limit, page = 1) {
    return apiClient.get('/getBlogs/' + limit + '?page=' + page)
  },
  getBlog(slug) {
    return axios.get('/getBlog/' + slug.trim())
  },
  getMonths() {
    return apiClient.get('/months')
  },
  getWritersById(id) {
    return apiClient.get('/getWritersById/' + id)
  },
  getEventByUser(id) {
    return axios.get('/getEventByUser/' + id)
  },
  readConversation(id) {
    return axios.get('/readConversation/' + id)
  },
  getTripAdviserData(locationId) {
    return axios.get(
      'https://api.tripadvisor.com/api/partner/2.0/location/' +
        locationId +
        '?key=0e3caec58d784fd9afaeda9c50c85985'
    )
  },
  forgotPassword(payload) {
    return axios.post('/auth/reset-password', payload)
  },
  resetPassword(payload) {
    return axios.post('/auth/handle-reset-password', payload, {
      headers: {
        Accept: 'application/json',

      }
    })
  }
}
