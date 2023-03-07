<template>
  <div class="experience-item d-flex flex-row">
    <div class="events-item d-flex flex-column dark-bg">
      <button @click="searchAllEvents" class="view-all-button-selected fwa">
        View More {{ this.eventType }} Experiences
      </button>
    </div>
  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
export default {
  data() {
    return {}
  },
  props: {
    eventType: String
  },
  methods: {
    searchAllEvents() {
      const categories = [...this.$store.state.eventsearch.categories]
      const searchData = { ...this.$store.state.eventsearch.searchData }
      if (categories.length && this.eventType) {
        const catId = categories.find(
          cat => cat.name.toLowerCase() === this.eventType.toLowerCase()
        )
        if (catId) {
          searchData.tags = [catId]
        } else {
          searchData.tags = []
        }
        this.$store.commit('eventsearch/setSearchData', searchData)
        this.$store.commit('events/setIsSearchEnabled', true)
        VueScrollTo.scrollTo('#scrolltosearchbar')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.experience-item {
  max-width: 100%;
}
.events-item {
  &:hover {
    -webkit-box-shadow: 0px 8px 12.74px 0.26px rgba(1, 1, 1, 0.2);
    box-shadow: 0px 8px 12.74px 0.26px rgba(1, 1, 1, 0.2);
    transition: box-shadow 0.3s ease-in-out;
  }
  &:after {
    -webkit-box-shadow: 0px 8px 12.74px 0.26px rgba(1, 1, 1, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
}
.events-item.dark-bg {
  background: #212529;
}
.view-all-button-selected {
  background-image: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    );
  background-size: 200% auto;
  color: #fff;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 700;
  height: 40px;
  letter-spacing: 0.5px;
  padding: 5px 20px;
  text-transform: uppercase;
  white-space: nowrap;
  width: auto;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
