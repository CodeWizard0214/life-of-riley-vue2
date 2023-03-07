<template>
  <div class="home-experience">
    <!-- New card design -->
    <div class="container">
      <div class="row experience-row experience-row-results">
        <div
          v-for="event in events"
          :key="event.id"
          class="col-12 col-sm-6 col-lg-4 d-flex flex-row"
        >
          <EventCard :event="event" />
        </div>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EventCard from '@/components/EventCard.vue'
import InfiniteLoading from 'vue-infinite-loading'
import EventService from '@/services/EventService.js'
import axios from 'axios'

export default {
  data() {
    return {
      // page: 1
    }
  },
  components: {
    EventCard,
    InfiniteLoading
  },
  props: ['postData', 'infiniteId', 'activeTab'],
  methods: {
    ...mapMutations({
      setEvents: 'events/setEvents',
      setRecentRequest: 'events/setRecentRequest',
    }),
    ...mapActions({
      updatePageNumber: 'events/updatePageNumber'
    }),
    infiniteHandler($state) {
      const data = this.postData
      data.page = this.page
      EventService.getEvents(data, this.recentRequest.token)
        .then(response => {
          if (response.data.events.data.length) {
            this.updatePageNumber(this.page+1);
            // this.page += 1
            this.filterEvents(response.data.events.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    filterEvents(data) {
      const eventsData = [...this.events, ...data]
      switch (this.activeTab) {
        case 1:
          eventsData.sort(
            (a, b) => new Date(b.start_date) - new Date(a.start_date)
          )
          break
        case 2:
          eventsData.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
          break
        case 3:
          eventsData.sort((a, b) => b.views - a.views)
          break
        case 4:
          eventsData.sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
          break
        default:
          break
      }
      this.setEvents(eventsData)
    }
  },
  mounted() {
    if (this.recentRequest !== '') {
      this.recentRequest.cancel()
    }
    this.setRecentRequest(axios.CancelToken.source())
  },
  computed: {
    ...mapGetters({
      events: 'events/getEvents',
      recentRequest: 'events/getRecentRequest',
      page: 'events/getPageNumber'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
