<template>
  <div class="container-fluid login-signup-wrapper">
    <div class="row">
      <div class="container">
        <div class="backtohomepage">
          <router-link
            :to="{ name: 'page-login' }"
            class="align-items-left float-left"
          >
            <span>
              <i class="fal fa-angle-left"></i>
            </span>
            <span>Already have an account?</span>
          </router-link>
          <router-link
            :to="{ name: 'event-list' }"
            class="align-items-right float-right d-none d-md-block"
          >
            <span>
              <i class="fal fa-angle-left"></i>
            </span>
            <span>Back to home page</span>
          </router-link>
        </div>
        <div class="stepreg">
          <div class="row">
            <div class="col-md-7">
              <img src="images/reg-small.png" class="img-fluid" />
            </div>
            <div class="col-md-5">
              <div class="right-side">
                <form>
                  <div v-if="step === 1">
                    <ValidationObserver v-slot="{ invalid }">
                      <h2>Your Details</h2>
                      <p>Register an account to get these perks:</p>
                      <div class="col-12">
                        <ul class="perks">
                          <li>
                            <i class="fa fa-check mr-2"></i>
                            Exclusive members only offers.
                          </li>
                          <li>
                            <i class="fa fa-check mr-2"></i>
                            Invitations to exclusive members.
                          </li>
                          <li>
                            <i class="fa fa-check mr-2"></i>
                            Build and share your bucket-list.
                          </li>
                        </ul>
                      </div>
                      <div class="form-group">
                        <label for="name" class="control-label">Name</label>
                        <ValidationProvider
                          name="Name"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <input
                            type="text"
                            id="name"
                            class="form-control"
                            required
                            name="name"
                            v-model="formData.name"
                          />
                          <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="email" class="control-label"
                          >Email Address</label
                        >
                        <ValidationProvider
                          name="E-mail"
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <input
                            type="email"
                            id="email"
                            class="form-control"
                            name="email"
                            v-model="formData.email"
                          />
                          <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <div class="form-group">
                        <label for="password" class="control-label"
                          >Password</label
                        >
                        <ValidationProvider
                          name="Password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            name="password"
                            v-model="formData.password"
                          />
                          <span>{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>

                      <button
                        @click.prevent="next()"
                        class="btn btn-secondary "
                        :disabled="invalid"
                      >
                        Next
                      </button>
                    </ValidationObserver>
                  </div>

                  <div v-if="step === 2">
                    <h2>Billing Summary</h2>
                    <div class="item-table">
                      <div class="row items">
                        <div class="col-9">
                          <p>Price</p>
                        </div>
                        <div class="col-3 text-right">
                          <p><b>$69.00</b></p>
                        </div>
                      </div>
                      <div class="row items">
                        <div class="col-9">
                          <p>Discount</p>
                        </div>
                        <div class="col-3 text-right">
                          <p><b>$0.00</b></p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <hr class="dashed mt-0" />
                        </div>
                      </div>
                      <div class="row totals">
                        <div class="col-9">
                          <p>Amount to be paid</p>
                        </div>
                        <div class="col-3 text-right">
                          <p><b>$69.00</b></p>
                        </div>
                      </div>
                    </div>

                    <div class="price">
                      <div class="row">
                        <div class="col-9">
                          <p class="bigger"><b>12 Months Membership</b></p>
                        </div>
                        <div class="col-3 text-right">
                          <p class="bigger"><b>$69.00</b></p>
                        </div>
                        <div class="col-6">
                          <p>Billed Annually</p>
                        </div>
                        <div class="col-6 text-right">
                          <p>To be paid now</p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <h2 class="mt-4">Select a Payment Method</h2>
                      </div>

                      <div class="col-12">
                        <button
                          type="button"
                          class="btn btn-checkout"
                          @click="payhandler"
                          v-if="!this.payStatus"
                          :disabled="this.processing"
                        >
                          Checkout.com
                        </button>
                        <div class="alert alert-success" role="alert" v-else>
                          Payment completed successfully
                        </div>
                      </div>
                      <div class="col-12 mb-4"></div>
                    </div>
                    <button
                      @click.prevent="prev()"
                      class="btn btn-secondary mr-2"
                      :disabled="this.payStatus"
                    >
                      Previous
                    </button>
                    <button
                      @click.prevent="next()"
                      class="btn btn-secondary"
                      :disabled="!this.payStatus"
                    >
                      Next
                    </button>
                  </div>

                  <div v-if="step === 3">
                    <h2>Registration complete</h2>

                    <div class="final">
                      <p>
                        Thank you for your payment, your account has now been
                        activated. Please continue to login below.
                      </p>
                      <!-- <button @click.prevent="prev()">Previous</button> -->
                      <button
                      type="button"
                        class="btn btn-primary"
                        @click="$router.push({ name: 'event-list' })"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- 
          <br /><br />Debug: {{ formData }} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { authProvider } from '../mixins/authProvider'
import metaInfoMixin from '../mixins/metaInfo'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} can not be empty.'
})

