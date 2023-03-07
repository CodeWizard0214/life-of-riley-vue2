<template>
  <div>
    <section class="container-fluid home-filter" id="scrolltosearchbar">
      <div class="row">
        <div class="container mobile-minus-row">
          <div class="home-filter-wrapper">
            <div class="row align-items-center">
              <div class="col-4 col-md-8">
                <!-- <div class="filter-title">Search for the best experiences in the world....</div> -->
                <div class="filter-title d-none d-md-block typer">
                  <!-- Search for the best experiences in the world.... -->
                  <vue-typer
                    :text="[
                      'Search for the best experiences in the world....',
                      'Try &quot;4x4 Safaris&quot;...',
                      'Try &quot;Sky Diving&quot;...',
                      'Try &quot;Luxury Hotels&quot;...'
                    ]"
                    :repeat="Infinity"
                    initial-action="typing"
                    :pre-type-delay="50"
                    :type-delay="40"
                    :pre-erase-delay="2000"
                    :erase-delay="250"
                    erase-style="select-all"
                    :erase-on-complete="false"
                    caret-animation="blink"
                  ></vue-typer>
                </div>
              </div>
              <!-- <div class="col-4 d-none d-md-block">
                <div class="filter-title">Filter</div>
              </div>-->
              <div class="col-8 col-md-4">
                <div class="row">
                  <div
                    class="col-md-12 d-flex flex-column flex-sm-row align-items-end align-items-sm-center justify-content-sm-end"
                  >
                    <!-- <div
                      class="show-map d-none d-md-flex flex-row align-items-center justify-content-between justify-content-sm-end"
                    >-->
                    <!-- <span>Show map</span> -->
                    <!-- <div class="map-toggle">
                        <input
                          type="checkbox"
                          name
                          class="tgl tgl-ios"
                          v-on:click="toggleMap"
                          id="cb2"
                        />
                        <label class="tgl-btn" id="mapToggle" for="cb2"></label>
                    </div>-->
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-none d-md-flex">
              <div class="col-12 map-wrapper" id="mapWrapper">
                <div class="home-map" id="map"></div>
              </div>
            </div>
            <!-- Map and Clear filter -->
            <div class="row">
              <div class="col-12 home-search flex-column align-items-center">
                <div class="input-group">
                  <input
                    class="form-control"
                    name="home-search"
                    placeholder="Find an Experience..."
                    v-model="searchData.keyword"
                    @keyup="filterEvents"
                    @focus="modal = true"
                    autocomplete="off"
                    type="search"
                  />
                  <button
                    @click="enableSearch"
                    class="input-group-prepend"
                    type="submit"
                    role="button"
                  >
                    <svg
                      style="height: 30px;margin: auto 0;"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                    >
                      <defs>
                        <filter
                          id="filter2"
                          x="0"
                          y="0"
                          width="25"
                          height="26"
                          filterUnits="userSpaceOnUse"
                        >
                          <feImage
                            preserveAspectRatio="none"
                            x="0"
                            y="0"
                            width="25"
                            height="26"
                            result="image"
                            xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjUiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNSAyNiI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogdXJsKCNsaW5lYXItZ3JhZGllbnQpOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSI4LjUyNiIgeDI9IjE2LjQ3NCIgeTI9IjI2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iLTAuMjUiIHN0b3AtY29sb3I9IiNmZmZmY2YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjA3NCIgc3RvcC1jb2xvcj0iI2Q4YmY2ZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNDQ0IiBzdG9wLWNvbG9yPSIjOGM3NDM3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC44MyIgc3RvcC1jb2xvcj0iIzg0NjkyZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEuMjUiIHN0b3AtY29sb3I9IiNiNDk3NTciLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI2Ii8+Cjwvc3ZnPgo="
                          />
                          <feComposite
                            result="composite"
                            operator="in"
                            in2="SourceGraphic"
                          />
                          <feBlend result="blend" in2="SourceGraphic" />
                        </filter>
                      </defs>
                      <text
                        id="search-icon2.svg"
                        class="cls-1"
                        x="0.738"
                        y="21.64"
                      >
                        
                      </text>
                    </svg>
                  </button>
                </div>
                <!-- <div v-if="filteredEvents && modal" class="results z-10">
                  <ul class="list">
                    <li
                      v-for="filteredEvent in filteredEvents"
                      :key="filteredEvent.id"
                      @click="setEvent(filteredEvent)"
                    >
                      <div class="row">
                        <div class="col-12">
                          <i
                            :class="[
                              'flag-icon',
                              'flag-icon-' + filteredEvent.country_sort,
                              'mr-3'
                            ]"
                          ></i>
                          {{ filteredEvent.name }}
                          <div class="float-right">
                            <span
                              class="badge badge-dark"
                            >{{ filteredEvent.country_sort.toUpperCase() }}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>-->
              </div>
            </div>
            <!-- Search -->
            <div class="row">
              <div class="col-12">
                <form action method="POST">
                  <div class="row">
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group d-flex flex-column">
                        <label
                          for="filter-tag"
                          class="d-flex flex-row align-items-center select-filter-label"
                        >
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                          <span>Category</span>
                        </label>
                        <!-- <select
                          v-model="searchData.tags"
                          @change="enableSearch"
                          class="select-filter wide search-tag"
                          id="filter-tag"
                          name="filter-tag[]"
                          multiple="multiple"
                        >
                          <option value>Everything</option>
                          <option
                            v-for="tag in getTags"
                            :key="tag.id"
                            :value="tag.id"
                          >{{ tag.name }}</option>
                        </select>-->
                        <multiselect
                          :closeOnSelect="false"
                          :searchable="false"
                          v-model="searchData.tags"
                          placeholder="Everything"
                          label="name"
                          track-by="id"
                          :options="getTags"
                          :multiple="true"
                          :taggable="true"
                          @input="enableSearch()"
                          selectLabel
                          selectedLabel
                          deselectLabel
                        ></multiselect>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group d-flex flex-column">
                        <label
                          for="region"
                          class="d-flex flex-row align-items-center select-filter-label"
                        >
                          <span>
                            <i class="fas fa-map-marker-alt"></i>
                          </span>
                          <span>Where?</span>
                        </label>
                        <!-- <select
                          v-model="searchData.regions"
                          @change="enableSearch"
                          class="select-filter wide region-tag"
                          id="region"
                          name="region[]"
                          multiple="multiple"
                        >
                          <option value>Anywhere</option>
                          <option
                            v-for="country in getCountry"
                            :key="country.id"
                            :value="country.name"
                          >{{ country.name }}</option>
                        </select>-->
                        <multiselect
                          :closeOnSelect="false"
                          :searchable="false"
                          v-model="searchData.regions"
                          placeholder="Anywhere"
                          label="name"
                          track-by="id"
                          :options="getCountry"
                          :multiple="true"
                          :taggable="true"
                          @input="enableSearch()"
                          selectLabel
                          selectedLabel
                          deselectLabel
                        ></multiselect>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group d-flex flex-column">
                        <label
                          for="month"
                          class="d-flex flex-row align-items-center select-filter-label"
                        >
                          <span>
                            <i class="fas fa-calendar-alt"></i>
                          </span>
                          <span>When?</span>
                        </label>
                        <!-- <select
                          v-model="searchData.months"
                          @change="enableSearch"
                          class="select-filter wide month-tag"
                          id="month"
                          name="month[]"
                          multiple="multiple"
                        >
                          <option value>Anytime</option>
                          <option
                            v-for="month in months"
                            :key="month.id"
                            :value="month.id"
                          >{{ month.name }}</option>
                        </select>-->
                        <multiselect
                          :closeOnSelect="false"
                          :searchable="false"
                          v-model="searchData.months"
                          placeholder="Anytime"
                          label="name"
                          track-by="id"
                          :options="months"
                          :multiple="true"
                          :taggable="true"
                          @input="enableSearch()"
                          selectLabel
                          selectedLabel
                          deselectLabel
                        ></multiselect>
                      </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3">
                      <div class="form-group d-flex flex-column">
                        <label
                          for="price"
                          class="d-flex flex-row align-items-center select-filter-label"
                        >
                          <span>
                            <i class="fas fa-dollar-sign"></i>
                          </span>
                          <span>How Much?</span>
                        </label>
                        <multiselect
                          :closeOnSelect="false"
                          :searchable="false"
                          v-model="searchData.budgets"
                          placeholder="Any"
                          label="name"
                          track-by="value"
                          :options="howMuch"
                          :multiple="true"
                          :taggable="true"
                          @input="enableSearch()"
                          selectLabel
                          selectedLabel
                          deselectLabel
                        ></multiselect>
                        <!-- <v-select
                          multiple
                          :closeOnSelect="false"
                          :searchable="false"
                          placeholder="Please Choose"
                          :reduce="name => name.value"
                          v-model="searchData.budgets"
                          @input="enableSearch()"
                          label="name"
                          :options="howMuch"
                        >
                          <template #option="{ name, value }">
                            <span :class="{selectedItem: (searchData.budgets.indexOf(value) !== -1)}">
                              {{name}}
                            </span>
                          </template>
                        </v-select>-->
                        <!-- <select
                          v-model="searchData.budgets"
                          @change="enableSearch"
                          class="select-filter wide budget-tag"
                          id="price"
                          name="price[]"
                          multiple="multiple"
                        >
                          <option value="All">All</option>
                          <option
                            v-for="price in howMuch"
                            :key="price.id"
                            :value="price.value"
                          >{{ price.name }}</option>
                        </select>-->
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- <div class="row d-md-none">
              <div class="col-12">
                <div class="input-group sortfilter-group">
                  <div class="input-group-prepend text-uppercase">Sort</div>
                  <select class="short-filter form-control wide" id="filter-tab" name="filter-tab">
                    <option value>Choose Price</option>
                    <option id="filterExperienceExpiringSoon" value="ExpiringSoon">Expiring Soon</option>
                    <option id="filterExperienceUpcoming" value="Upcoming">Upcoming</option>
                    <option id="filterExperienceNew" value="New">New</option>
                    <option id="filterExperienceTrending" value="Trending">Trending</option>
                  </select>
                </div>
              </div>
            </div>-->
            <!-- Filter -->
          </div>
        </div>
      </div>
    </section>
    <span v-if="!isSearchDataEmpty">
      <section class="container-fluid home-experience no-bottom-padding">
        <div class="row">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div
                  class="exterience-featured exterience-featured-search d-flex flex-column flex-md-row-reverse justify-content-md-between align-items-md-center"
                >
                  <filterButtons
                    :activeId="4"
                    v-if="isSearchEnabled"
                    @filterEvents="filterEventsHandler"
                  ></filterButtons>
                  <!-- <h2 class="filter-title" :type="type">{{ type }} Experiences</h2> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SearchedResultsListing
        v-if="isSearchEnabled"
        :key="uniqueId"
        :infiniteId="uniqueId"
        :postData="requiredPostData()"
        :activeTab="activeTab"
      />
    </span>
  </div>
