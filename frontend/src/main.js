import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import interceptorsSetup from '../src/services/interceptors'
import './plugins/vue-social-auth'
import VueAnalytics from 'vue-analytics'
import VueLazyload from 'vue-lazyload'
import { VueReCaptcha } from 'vue-recaptcha-v3'

interceptorsSetup()

require('@/store/subscriber')
Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(VueLazyload)
Vue.use(VueAnalytics, {
  id: 'UA-80091704-1',
  router
})
Vue.use(VueReCaptcha, { siteKey: '6LeAVwEVAAAAAKSAZ0KyRmcYvo0Iv9I0S14nNfo7' });

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})