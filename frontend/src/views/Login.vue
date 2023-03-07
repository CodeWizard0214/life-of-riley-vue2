<template>
  <div class="container-fluid login-signup-wrapper">
    <div class="row">
      <div class="container">
        <div class="backtohomepage d-flex flex-row justify-content-end">
          <router-link :to="{ name: 'event-list' }" class="d-flex flex-row align-items-center">
            <span>
              <i class="fal fa-angle-left"></i>
            </span>
            <span>Back to home page</span>
          </router-link>
        </div>
        <div class="loginsignup d-flex flex-wrap">
          <div
            class="loginsignup-banner d-flex flex-column justify-content-between"
            style="background-image: url(/images/member-benefits-bg.jpg);"
          >
            <div class="logo">
              <img alt="A Experiential Star" class="img-fluid d-block" src="/images/logo.svg" />
            </div>
            <div class="member-benefits">
              <h5>Member benefits</h5>
              <div class="benefits-group d-flex flex-column">
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span>Exclusive members only offers from your chosen experiences.</span>
                </div>
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span>Invitations to exclusive members only experiences.</span>
                </div>
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span>Build and share your bucket-list.</span>
                </div>
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span>No signup fee or contract.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="loginsignup-content d-flex flex-column justify-content-center">
            <h2>Members Login</h2>
            <p>Login with your account</p>
            <form class="loginsignup-form" id="login-modal" @submit.prevent="submit">
              <div class="form-group">
                <label for="email" class="control-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  name="email"
                  v-model="form.email"
                />
              </div>
              <div class="form-group">
                <label for="password" class="control-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="form.password"
                />
              </div>
              <div class="form-group d-flex flex-row">
                <button type="submit" role="button" class="submit-button button">Login</button>

                <router-link
                  :to="{ name: 'page-register' }"
                  class="form-link-button button d-flex flex-row align-items-center justify-content-center"
                >Register</router-link>
              </div>
            </form>
            <div class="d-flex flex-row">
              <router-link
                class="forgotpassword"
                :to="{ name: 'page-forgotpw' }"
              >Forgotten your password?</router-link>
            </div>
            <p>Or you can signup with one click:</p>
            <div class="d-flex flex-column">
              <a
                href="javascript:void(0);"
                @click="authProvider('facebook')"
                class="channel-button channel-button-facebook"
              >Login with facebook</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EventService from '@/services/EventService.js'
import { authProvider } from '../mixins/authProvider'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [authProvider, metaInfoMixin],
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      confirm_code: this.$route.query.code,
      confirmed_user: []
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
      socialLogin: 'auth/socialLogin'
    }),
    submit() {
      this.signIn(this.form)
        .then(() => {
          this.$router.replace({
            name: 'page-bucket-list'
          })
          this.$swal({
            // title: 'Error!',
            text: 'Welcome back, ' + this.user.name,
            // icon: 'success',
            // confirmButtonText: 'Try Again',
            toast: true,
            position: 'top-end',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px',
            showConfirmButton: false
          })
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.$swal({
              title: 'Error!',
              text: error.response.data.message,
              icon: 'error',
              // confirmButtonText: 'Try Again',
              toast: true,
              position: 'top',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
              // showConfirmButton: false
            })
          } else {
            this.$swal({
              title: 'Error!',
              text: 'Incorrect login details',
              icon: 'error',
              // confirmButtonText: 'Try Again',
              toast: true,
              position: 'top',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
              // showConfirmButton: false
            })
          }
        })
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created() {
    if (this.$route.query.code) {
      EventService.getUserByCode(this.$route.query.code)
        .then(response => {
          // console.log(response.data)
          this.confirmed_user = response.data
          this.$swal({
            title: 'Success!',
            text:
              'You have been confirmed ' +
              this.confirmed_user.name +
              '. You can now login.',
            icon: 'success',
            confirmButtonText: 'Close',
            timer: 3500,
            timerProgressBar: true,
            padding: '15px'
            // showConfirmButton: false
          })
		  this.$ga.event('Tracking', 'signup', 'success')
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
    this.setMetaInfo({
      title: 'Login',
      desc: '',
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped></style>
