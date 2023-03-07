<template>
  <div class="create">
    <PageBanner>
      <template slot="title">Past Experiences</template>
    </PageBanner>
    <section class="container-fluid past-experience">
      <div class="row">
        <div class="container">
          <!-- <div class="row">
            <div class="col-12">
              <h2>Past Experiences</h2>
            </div>
          </div>-->
          <div class="row">
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
import EventService from '@/services/EventService.js'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [metaInfoMixin],
  components: {
    PageBanner,
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getExpired()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    this.setMetaInfo({
      title: 'Past Experiences | Travel Bucket List Ideas | Experiential Star',
      desc:
        "Experts in experiential travel, we've curated the very best in travel bucket list ideas. You've missed some of them, but others may come back around again soon!",
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped></style>
