import Vue from 'vue'
import VueSocialauth from 'vue-social-auth'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {
  providers: {
    facebook: {
      clientId: '913490722444787',
      redirectUri: window.location.origin + '/signin-with-socialmedia/callback' // Your client app URL
    }
  }
})