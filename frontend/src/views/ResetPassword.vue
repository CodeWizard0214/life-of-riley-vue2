<template>
  <div class="container-fluid login-signup-wrapper">
    <div class="row">
      <div class="container">
        <div class="backtohomepage d-flex flex-row justify-content-end">
          <router-link
            :to="{ name: 'event-list' }"
            class="d-flex flex-row align-items-center"
          >
            <span>
              <i class="fal fa-angle-left"></i>
            </span>
            <span>Back to home page</span>
          </router-link>
        </div>
        <div class="loginsignup d-flex flex-wrap">
          <div
            class="
              loginsignup-banner
              d-flex
              flex-column
              justify-content-between
            "
            style="background-image: url(/images/member-benefits-bg.jpg)"
          >
            <div class="logo">
              <img
                alt="A Experiential Star"
                class="img-fluid d-block"
                :src="`/images/logo.svg`"
              />
            </div>
            <div class="member-benefits">
              <h5>Member benefits</h5>
              <div class="benefits-group d-flex flex-column">
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span>
                    Exclusive members only offers from your chosen experiences.
                  </span>
                </div>
                <div class="benefits-item d-flex flex-row align-items-start">
                  <span>
                    <i class="fal fa-check"></i>
                  </span>
                  <span
                    >Invitations to exclusive members only experiences.</span
                  >
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
          <div
            class="
              loginsignup-content
              d-flex
              flex-column
              justify-content-center
            "
          >
            <h2>Reset your Password</h2>
            <!-- <p>Login with your account</p> -->
            <ValidationObserver ref="resetPassword" v-slot="{ handleSubmit }">
              <form
                class="loginsignup-form"
                id="login-modal"
                @submit.prevent="handleSubmit(submit)"
              >
                <div class="form-group">
                  <label for="Email" class="control-label">Email Address</label>
                  <input
                    type="email"
                    id="Email"
                    class="form-control"
                    name="Email"
                    v-model="form.email"
                    readonly
                  />
                </div>
                <ValidationProvider
                  rules="required|min:6"
                  v-slot="{ errors }"
                  vid="confirm"
                >
                  <div class="form-group">
                    <label for="password" class="control-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      name="password"
                      v-model="form.password"
                    />
                    <span v-if="errors.length" class="error-message">{{
                      errors[0]
                    }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="Confirm Password"
                  rules="required|confirmed:confirm"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <label for="password_confirmation" class="control-label"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      id="password_confirmation"
                      class="form-control"
                      name="password_confirmation"
                      v-model="form.password_confirmation"
                    />
                    <span v-if="errors.length" class="error-message">{{
                      errors[0]
                    }}</span>
                  </div>
                </ValidationProvider>
                <div class="form-group d-flex flex-row">
                  <button
                    type="submit"
                    role="button"
                    class="submit-button button"
                    :disabled="loading"
                  >
                    <span v-if="!loading"> Reset Password </span>
                    <span v-else
                      ><em class="fas fa-circle-notch fa-spin"></em>
                    </span>
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import metaInfoMixin from '../mixins/metaInfo'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, confirmed, min } from 'vee-validate/dist/rules'

extend('email', email)
extend('required', {
  ...required,
  message: 'This {_field_} field is required',
})
extend('confirmed', {
  ...confirmed,
  message: 'The confirm password does not match',
})
extend(
  'min',
  {
    ...min,
    message: 'The {_field_} must be of length {length}',
  },
  {
    paramNames: ['length'],
  }
)

export default {
  mixins: [metaInfoMixin],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true
      EventService.resetPassword(this.form)
        .then((res) => {
          this.loading = false
          this.$swal({
            title: 'Success!',
            text: res?.data?.message,
            icon: 'success',
            toast: true,
            position: 'top-right',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px',
          })
          this.$router.push('/login')
        })
        .catch((error) => {
          this.loading = false
          if (error.response?.status === 422) {
          const errorKey = Object.keys(error.response?.data?.errors)[0]
          this.$swal({
            title: 'Error!',
            text:
              `${error.response?.data?.message} ${error.response?.data?.errors?.[errorKey][0]}`,
            icon: 'error',
            toast: true,
            position: 'top-right',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px',
          })
        } else {
          this.$swal({
            title: 'Error!',
            text:
              error?.response?.data?.message ||
              'Something went wrong, Please try again!!',
            icon: 'error',
            toast: true,
            position: 'top-right',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px',
          })
        }
          
        })
   
    },
  },

  created() {
    this.form.email = this.$route?.query?.email
      ? atob(this.$route?.query?.email)
      : null
    this.form.token = this.$route.params.token
    this.setMetaInfo({
      title: 'Reset Password',
      desc: '',
      keywords: '',
      img: '',
      url: window.location.href,
    })
  },
}
</script>

<style lang="scss" scoped></style>