</template>

<script>
import filterButtons from '@/components/filterButtons.vue'
import EventService from '@/services/EventService.js'
import SearchedResultsListing from '@/components/SearchedResultsListing.vue'
// import axios from 'axios'
import _ from 'lodash'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { VueTyper } from 'vue-typer'
import Multiselect from 'vue-multiselect'

import 'vue-multiselect/dist/vue-multiselect.min.css'

// import 'vue-select/dist/vue-select.css'
export default {
  data() {
    return {
      options2: [
        {
          text: 'name1',
          value: 'value1'
        },
        {
          text: 'name2',
          value: 'value2'
        },
        {
          text: 'name3',
          value: 'value3'
        }
      ],
      selectedCategory: [],
      selectedMonth: [],
      selectedType: [],
      getTags: [],
      getCountry: [],
      months: [
        {
          id: '01',
          name: 'January'
        },
        {
          id: '02',
          name: 'February'
        },
        {
          id: '03',
          name: 'March'
        },
        {
          id: '04',
          name: 'April'
        },
        {
          id: '05',
          name: 'May'
        },
        {
          id: '06',
          name: 'June'
        },
        {
          id: '07',
          name: 'July'
        },
        {
          id: '08',
          name: 'August'
        },
        {
          id: '09',
          name: 'September'
        },
        {
          id: '10',
          name: 'October'
        },
        {
          id: '11',
          name: 'November'
        },
        {
          id: '12',
          name: 'December'
        }
      ],
      howMuch: [
        {
          id: 1,
          name: 'All',
          value: 'All'
        },
        {
          id: 2,
          name: 'Premium',
          value: 'premium'
        },
        {
          id: 3,
          name: 'Trip of a Lifetime',
          value: 'trip_of_lifetime'
        }
      ],
      event: '',
      modal: false,
      filteredEvents: [],
      // searchData: {
      //   keyword: '',
      //   tags: [],
      //   regions: [],
      //   months: [],
      //   budgets: []
      // },
      activeTab: 4,
      uniqueId: +new Date()
    }
  },
  methods: {
    ...mapMutations({
      setEvents: 'events/setEvents',
      setIsSearchEnabled: 'events/setIsSearchEnabled',
      setCategories: 'eventsearch/setCategories'
    }),
    ...mapActions({
      updatePageNumber: 'events/updatePageNumber'
    }),
    enableSearch() {
      this.updatePageNumber(1)
      this.setIsSearchEnabled(true)
      this.setEvents([])
      this.filteredEvents = []
      this.uniqueId += 1
      if (
        this.searchData.tags.length ||
        this.searchData.months.length ||
        this.searchData.budgets.length ||
        this.searchData.keyword.length
      )
        this.$router
          .replace({
            name: 'event-list',
            query: {
              category: this.searchData.tags.map(item => item.name).join(','),
              month: this.searchData.months.map(item => item.name).join(','),
              type: this.searchData.budgets.map(item => item.value).join(','),
              keyword: this.searchData.keyword
            }
          })
          .catch(() => {})
    },
    toggleMap() {
      alert('This will toggle the map')
    },
    filterEvents: _.debounce(function() {
      if (this.searchData.keyword) {
        EventService.searchAllEvents(this.searchData.keyword.toLowerCase())
          .then(response => {
            this.filteredEvents = response.data
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      } else {
        this.filteredEvents = []
      }
      this.enableSearch()
    }, 500),
    setEvent(event) {
      this.modal = false
      this.$router.push({ name: 'event-show', params: { slug: event.slug } })
    },
    requiredPostData() {
      const data = Object.assign({}, this.searchData)
      data.tags = this.searchData.tags.map(item => item.id).join(',')
      data.months = this.searchData.months.map(item => item.id).join(',')
      data.budgets = this.searchData.budgets.map(item => item.value).join(',')
      data.regions = this.searchData.regions.map(item => item.name).join(',')
      return data
    },
    filterEventsHandler(button) {
      this.activeTab = button.id
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
      this.setEvents(eventsCopy)
    },
    setSelected(value) {
      console.log(value)
    },
    getQueryData() {
      if (typeof this.$route.query.keyword !== 'undefined') {
        this.searchData.keyword = this.$route.query.keyword
      }
      if (typeof this.$route.query.month !== 'undefined') {
        this.selectedMonth = this.$route.query.month.split(',')
        const selectedMonthArray = [...this.months].filter(item => {
          if (this.selectedMonth.includes(item.name)) {
            return true
          }
          return false
        })
        this.searchData.months = selectedMonthArray
      }
      if (typeof this.$route.query.type !== 'undefined') {
        this.selectedType = this.$route.query.type.split(',')
        const selectedTypeArray = [...this.howMuch].filter(item => {
          if (this.selectedType.includes(item.value)) {
            return true
          }
          return false
        })
        this.searchData.budgets = selectedTypeArray
      }
      const selectedCatArray = [...this.getTags].filter(item => {
        if (this.selectedCategory.includes(item.name)) {
          return true
        }
        return false
      })
      this.searchData.tags = selectedCatArray
      this.enableSearch()
    }
  },
  computed: {
    ...mapGetters({
      isSearchEnabled: 'events/getIsSearchEnabled',
      events: 'events/getEvents',
      isSearchDataEmpty: 'eventsearch/isSearchDataEmpty'
    }),
    searchData: {
      get() {
        return this.$store.state.eventsearch.searchData
      },
      set(value) {
        this.$store.commit('eventsearch/setSearchData', value)
      }
    }
  },
  async created() {
    await EventService.getTags()
      .then(response => {
        this.getTags = [...[{ id: '', name: 'All' }], ...response.data]
        this.setCategories(response.data)
        // this.getTags = console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      }),
      await EventService.getCountry()
        .then(response => {
          this.getCountry = response.data
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    this.getQueryData()
  },
  components: {
    SearchedResultsListing,
    filterButtons,
    VueTyper,
    Multiselect
  }
}
</script>

<style lang="scss" scoped>
.list {
  background-color: #f3f3f3;
  padding-left: 22px;
  padding-right: 22px;
  border: 1px solid #ced4da;
}
.list li {
  list-style: none;
  cursor: pointer;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #e7e7e7;
  &:last-child {
    border-bottom: none;
  }
  a {
    color: #1e2226;
  }
}

.wrapper {
  position: absolute;
  background-color: red;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0 !important;
}

.z-10 {
  z-index: 10 !important;
}
.no-bottom-padding {
  padding-bottom: 0;
}
.cls-1 {
  font-size: 25px;
  filter: url(#filter2);
  fill: #e9dc8a;
  font-family: 'Font Awesome 5 Pro';
}

.typer {
  margin-bottom: 20px;
}
</style>
