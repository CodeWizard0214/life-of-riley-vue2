<template>
  <div>
    <div class="AboutUs">
      <PageBanner>
        <template slot="title">This page may have been moved</template>
      </PageBanner>
      <div class="container">
        <div
          class="container-fluid aboutus"
          style="background-image: url(images/World_map_green.png);"
        >
          <div class="row">
            <div class="container">
              <div class="row d-none d-md-flex">
                <div class="col-12">
                  <div class="about-content">
                    <h2 class="text-center">
                      You may like these...
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="container-fluid past-experience">
        <div class="row">
          <div class="container">
            <div class="row">
              <EventCard
                v-for="event in events"
                :key="event.id"
                :event="event"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import PageBanner from '@/components/PageBanner.vue'
import EventCard from '@/components/EventCard.vue'

export default {
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
    EventService.getFourRandom()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>
