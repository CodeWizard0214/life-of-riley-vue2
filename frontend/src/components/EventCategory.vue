<template>
  <div class="home-experience">
    <section class="container-fluid">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div
                class="exterience-featured d-flex flex-column flex-md-row-reverse justify-content-md-between align-items-md-center position-relative"
              >
                <filterButtons
                  :activeId="activeId"
                  @filterEvents="filterEventsHandler"
                ></filterButtons>
                <!-- Hidden only on mobile -->
                <div class="d-none d-sm-block">
                  <h2 class="filter-title" :type="type">
                    <span v-on:click="minusCategory">
                      <template v-if="collapsed">
                        <i class="fa fa-plus"></i>
                      </template>
                      <template v-else>
                        <i class="fa fa-minus"></i>
                      </template>
                    </span>
                    {{ type }} Experiences
                  </h2>
                </div>
                <!-- Hidden only on mobile -->
                <!-- Visible only on mobile -->
                <div class="d-block d-sm-none">
                  <h2 class="filter-title" :type="type">
                    <span v-on:click="minusCategory">
                      <template v-if="collapsed">
                        <i class="fa fa-plus"></i>
                      </template>
                      <template v-else>
                        <i class="fa fa-minus"></i>
                      </template>
                    </span>
                    {{ type }}
                  </h2>
                </div>
                <!-- Visible only on mobile -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- New card design -->
    <CategorySlider
      :events="events"
      :eventType="type"
      :showViewAll="type === 'featured' ? false : true"
      :class="{ hide: collapsed }"
    />
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import filterButtons from '@/components/filterButtons.vue'
import CategorySlider from '@/components/CategorySlider.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    filterButtons,
    CategorySlider
  },
  props: {
    type: String,
    collection: String
  },
  created() {
    if (this.events.length === 0) {
      EventService.getEventsByType(this.type)
        .then(response => {
          // this.events = response.data
          this.setCategoryEvents({
            eventType: this.type,
            data: response.data,
            activeTab: 4
          })
          this.filterEventsHandler({ id: 4 })
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  methods: {
    ...mapActions({
      setCategoryEvents: 'events/updateCategoryEvents'
    }),
    filterEventsHandler(button) {
      const eventsCopy = [...this.events]
      switch (button.id) {
        case 1:
          eventsCopy.sort(
            (a, b) => new Date(b.start_date) - new Date(a.start_date)
          )
          break
        case 2:
          eventsCopy.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
          break
        case 3:
          eventsCopy.sort((a, b) => b.views - a.views)
          break
        case 4:
          eventsCopy.sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
          break
        default:
          break
      }
      this.setCategoryEvents({
        eventType: this.type,
        data: eventsCopy,
        activeTab: button.id
      })
    },
    minusCategory() {
      this.collapsed = !this.collapsed
    }
  },
  computed: {
    ...mapGetters({
      categoryEvents: 'events/getCategoryEvents'
    }),
    events() {
      if (this.categoryEvents(this.type) === undefined) {
        return []
      }
      return this.categoryEvents(this.type).data
    },
    activeId() {
      if (this.categoryEvents(this.type) === undefined) {
        return 4
      }
      return this.categoryEvents(this.type).activeTab
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-title {
  span {
    // float: right;
    font-size: 15px;
    margin-right: 10px;
  }
}

.hide {
  display: none;
}
</style>
