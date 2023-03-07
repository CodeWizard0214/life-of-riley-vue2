<template>
  <!-- <div class="col-12"> -->
  <!-- <button @click="searchAllEvents" class="view-all-button-selected fwa">
    View all {{ this.eventType }} category
  </button> -->
  <button @click="searchAllEvents" class="view-all-button-selected fwa">
    View all
  </button>
  <!-- </div> -->
</template>

<script>
import VueScrollTo from 'vue-scrollto'
export default {
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
.view-all-button-selected {
  // background-image: radial-gradient(
  //     ellipse farthest-corner at right bottom,
  //     #fedb37 0%,
  //     #fdb931 8%,
  //     #9f7928 30%,
  //     #8a6e2f 40%,
  //     transparent 80%
  //   ),
  //   radial-gradient(
  //     ellipse farthest-corner at left top,
  //     #ffffff 0%,
  //     #ffffac 8%,
  //     #d1b464 25%,
  //     #5d4a1f 62.5%,
  //     #5d4a1f 100%
  //   );
  background-size: 200% auto;
  color: #fff;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 700;
  // height: 40px;
  letter-spacing: 0.5px;
  padding: 5px 20px;
  text-transform: uppercase;
  white-space: nowrap;
  width: auto;
  margin: 0 auto;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  margin-bottom: 15px;
  &:hover {
    background-position: right center;
  }
}
</style>
