import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import events from './module/events'
import bucketlist from './module/bucketlist'
import eventsearch from './module/eventsearch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    events,
    bucketlist,
    eventsearch
  }
})