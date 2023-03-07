/* eslint-disable prettier/prettier */
import axios from 'axios'
import {
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex'
export const removeFromBucketList = {
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
            setBucketListEvents: 'bucketlist/setBucketListEvents'
        }),
        ...mapActions({
            setFailedEvent: 'bucketlist/setFailedEvent'
        }),
        removeFromBucketList(event) {
            this.setFailedEvent({
                event,
                type:'remove'
            });
            axios
                .post('/removeFromBucketList', {
                    event_id: (event.id === undefined ? event.eid : event.id),
                    user_id: this.user.id
                })
                .then(() => {
                    this.setFailedEvent('');
                    const updatedEvents = this.bucketListEvents.filter((evt) => evt.slug !== event.slug);
                    this.setBucketListEvents(updatedEvents);
                    this.onRemoveSuccess(event);
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
        onRemoveSuccess(event) {
            this.$swal({
                // title: 'Error!',
                text: event.name + ' has been removed from your bucketlist',
                icon: 'success',
                // confirmButtonText: 'Try Again',
                toast: true,
                position: 'top-end',
                timer: 2200,
                timerProgressBar: true,
                padding: '15px',
                showConfirmButton: false
            })
        }
    }
}