extend('email', {
  ...email,
  message: '{_field_} should be an email.'
})

class Errors {
  constructor() {
    this.errors = {}
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  record(errors) {
    this.errors = errors
    console.log(this.errors)
  }

  clear(field) {
    delete this.errors[field]
  }
}
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [authProvider, metaInfoMixin],
  created() {
    // const externalScript = document.createElement('script')
    // externalScript.setAttribute('src', 'https://cdn.checkout.com/sandbox/js/checkout.js')
    // document.head.appendChild(externalScript)
  },
  mounted() {
    const externalScript = document.createElement('script')
    externalScript.setAttribute(
      'src',
      'https://cdn.checkout.com/js/checkout.js'
    )
    document.head.appendChild(externalScript)
  },
  methods: {
    fireSwal() {
      this.processing = true
      this.$swal({
        title: 'Processing',
        html: '',
        timerProgressBar: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        // toast: true,
        // position: 'top-right',
        onBeforeOpen: () => {
          this.$swal.showLoading()
        }
      })
      // setTimeout(() => {

      // },5000)
    },
    payhandler() {
      var count = 1
      window.Checkout.configure({
        publicKey: 'pk_bf0f1c8b-5137-4118-b415-330a28f72884',
        customerEmail: this.formData.email,
        value: 6900,
        currency: 'USD',
        //payButtonSelector: '#chkoutbtn',
        paymentMode: 'cards',
        cardFormMode: 'cardTokenisation',
        cardTokenised: event => {
          this.formData.cardId = btoa(event.data.cardToken) //creates a base-64 encoded
          if (count == 1) {
            this.submit()
          }
          count++
          console.log(event.data.cardToken)
        },
        cardTokenisationFailed: () => {
          this.$swal({
            title: 'Error!',
            text: 'Incorrect card details',
            icon: 'error',
            target: '#modal-alert',
            // toast: true,
            // position: 'top-right',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px'
          })
        }
      })
      window.Checkout.open()
    },
    ...mapActions({
      socialLogin: 'auth/socialLogin'
    }),
    submit() {
      this.fireSwal()
      axios
        .post('/registerUser', this.formData)
        .then(() => {
          this.$swal.close()
          this.processing = false
          this.$swal({
            title: 'Success!',
            text: 'Payment completed successfully.',
            icon: 'success',
            target: '#modal-alert',
            // toast: true,
            // position: 'top-right',
            timer: 2200,
            timerProgressBar: true,
            padding: '15px'
          })
          this.payStatus = true
        })
        .catch(error => {
          this.$swal.close()
          this.processing = false
          console.log('There was an error:', error.response)
          this.$swal({
            title: 'Error!',
            text: 'Payment Failed : ' + error.response.data.error,
            icon: 'error',
            confirmButtonText: 'Try Again',
            target: '#modal-alert',
            // toast: true,
            // position: 'top-end',
            timer: 5000,
            timerProgressBar: true,
            padding: '15px',
            showConfirmButton: false
          })
        })
    },
    onSuccess() {
      this.$swal({
        title: 'Check your emails',
        text:
          'We have sent an email to ' +
          this.formData.email +
          '. Please check it to confirm your account.',
        icon: 'success',
        confirmButtonText: 'Close',
        // toast: false,
        // position: 'top-end',
        timer: 6000,
        timerProgressBar: true,
        padding: '15px'
        // showConfirmButton: false
      })
      //this.$ga.event('Tracking', 'signup', 'click')
    },
    validateUserEmail() {
      const form = {}
      form.email = this.formData.email
      axios
        .post('/validate-user-email', form)
        .then(() => {
          this.step++
        })
        .catch(error => {
          // console.log('There was an error:', error.response)
          this.$swal({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'This email is already registered with us.',
            target: '#modal-alert',
            // toast: true,
            timer: 5000,
            timerProgressBar: true,
            // position: 'top-end',
            padding: '15px',
            showConfirmButton: false
          })
        })
        .catch(error => this.errors.record(error.response.data['errors']))
    },
    prev() {
      this.step--
    },
    next() {
      if (this.step === 1) {
        this.validateUserEmail()
      } else {
        this.step++
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        cardId: ''
      },
      step: 1,
      errors: new Errors(),
      payStatus: false,
      processing: false
    }
  },
  created() {
    this.setMetaInfo({
      title: 'Register',
      desc: '',
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped></style>
