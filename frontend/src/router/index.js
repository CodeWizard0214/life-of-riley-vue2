import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
// import EventShow from '@/views/EventShow.vue'
// import EventPast from '@/views/EventPast.vue'
// import BlogDetail from '@/views/BlogDetail.vue'
// import AboutUs from '@/views/AboutUs.vue'
// import Blog from '@/views/Blog.vue'
// import Login from '@/views/Login.vue'
// import Register from '@/views/Register.vue'
// import BucketList from '@/views/BucketList.vue'
// import Terms from '@/views/Terms.vue'
// import Cookie from '@/views/Cookie.vue'
// import Privacy from '@/views/Privacy.vue'
// import Search from '@/views/Search.vue'
// import Contact from '@/views/Contact.vue'
// import Inbox from '@/views/Inbox.vue'
// import ForgotPassword from '@/views/ForgotPassword.vue'
// import NotFound from '@/views/404.vue'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import store from '@/store'
import VueMeta from 'vue-meta'

const requireComponent = require.context(
  // The relative path of the components folder
  '../components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.use(VueRouter)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

function loadView(view) {
  return () =>
    import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const routes = [{
    path: '/',
    name: 'event-list',
    component: EventList
    // component: loadView('EventList')
  },
  {
    path: '/experiences/:slug',
    name: 'event-show',
    // component: EventShow,
    component: loadView('EventShow'),
    props: true
  },
  {
    path: '/experiences/:slug/frame',
    name: 'event-show-frame',
    // component: EventShow,
    component: loadView('EventShowFrame'),
    props: true
  },
  {
    path: '/past-experiences',
    name: 'event-past',
    // component: EventPast
    component: loadView('EventPast')
  },
  {
    path: '/about-us',
    name: 'page-about',
    // component: AboutUs
    component: loadView('AboutUs')
  },
  {
    path: '/magazine',
    name: 'page-blog',
    // component: Blog
    component: loadView('Blog')
  },
  {
    path: '/blog',
    redirect: '/magazine'
    // component: Blog
  },
  {
    path: '/magazine/:slug',
    name: 'page-blog-detail',
    // component: BlogDetail,
    component: loadView('BlogDetail'),
    props: true
  },
  {
    path: '/login',
    name: 'page-login',
    // component: Login
    component: loadView('Login')
  },
  {
    path: '/forgot-password',
    name: 'page-forgotpw',
    // component: ForgotPassword
    component: loadView('ForgotPassword')
  },
  {
    path: '/reset-password/:token',
    name: 'page-resetpw',
    // component: ResetPassword
    component: loadView('ResetPassword')
  },
  {
    path: '/register',
    name: 'page-register',
    // component: Register
    component: loadView('Register')
  },
  {
    path: '/terms-and-conditions',
    name: 'page-terms',
    // component: Terms
    component: loadView('Terms')
  },
  {
    path: '/cookie-policy',
    name: 'page-cookie',
    // component: Cookie
    component: loadView('Cookie')
  },
  {
    path: '/privacy-policy',
    name: 'page-privacy',
    // component: Privacy
    component: loadView('Privacy')
  },
  {
    path: '/search',
    name: 'page-search',
    // component: Search
    component: loadView('Search')
  },
  {
    path: '/contact',
    name: 'page-contact',
    // component: Contact,
    component: loadView('Contact')
  },
  {
    path: '/ga-opt-out',
    name: 'page-ga-opt-out',
    // component: Contact,
    component: loadView('OptOut')
  },
  {
    path: '/provider-signup',
    name: 'page-provider-signup',
    // component: Contact,
    component: loadView('ProviderContact')
  },
  {
    path: '/bucket-list',
    name: 'page-bucket-list',
    // component: BucketList,
    component: loadView('BucketList'),
    meta: {
      requiresAuthentication: true
    }

    // beforeEnter: (to, from, next) => {
    //   if (!store.getters['auth/authenticated']) {
    //     return next({
    //       name: 'page-login'
    //     })
    //   }
    //   next()
    // }
  },
  {
    path: '/my-account',
    name: 'page-account',
    // component: BucketList,
    component: loadView('Account'),
    meta: {
      requiresAuthentication: true
    }

    // beforeEnter: (to, from, next) => {
    //   if (!store.getters['auth/authenticated']) {
    //     return next({
    //       name: 'page-login'
    //     })
    //   }
    //   next()
    // }
  },
  {
    path: '/inbox',
    name: 'page-inbox',
    // component: Inbox,
    component: loadView('Inbox'),
    meta: {
      requiresAuthentication: true
    }
    // beforeEnter: (to, from, next) => {
    //   if (!store.getters['auth/authenticated']) {
    //     return next({
    //       name: 'page-login'
    //     })
    //   }
    //   next()
    // }
  },
  {
    path: '/inbox/:id',
    name: 'page-inbox-detail',
    // component: Inbox,
    component: loadView('Inbox'),
    props: true,
    meta: {
      requiresAuthentication: true
    }
    // beforeEnter: (to, from, next) => {
    //   if (!store.getters['auth/authenticated']) {
    //     return next({
    //       name: 'page-login'
    //     })
    //   }
    //   next()
    // }
  },
  {
    path: '*',
    name: '404',
    // component: NotFound
    component: loadView('404')
  },
  {
    path: '/signin-with-socialmedia/callback',
    component: {
      template: '<div class="auth-component"></div>'
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (store.getters['auth/authenticated']) {
      next()
    } else {
      next({
        name: 'page-login'
      })
    }
  } else {
    next()
  }
})

export default router