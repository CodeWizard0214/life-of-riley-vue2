/* eslint-disable prettier/prettier */
import { mapGetters } from 'vuex'
export const commonBucketListEvents = {
    computed: {
        ...mapGetters({
            bucketListEventsIds: 'bucketlist/getBucketListEventsIds'
        })
    },
    methods: {
        isEventInBucketList(eventId) {
            if (this.bucketListEventsIds.indexOf(eventId) !== -1) {
                return true;
            }
            return false;
        }
    }
}