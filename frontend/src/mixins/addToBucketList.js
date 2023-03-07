/* eslint-disable prettier/prettier */
import axios from 'axios'
import {
    mapGetters,
    mapMutations,
    mapActions,
} from 'vuex'
export const addToBucketList = {
    props: {
        event: Object
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            bucketListEvents: 'bucketlist/getBucketListEvents'
        })
    },
    methods: {
        ...mapMutations({
            setBucketListEvents: 'bucketlist/setBucketListEvents',
        }),
        ...mapActions({
            setFailedEvent: 'bucketlist/setFailedEvent'
        }),
        addToBucketList(event) {
            this.setFailedEvent({
                event,
                type:'add'
            });
            axios
                .post('/addToBucketList', {
                    event_id: (event.id === undefined ? event.eid : event.id),
                    user_id: this.user.id
                })
                .then(() => {
                    this.setFailedEvent('');
                    this.setBucketListEvents([...this.bucketListEvents, ...[event]]);
                    this.onSuccess(event);
                })
                .catch((error) => {
                    if (error.response !== undefined) {
                        if (error.response.status === 401) {
                            this.$store.commit('auth/SET_LOGIN_MODAL', true)
                        }
                    }
                    console.log(error)
                })
        },
        addToBucketListGuest() {
            if (!this.authenticated) {
                this.setFailedEvent({
                    event,
                    type:'add'
                });
            }
            this.$store.commit('auth/SET_LOGIN_MODAL', true)
            // this.$swal({
            //     title: 'Uh-oh!',
            //     text: 'You must be a member to add events to your bucketlist. Why not sign up for free today?',
            //     icon: 'warning',
            //     confirmButtonText: 'Sign up',
            //     // toast: true,
            //     // position: 'top-end',
            //     timer: 6000,
            //     timerProgressBar: true,
            //     padding: '15px',
            //     // showConfirmButton: false
            // }).then(function () {
            //     window.location = "/register";
            // })
        },
        onSuccess(event) {
            this.$swal({
                // title: 'Error!',
                text: event.name + ' has been added to your bucketlist',
                icon: 'success',
                // confirmButtonText: 'Try Again',
                toast: true,
                position: 'top-end',
                timer: 2200,
                timerProgressBar: true,
                padding: '15px',
                showConfirmButton: false
            })
			this.$ga.event('Tracking', 'bucketlist', 'added')
        }
    }
}