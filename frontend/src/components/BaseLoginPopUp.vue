<template>
  <transition name="modal">
    <div
      @click.self="closeModal"
      id="modal-alert"
      class="modal-mask"
      v-if="this.$store.state.auth.showLoginModal"
    >
      <div class="modal-wrapper" @click.self="closeModal">
        <div v-if="isloading" class="loader">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid login-signup-wrapper">
                <div class="row">
                  <div class="container">
                    <div class="loginsignup d-flex flex-wrap">
                      <div
                        class="loginsignup-content d-flex flex-column justify-content-center"
                      >
                        <h2>
                          Members Login
                          <span v-on:click="closeModal">X</span>
                        </h2>
                        <p>Login with your account</p>
                        <form
                          class="loginsignup-form"
                          id="login-modal"
                          @submit.prevent="submit"
                        >
                          <div class="form-group">
                            <label for="email" class="control-label"
                              >Email Address</label
                            >
                            <input
                              type="email"
                              id="email"
                              class="form-control"
                              name="email"
                              v-model="form.email"
                            />
                          </div>
                          <div class="form-group">
                            <label for="password" class="control-label"
                              >Password</label
                            >
                            <input
                              type="password"
                              class="form-control"
                              id="password"
                              name="password"
                              v-model="form.password"
                            />
                          </div>
                          <div class="form-group d-flex flex-row">
                            <button
                              type="submit"
                              role="button"
                              class="submit-button button"
                            >
                              Login
                            </button>

                            <router-link
                              @click.native="closeModal"
                              :to="{ name: 'page-register' }"
                              class="form-link-button button d-flex flex-row align-items-center justify-content-center"
                              >Register</router-link
                            >
                          </div>
                        </form>
                        <div class="d-flex flex-row">
                          <router-link
                            @click.native="closeModal"
                            class="forgotpassword"
                            :to="{ name: 'page-forgotpw' }"
                            >Forgotten your password?</router-link
                          >
                        </div>
                        <p>Or you can signup with one click:</p>
                        <div class="d-flex flex-column">
                          <a
                            href="javascript:void(0);"
                            @click="authProvider('facebook')"
                            class="channel-button channel-button-facebook"
                            >Login with facebook</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Payment popup for non membership users -->
    <div
      @click.self="closeModal"
      id="modal-alert"
      class="modal-mask"
      v-else-if="showPaymentPopup"
    >
      <div class="modal-wrapper" @click.self="closeModal">
        <div v-if="isloading" class="loader">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid login-signup-wrapper">
                <div class="row">
                  <div class="container">
                    <div class="loginsignup d-flex flex-wrap">
                      <div
                        class="loginsignup-content d-flex flex-column justify-content-center"
                      >
                        <h2>Membership Expired</h2>
                        <button type="button" class="btn btn-primary" 
                        @click="payhandler" v-if="this.$store.state.auth.user.membership_status === '' || !this.$store.state.auth.user.membership_status.is_cardId_available">Complete with Checkout.com</button
                      >
                      <button type="button" class="btn btn-primary" 
                        @click="directPay" v-else>Pay your membership amount</button
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { authProvider } from '../mixins/authProvider'
import { addToBucketList } from '../mixins/addToBucketList'
import { removeFromBucketList } from '../mixins/removeFromBucketList'

