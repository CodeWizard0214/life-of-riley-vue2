<template>
  <div id="app">
    <LoginRegisterMobile />
    <CovidNotice/>
    <main :class="{'page-wrapper':($route.name !== 'event-show-frame')}">
      <NavBar v-if="$route.name !== 'event-show-frame'" />
      <vue-page-transition name="fade">
        <router-view v-if="$route.name == 'event-list'"/>
        <router-view v-else :key="$route.fullPath" />
      </vue-page-transition>
      <Footer v-if="$route.name !== 'event-show-frame'" />
      <base-login-pop-up />
    </main>
  </div>
</template>

<script>
import CovidNotice from '@/components/CovidNotice'
import NavBar from '@/components/NavBar.vue'
import LoginRegisterMobile from '@/components/LoginRegisterMobile'
import Footer from '@/components/Footer.vue'
import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)
Vue.use(require('vue-moment'))
export default {
  components: {
    NavBar,
    LoginRegisterMobile,
    Footer,
    CovidNotice
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700|Titillium+Web:300,400,600,700,900&display=swap');
// @import 'src/assets/fonts/fonts.scss';
@import 'src/assets/scss/variable';
// @import url('https://cdn.bootcss.com/select2/4.0.0/css/select2.css');
@import 'node_modules/bootstrap/scss/bootstrap.scss';
// @import url('https://select2.github.io/select2-bootstrap-theme/css/select2-bootstrap.css');
@import url('https://pro.fontawesome.com/releases/v5.12.1/css/all.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/css/flag-icon.min.css');
@import 'src/assets/scss/mixin';
@import 'src/assets/scss/common';
@import 'src/assets/scss/modal';
@import 'src/assets/scss/header';
@import 'src/assets/scss/footer';
@import 'src/assets/scss/home';
@import 'src/assets/scss/event';
@import 'src/assets/scss/about';
@import 'src/assets/scss/blog';
@import 'src/assets/scss/pastexperience';
@import 'src/assets/scss/competitions';
@import 'src/assets/scss/loginsignup';
@import 'src/assets/scss/miscellaneous';
</style>
