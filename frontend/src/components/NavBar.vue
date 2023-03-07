<template>
  <div>
    <header class="fixed-top site-header">
      <div class="container-fluid main-menu">
        <div class="row">
          <div class="container">
            <div class="row">
              <nav class="navbar navbar-expand-md">
                <!-- Bars -->
                <button
                  class="navbar-toggler menu-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarMenu"
                  aria-controls="navbarMenu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  v-on:click="toggleMobileMenuV2"
                >
                  <span></span>
                </button>
                <!-- Bars -->

                <!-- Logo -->
                <router-link to="/" class="navbar-brand">
                  <img alt class="img-fluid d-block" src="/images/logo.svg" />
                </router-link>
                <!-- Logo -->

                <!-- Mobile User Menu Button -->
                <button
                  class="navbar-toggler navbar-usertoggler collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarUserMenu"
                  aria-controls="navbarUserMenu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  v-on:click="toggleMobileUserMenu"
                  :class="{ show: collapsed }"
                >
                  <i class="fas fa-user"></i>
                </button>
                <!-- Mobile User Menu Button -->

                <!-- Main Navigation -->
                <div class="collapse navbar-collapse" id="navbarMenu">
                  <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item">
                      <router-link
                        class="nav-link"
                        @click.native="toggleMobileMenu"
                        :to="{ name: 'event-list' }"
                        >Experiences</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link
                        class="nav-link"
                        @click.native="toggleMobileMenu"
                        :to="{ name: 'page-about' }"
                        >About Us</router-link
                      >
                    </li>
                    <!-- <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'event-past' }">Past Experiences</router-link>
                  </li>-->
                    <template v-if="authenticated">
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          :to="{ name: 'page-bucket-list' }"
                          @click.native="toggleMobileMenu"
                          >Bucket List</router-link
                        >
                      </li>
                    </template>
                    <li class="nav-item">
                      <router-link
                        class="nav-link"
                        @click.native="toggleMobileMenu"
                        :to="{ name: 'page-blog' }"
                        >Magazine</router-link
                      >
                    </li>
                    <li class="nav-item">
                      <router-link
                        class="nav-link"
                        @click.native="toggleMobileMenu"
                        :to="{ name: 'page-contact' }"
                        >Contact</router-link
                      >
                    </li>
                    <template v-if="authenticated">
                      <li class="nav-item">
                        <router-link
                          class="nav-link"
                          @click.native="toggleMobileMenu"
                          :to="{ name: 'page-inbox' }"
                        >
                          Inbox
                          <span class="badge badge-light">{{
                            inboxCount
                          }}</span>
                          <span class="sr-only">unread messages</span>
                        </router-link>
                      </li>
                    </template>
                    <li class="nav-item d-none d-md-block dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="javascript:void(0);"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        v-on:click="toggleMenu"
                        :class="{ show: hover }"
                      >
                        <i class="fas fa-user"></i>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        :class="{ show: hover }"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <template v-if="authenticated">
                          <router-link
                            :to="{ name: 'page-account' }"
                            class="dropdown-item"
                            @click="toggleMobileMenu"
                            >My Account</router-link
                          >
                          <li>
                            <a
                              href
                              @click.prevent="signOut"
                              @click="toggleMobileMenu"
                              class="dropdown-item"
                              >Logout</a
                            >
                          </li>
                        </template>
                        <template v-else>
                          <router-link
                            event=""
                            to="/b"
                            @click.native="toggleMenu(), openLoginModal()"
                            class="dropdown-item"
                            >Login</router-link
                          >
                          <router-link
                            :to="{ name: 'page-register' }"
                            @click.native="toggleMenu"
                            class="dropdown-item"
                            >Register</router-link
                          >
                        </template>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- Main Navigation -->




                <!-- User mobile menu -->
                <div
                  class="collapse navbar-collapse mobile-menu"
                  :class="{ show: collapsed }"
                  id="navbarUserMenu"
                >
                  <ul class="navbar-nav d-flex flex-row">
                    <template v-if="authenticated">
                      <li class="nav-item">
                        <a @click.prevent="signOut" class="nav-link">Logout</a>
                      </li>
                    </template>
                    <template v-else>
                      <li class="nav-item">
                        <router-link
                          event=""
                          to="/b"
                          @click.native="
                            toggleMobileUserMenu(), openLoginModal()
                          "
                          class="nav-link"
                          >Login</router-link
                        >
                      </li>
                      <li class="nav-item">
                        <router-link
                          :to="{ name: 'page-register' }"
                          @click.native="toggleMobileUserMenu"
                          class="nav-link"
                          >Register</router-link
                        >
                      </li>
                    </template>
                  </ul>
                </div>
                <!-- User mobile menu -->




                
              </nav>
            </div>
          </div>
        </div>
      </div>
      <!-- Main menu -->
    </header>
    <div class="mobile-navbar"
    :class="{ 'active-mobile-menu': collapsed3 }"
    >
      <div
        class="mobile-navbar-header d-flex flex-row align-items-center justify-content-center"
      >
        Menu
        <div class="close" @click="toggleMobileMenuV2">
          <i class="fal fa-times"></i>
        </div>
      </div>
      <div class="mobile-navbar-menu d-flex flex-column">
        <router-link
          class="mobile-navbar-menu-item"
          @click.native="toggleMobileMenuV2"
          :to="{ name: 'event-list' }"
          >Experiences</router-link
        >
        <router-link
          class="mobile-navbar-menu-item"
          @click.native="toggleMobileMenuV2"
          :to="{ name: 'page-about' }"
          >About Us</router-link
        >
        <template v-if="authenticated">
          <router-link
            class="mobile-navbar-menu-item"
            :to="{ name: 'page-bucket-list' }"
            @click.native="toggleMobileMenuV2"
            >Bucket List</router-link
          >
        </template>
        <router-link
          class="mobile-navbar-menu-item"
          @click.native="toggleMobileMenuV2"
          :to="{ name: 'page-blog' }"
          >Magazine</router-link
        >
        <router-link
          class="mobile-navbar-menu-item"
          @click.native="toggleMobileMenuV2"
          :to="{ name: 'page-contact' }"
          >Contact</router-link
        >
        <template v-if="authenticated">
          <router-link
            class="mobile-navbar-menu-item"
            @click.native="toggleMobileMenuV2"
            :to="{ name: 'page-inbox' }"
          >
            <span>Inbox</span>
            <span class="badge badge-light">{{ inboxCount }}</span>
            <span class="sr-only">unread messages</span>
          </router-link>
        </template>

      <template v-if="authenticated">
        <router-link
          :to="{ name: 'page-account' }"
          class="mobile-navbar-menu-item"
          @click="toggleMobileMenu"
          >My Account</router-link
        >
        <a class="mobile-navbar-menu-item"
            @click.prevent="signOut"
            >Logout</a>
            
        </template>
                    <template v-else>
                      <router-link
            class="mobile-navbar-menu-item"
            :to="{ name: 'page-bucket-list' }"
            @click.native="toggleMobileUserMenu(), openLoginModal()"
            >Login</router-link>
    <router-link
            class="mobile-navbar-menu-item"
            :to="{ name: 'page-register' }"
            >Register</router-link>
                      </template>

 
      </div>
    </div>
    <div class="mobilemenubackdrop" :class="{ 'active-backdrop': collapsed3 }" @click="toggleMobileMenuV2"></div>
  </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      hover: false,
      collapsed: false,
      collapsed2: false,
      collapsed3: false,
      inboxCount: ''
    }
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'event-list'
        })
        this.$swal({
          // title: 'Error!',
          text: 'You have been signed out. See you again soon!',
          // icon: 'success',
          // confirmButtonText: 'Try Again',
          toast: true,
          position: 'top-end',
          timer: 2200,
          timerProgressBar: true,
          padding: '15px',
          showConfirmButton: false
        })
        this.hover = !this.hover
      })
    },

    toggleMenu() {
      this.hover = !this.hover
    },
    toggleMobileMenu() {
      this.collapsed2 = !this.collapsed2
    },
    toggleMobileUserMenu() {
      this.collapsed = !this.collapsed
    },
    toggleMobileMenuV2() {
      this.collapsed3 = !this.collapsed3
    },
    closeNav() {
      alert('closing nav')
    },
    openLoginModal() {
      this.$store.commit('auth/SET_LOGIN_MODAL', true) 
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  created() {
    if (this.authenticated) {
      axios
        .get('/showUnreadCount/' + this.user.id)
        .then(response => {
          this.inboxCount = response.data
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  float: right;
  text-align: right;
  color: black;
  position: absolute;
  right: 20px;
}
</style>
