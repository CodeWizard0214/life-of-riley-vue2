<template>
  <div class="mobile-navbar ">
    <div
      class="mobile-navbar-header d-flex flex-row align-items-center justify-content-center"
    >
      Menu
    </div>
    <div class="mobile-navbar-menu d-flex flex-column">
      <router-link
        class="mobile-navbar-menu-item"
        @click.native="toggleMobileMenu"
        :to="{ name: 'event-list' }"
        >Experiences</router-link
      >
      <router-link
        class="mobile-navbar-menu-item"
        @click.native="toggleMobileMenu"
        :to="{ name: 'page-about' }"
        >About Us</router-link
      >
      <template v-if="authenticated">
        <router-link
          class="mobile-navbar-menu-item"
          :to="{ name: 'page-bucket-list' }"
          @click.native="toggleMobileMenu"
          >Bucket List</router-link
        >
      </template>
      <router-link
        class="mobile-navbar-menu-item"
        @click.native="toggleMobileMenu"
        :to="{ name: 'page-blog' }"
        >Magazine</router-link
      >
      <router-link
        class="mobile-navbar-menu-item"
        @click.native="toggleMobileMenu"
        :to="{ name: 'page-contact' }"
        >Contact</router-link
      >
      <template v-if="authenticated">
        <router-link
          class="mobile-navbar-menu-item"
          @click.native="toggleMobileMenu"
          :to="{ name: 'page-inbox' }"
        >
          <span>Inbox</span>
          <span class="badge badge-light">{{ inboxCount }}</span>
          <span class="sr-only">unread messages</span>
        </router-link>
      </template>
    </div>
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

    /*toggleMenu() {
				this.hover = !this.hover
			},
			toggleMobileMenu() {
				this.collapsed2 = !this.collapsed2
			},
			toggleMobileUserMenu() {
				this.collapsed = !this.collapsed
			},
			closeNav() {
				alert('closing nav')
			},*/
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
