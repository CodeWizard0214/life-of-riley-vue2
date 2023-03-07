import {
    mapGetters
} from 'vuex'
import axios from 'axios'

export const eventActions = {
    props: {
        event: Object
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    },
    data() {
        return {
            transferModal: false,
            eventData: {
                event: this.event.id
            }
        }
    },
    methods: {
        toggleTransferModal() {
            this.transferModal = !this.transferModal
			this.$ga.event('Tracking', 'view_experience', 'click')
        },
        continueAsGuest(googleToken) {
            axios
                .post('/eventRedirectGuest', {
                    event_id: this.event.id,
                    user_id: null,
                    googleToken
                })
                .then((response) => {
                    let url = response.data
                    if (url.indexOf('http') === -1) {
                        url = `https://${url}`;
                    }
                    window.location.href = url;
                    // window.open(url, '_blank')
                    // this.$router.push({
                    //     name: 'event-show-frame',
                    //     params: { slug: this.event.slug }
                    // })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        eventExpired() {
            this.$swal({
                title: 'Event Expired!',
                text: 'This event has expired. Sign up or log in to be notified when it is active again!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Signup for free',
                cancelButtonText: 'Login',
                padding: '15px',
            }).then((result) => {
                if (result.value) {
                    window.location = '/register'
                } else(
                    window.location = '/login'
                )
            })
			this.$ga.event('Tracking', 'view_experience', 'click')
        },
        continueAsMember(googleToken) {
            axios
                .post('/eventRedirectMember', {
                    event_id: this.event.id,
                    user_id: this.user.id,
                    googleToken
                })
                .then((response) => {
                    // console.log(response)
                    // window.location = response.data
                    let url = response.data;
                    if (url.indexOf('http') === -1) {
                        url = `https://${url}`;
                    }
                    // window.open(url, '_blank')
                    window.location.href = url;
                    // this.$router.push({
                    //     name: 'event-show-frame',
                    //     params: { slug: this.event.slug }
                    // })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        async recaptcha(isGuest=false) {
            // (optional) Wait until recaptcha has been loaded.
            await this.$recaptchaLoaded()
            // Execute reCAPTCHA with action "login".
            const token = await this.$recaptcha('view_experience')
            if (isGuest) {
                this.continueAsGuest(token);
            } else {
                this.continueAsMember(token);
            }
			this.$ga.event('Tracking', 'view_experience', 'click')
            // Do stuff with the received token.
        }
    }
}