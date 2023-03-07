<template>
  <div class="create">
    <PageBanner>
      <template slot="title">My Bucket List</template>
    </PageBanner>
    <section class="container-fluid past-experience">
      <div class="row">
        <div class="container">
          <!-- <div class="row">
            <div class="col-12">
              <h2>My saved ideas</h2>
            </div>
          </div>-->
          <div class="row" v-if="events.length < 1">
            <div class="col-12 text-center">
              <h3>There are no events in your bucketlist</h3>
              <router-link
                class="experience-view-button mt-4 mb-4"
                :to="{ name: 'event-list' }"
              >Find an Experience</router-link>
            </div>
          </div>
          <div class="row" v-else>
            <EventCard v-for="event in events" :key="event.id" :event="event" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageBanner from '@/components/PageBanner.vue'
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService.js'
import { mapGetters, mapActions } from 'vuex'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [metaInfoMixin],
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut',
      fetchBucketListEvents: 'bucketlist/fetchBucketListEvents'
    })
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      events: 'bucketlist/getBucketListEvents'
    })
  },
  components: {
    PageBanner,
    EventCard
  },
  data() {
    return {
      // events: []
    }
  },
  created() {
    this.fetchBucketListEvents()
    this.setMetaInfo({
      title: 'Bucket List | Experiential Star',
      desc: 'Build your ultimate bucket list with a single click',
      keywords: '',
      img: '',
      url: window.location.href
    })
    // EventService.getEventByUser(this.user.id)
    //   .then(response => {
    //     this.events = response.data
    //   })
    //   .catch(error => {
    //     console.log('There was an error:', error.response)
    //   })
  }
}
</script>

<style lang="scss" scoped></style>