export default {
  mixins: [authProvider, addToBucketList, removeFromBucketList],
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      isloading: false,
      paymentProcess: false,
      cardTokenised: false     
    }
  },
   mounted() {
    //  if(this.$store.state.auth.user && !this.$store.state.auth.user.membership_status.status){
    const externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://cdn.checkout.com/js/checkout.js')
    document.head.appendChild(externalScript)   
    //  }
  },
  methods: {
    fireSwal(){                
            this.$swal({
              title: 'Processing',
              html: '',
              timerProgressBar: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              toast: true,
              position: 'top-right',
              onBeforeOpen: () => {
                this.$swal.showLoading()                
              },
            })
            // setTimeout(() => {
                
            // },5000)
            },
    ...mapMutations({
      setUser: 'auth/SET_USER',
    }),
    ...mapActions({
      signIn: 'auth/signIn',
      socialLogin: 'auth/socialLogin',
      fetchBucketListEvents: 'bucketlist/fetchBucketListEvents'
    }),
    payhandler(){
      var count = 1;
      this.paymentProcess = true;
      window.Checkout.configure({
      publicKey: 'pk_bf0f1c8b-5137-4118-b415-330a28f72884',
      customerEmail: this.user.email,
      value: 6900,
      currency: 'USD',
      //payButtonSelector: '#chkoutbtn',
      paymentMode: 'cards',
      cardFormMode: 'cardTokenisation',
      lightboxDeactivated:() =>{
        if(this.cardTokenised){
            this.paymentProcess = true
        }else{
          this.paymentProcess = false
        }
      },
      cardTokenised:  (event) => {
        this.cardTokenised = true
        var cardToken = btoa(event.data.cardToken)  //creates a base-64 encoded 
        if(count == 1){
          this.payWithCardToken(cardToken)
        }
        count++
      },
      cardTokenisationFailed:  () => {
        this.cardTokenised = false
        this.$swal({
              title: 'Error!',
              text: 'Incorrect card details',
              icon: 'error',
              target: '#modal-alert',
              toast: true,
              position: 'top-right',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
            })
      }
      
    });
    window.Checkout.open();
    
    },
    directPay(){
      this.paymentProcess = true
      this.fireSwal()
      axios
        .get('/payWithCardId')
        .then(() => {
          this.$swal.close()
          this.$swal({
              title: 'Success!',
              text: 'Payment completed successfully.',
              icon: 'success',
              target: '#modal-alert',
              toast: true,
              position: 'top-right',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
            })
            this.paymentProcess = true
            const userdata = {...this.user};
            userdata.membership_status.status = true;
            this.setUser(userdata);
        })
        .catch(error => {
          this.$swal.close()
          this.paymentProcess = false
           console.log('There was an error:', error.response)
          this.$swal({
            title: 'Error!',
            text: 'Payment Failed : ' + error.response.data.error,
            icon: 'error',
            confirmButtonText: 'Try Again',
            // toast: true,
            // position: 'top-end',
            timer: 5000,
            timerProgressBar: true,
            padding: '15px',
            showConfirmButton: false
          })
        })
    },
    payWithCardToken(token){
      this.fireSwal()
      const payFormData = {}
      payFormData.token = token
      payFormData.email = this.user.email
      axios
        .post('/payWithToken', payFormData)
        .then(() => {
          this.$swal.close()
          this.$swal({
              title: 'Success!',
              text: 'Payment completed successfully.',
              icon: 'success',
              target: '#modal-alert',
              toast: true,
              position: 'top-right',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
            })
            this.paymentProcess = true
            const userdata = {...this.user};
            userdata.membership_status.status = true;
            this.setUser(userdata);
        })
        .catch(error => {
          this.$swal.close()
           console.log('There was an error:', error.response)
          this.$swal({
            title: 'Error!',
            text: 'Payment Failed : ' + error.response.data.error,
            icon: 'error',
            confirmButtonText: 'Try Again',
            toast: true,
            position: 'top-end',
            timer: 5000,
            timerProgressBar: true,
            padding: '15px',
            showConfirmButton: false,
          })          
          this.paymentProcess = false
        })
    },
    submit() {
      this.isloading = true
      this.signIn(this.form)
        .then(() => {
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
          this.fetchBucketListEvents().then(() => {
            if (this.failedEvent) {
              const failedEvent = {
                ...this.failedEvent
              }
              if (failedEvent.type === 'add') {
                this.addToBucketList(failedEvent.event)
              } else {
                this.removeFromBucketList(failedEvent.event)
              }
            }
            this.isloading = false
            this.$store.commit('auth/SET_LOGIN_MODAL', false)
            this.form.email = ''
            this.form.password = ''
            this.showModal = false
            this.setFailedEvent('')
            if (
              this.$route.name === 'page-register' ||
              this.$route.name === 'page-login'
            ) {
              this.$router.replace({
                name: 'page-bucket-list'
              })
            }
          })
        })
        .catch(error => {
          this.isloading = false
          // this.$store.commit('auth/SET_LOGIN_MODAL', false)
          if (error.response.status === 422) {
            this.$swal({
              title: 'Error!',
              text: error.response.data.message,
              icon: 'error',
              // confirmButtonText: 'Try Again',
              toast: true,
              position: 'top-right',
              target: '#modal-alert',
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
              target: '#modal-alert',
              // confirmButtonText: 'Try Again',
              toast: true,
              position: 'top-right',
              timer: 2200,
              timerProgressBar: true,
              padding: '15px'
              // showConfirmButton: false
            })
          }
        })
    },
    closeModal() {
      this.$store.commit('auth/SET_LOGIN_MODAL', false)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      failedEvent: 'bucketlist/getFailedEvent'
    }),
    showPaymentPopup(){
      if(this.$store.state.auth.user !== null && !this.$store.state.auth.user.membership_status.status && !this.paymentProcess){
          return true
      } else if(this.$store.state.auth.user !== null && this.$store.state.auth.user.membership_status === '' && !this.paymentProcess){
        return true
      } else{
        return false
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 10s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.login-signup-wrapper {
  padding: 0;
}
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 1;
  background: #80808017;
}
.loader i {
  transform: translate(-50%, -50%);
  top: 50%;
  position: relative;
  font-size: 40px;
}

h2 span {
  float: right;
  color: #1d1d1d;
  font-size: 22px;
}
</style>
