export const authProvider = {
    methods: {
        authProvider(provider) {
            const self = this
            this.$auth
                .authenticate(provider)
                .then(response => {					
                    self
                        .socialLogin({ provider, response })
                        .then(() => {
                            if(!this.$store.state.auth.showLoginModal) {
                                this.$router.replace({
                                    name: 'page-bucket-list'
                                })
                            }
                            this.$store.commit('auth/SET_LOGIN_MODAL', false)
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
							this.$ga.event('Tracking', 'signup', 'facebook')
                        })
                        .catch(error => {
                            if (error.response.status === 422) {
                                this.$swal({
                                    title: 'Error!',
                                    text: error.response.data.message,
                                    icon: 'error',
                                    // confirmButtonText: 'Try Again',
                                    toast: true,
                                    position: 'top-right',
                                    target:this.$store.state.auth.showLoginModal? '#modal-alert':'',
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
                                    target:this.$store.state.auth.showLoginModal? '#modal-alert':'',
                                    position: 'top-right',
                                    timer: 2200,
                                    timerProgressBar: true,
                                    padding: '15px'
                                    // showConfirmButton: false
                                })
                            }
                        })
                })
                .catch(() => {
                    this.$swal({
                        title: 'Error!',
                        text: 'Something Went Wrong, Please try again',
                        icon: 'error',
                        target:this.$store.state.auth.showLoginModal? '#modal-alert':'',
                        // confirmButtonText: 'Try Again',
                        toast: true,
                        position: 'top-right',
                        timer: 2200,
                        timerProgressBar: true,
                        padding: '15px'
                        // showConfirmButton: false
                    })
                })
        }
    }
}