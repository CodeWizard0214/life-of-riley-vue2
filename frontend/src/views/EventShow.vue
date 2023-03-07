<template>
  <div>
    <section
      class="container-fluid inner-banner"
      v-bind:style="{ backgroundImage: 'url(' + bannerImg + ')' }"
    >
      <div class="row">
        <div class="container">
          <div class="inner-banner-wrapper">
            <h1 class="text-center">{{ event.name }}</h1>
            <div class="d-flex flex-row justify-content-center"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="container-fluid experience-single-content">
      <div class="row">
        <div class="container">
          <div class="row">
            <!-- Experience content left -->
            <div class="exprience-content-left">
              <div class="event-xs-wrapper d-lg-none">
                <div
                  class="d-flex flex-column flex-sm-row align-items-center justify-content-between"
                >
                  <div
                    class="event-xs-location d-flex flex-row align-items-center"
                  >
                    <div class="country-icon">
                      <i class="flag-icon" v-bind:class="country_icon"></i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <span class="country-name">{{ event.country }}</span>
                      <span class="event-season">{{ displayDates }}</span>
                    </div>
                  </div>
                  <div class="event-xs-button">
                    <span v-if="event.cost < '5000'">
                      <a class="event-trip-button" href="javascript:void(0);"
                        >Premium</a
                      >
                    </span>
                    <span v-else>
                      <a class="event-trip-button" href="javascript:void(0);"
                        >Trip of a Lifetime</a
                      >
                    </span>
                  </div>
                </div>
              </div>
              <!-- Experience info for mobile -->
              <div class="experience-description">
                <AddThis publicId="ra-5f27d0d573cbb40e" />
                <div v-html="event.inshort" class="mb-3 inshort"></div>
                <div v-html="event.body"></div>
              </div>
              <div id="tpw-widget"></div>
              <div
                class="d-block d-sm-none mb-30 text-left tripadviser-sm-content"
                v-if="tripAdviserStatus"
              >
                <TripAdviser :tripAdviserData="tripAdviserData"></TripAdviser>
              </div>
              <!-- Eexperience description -->
              <div class="vid d-block d-sm-none">
                <div v-if="event.video_link" class="experience-video">
                  <iframe
                    :key="'iframe' + event.name"
                    allowfullscreen
                    frameborder="0"
                    v-bind:src="event.video_link | parseEmbedVideoURL"
                  ></iframe>
                </div>
              </div>
              <div class="experience-author d-flex flex-row align-items-center">
                <div class="image">
                  <i
                    v-if="event.writer === undefined"
                    style="font-size: 100px;"
                    class="fas fa-user-circle"
                  ></i>
                  <img
                    v-else
                    alt="Author Name"
                    class="img-fluid d-block"
                    v-bind:src="writerImgUrl + event.writer.featured_image"
                  />
                </div>
                <div class="text d-flex flex-column">
                  <span>written by</span>
                  <span>
                    {{ event.writer !== undefined ? event.writer.name : '' }}
                  </span>
                </div>
              </div>
              <!-- Author information -->
            </div>
            <!-- Experience content left end -->
            <!-- Experience content right -->
            <div class="exprience-content-right d-flex flex-column">
              <template v-if="authenticated">
                <template v-if="user.admin == true">
                  <div class="adminbox">
                    <p>
                      <b>Admin Info</b>
                    </p>
                    <ul>
                      <li>
                        <b>Status:</b>
                        {{ event.status }}
                      </li>
                      <li>
                        <b>Created:</b>
                        {{ event.created_at }}
                      </li>
                      <li>
                        <b>Updated:</b>
                        {{ event.updated_at }}
                      </li>
                      <li>
                        <b>Price:</b>
                        {{ event.cost }}
                      </li>
                    </ul>
                    <a
                      :href="
                        'https://admin.thelifeofriley.com/event/' +
                          event.id +
                          '/edit'
                      "
                      target="_blank"
                      class="experience-view-button mb-3 text-center d-block"
                      >Admin Edit</a
                    >
                  </div>
                </template>
              </template>
              <div class="experience-sticky d-flex flex-column">
                <!-- TripAdviser review box -->
                <div
                  class="d-none d-sm-block mb-30 text-left events-summary-content"
                  v-if="tripAdviserStatus"
                >
                  <TripAdviser :tripAdviserData="tripAdviserData"></TripAdviser>
                </div>
                <div
                  class="events-summary-content d-none d-lg-flex flex-column"
                >
                  <div
                    class="events-summary-item d-flex flex-row justify-content-between"
                  >
                    <div class="text d-flex flex-column">
                      <span class="title">
                        <b>Location: </b>
                        {{ event.country }}
                      </span>
                    </div>
                    <div class="icon locationicon">
                      <img
                        alt="Location"
                        class="img-fluid d-block"
                        src="/images/event-location-icon.png"
                      />
                    </div>
                  </div>
                  <div
                    class="events-summary-item d-flex flex-row justify-content-between"
                  >
                    <div class="text d-flex flex-column">
                      <span class="title">
                        <b>Price: </b>
                        <template v-if="event.cost < '5000'">Premium</template>
                        <template v-else>Trip of a Lifetime</template>
                      </span>
                    </div>
                    <div class="icon">
                      <img
                        alt="Price range"
                        class="img-fluid d-block"
                        src="/images/event-value-icon.png"
                      />
                    </div>
                  </div>
                  <div
                    class="events-summary-item d-flex flex-row justify-content-between"
                  >
                    <div class="text d-flex flex-column">
                      <span class="title">
                        <b>DATES: </b>
                        {{ displayDates }}
                      </span>
                    </div>
                    <div class="icon">
                      <img
                        alt="Dates"
                        class="img-fluid d-block"
                        src="/images/event-dates-icon.png"
                      />
                    </div>
                  </div>
                </div>
                <!-- Event summary -->
                <EventCTA :event="this.event"></EventCTA>
                <!-- Experience cat -->
                <div class="vid d-none d-sm-block">
                  <div v-if="event.video_link" class="experience-video">
                    <iframe
                      :key="'iframe' + event.name"
                      allowfullscreen
                      frameborder="0"
                      v-bind:src="event.video_link | parseEmbedVideoURL"
                    ></iframe>
                  </div>
                </div>
                <!-- Experience video -->
              </div>
            </div>
            <!-- Experience content right end -->
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div
        class="container-fluid aboutus"
        style="background-image: url(images/World_map_green.png);"
      >
        <div class="row">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="about-content">
                  <h2 class="text-center">You may also like ...</h2>
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
              v-for="event in related"
              :key="event.id"
              :event="event"
            />
          </div>
        </div>
      </div>
    </section>
    <EventStickyFooter :event="event"></EventStickyFooter>
  </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import EventCTA from '@/components/EventCTA.vue'
import TripAdviser from '@/components/TripAdviser.vue'
import EventCard from '@/components/EventCard.vue'
import EventStickyFooter from '@/components/EventStickyFooter.vue'
import { changeDateToFilter, parseEmbedVideoURL } from '../utils/filters'
import moment from 'moment'
import { mapGetters } from 'vuex'
import metaInfoMixin from '../mixins/metaInfo'
import { eventImageHandler } from '../mixins/eventImageHandler'
import { osName } from 'mobile-device-detect'
import AddThis from 'vue-simple-addthis-share'

export default {
  mixins: [metaInfoMixin, eventImageHandler],
  name: 'AwesomeComponent',
  components: {
    EventCard,
    EventCTA,
    EventStickyFooter,
    AddThis,
    TripAdviser
  },
  filters: {
    changeDateToFilter,
    parseEmbedVideoURL
  },
  props: ['slug'],
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://widget.solutionz.com/js/loader.js';
    script.setAttribute('data-id', 'tpw-widget');
    script.setAttribute('data-token', 'oQF0ify0SpuC0IZXL46ytVW96EqUlghoA87nbm453MZAeQDBXbeHcmG00Ex1dYv9');
    document.head.appendChild(script);
  },
  data() {
    return {
      related: [],
      event: {},
      writerImgUrl: 'https://cdn.alifeofriley.com/uploads/users/',
      adminEdit: 'https://admin.thelifeofriley.com/event/',
      tripAdviserData: [],
      tripAdviserStatus: false
    }
  },
  watch: {
    event() {
      const script2 = document.createElement('script');
      console.log('event', this.event);
      script2.innerHTML = `tpWidget({ headerText: 'Plan your trip to ', poiName: '${this.event.name}', appendPOI: 'Y', eventName: '${this.event.name}', eventStart: '${this.event.start_date}', eventEnd: '${this.event.end_date}', daysFromToday: 1, numberOfDays: 1, daysBefore: 1, daysAfter: 1, mapTab: 1, address: 'XXXX', airport: 'XXXX', latitude: '${this.event.lat}', longitude: '${this.event.long}', trackingCode: '4_0', imageURL: '', imageLink: ''})`;
      document.head.appendChild(script2);
    }
  },
  created() {  
    const type =
      this.$route.query.type !== undefined ? this.$route.query.type : ''
    EventService.getEventBySlug(this.slug, type)
      .then(response => {
        this.event = response.data

        EventService.getRelated(this.event.map_icon).then(res => {
          this.related = res.data
        })

        if (
          osName.toLowerCase() === 'ios' ||
          osName.toLowerCase() === 'mac os'
        ) {
          if (this.event.body !== undefined) {
            this.event = {
              ...this.event,
              ...{
                body: this.event.body.replace(/.webp/g, '.jpg')
              }
            }
          }
          if (this.event.inshort !== undefined) {
            this.event = {
              ...this.event,
              ...{
                inshort: this.event.inshort.replace(/.webp/g, '.jpg')
              }
            }
          }
        }
        if (
          this.event.tripadvisor_id !== null &&
          this.event.tripadvisor_id !== ''
        ) {
          EventService.getTripAdviserData(this.event.tripadvisor_id).then(
            res => {
              this.tripAdviserStatus = true
              this.tripAdviserData = res.data
            }
          )
        }
        this.setMetaInfo({
          title: this.event.seo_title,
          desc: this.event.seo_desc,
          keywords: this.event.keywords,
          img: this.small_tile_image,
          url: window.location.href
        })
      })
      .catch(() => {
        /* eslint no-console: "error" */
        // console.log(error.response);
        // console.log('There was an error:', error.response)
      })
	  
	  //check if addthis is initialized
	  this.setAddthisListener()
  },
  computed: {
    displayDates() {
      let start = moment(this.event.start_date).format('MMM')
      let end = moment(this.event.end_date).format('MMM')
      if (start === end) {
        return start
      } else {
        return start + ' - ' + end
      }
    },
    eventName() {
      return this.event?.name
    },
    country_icon() {
      return 'flag-icon-' + this.event.country_sort
    },
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })	
    // videoURL() {
    //   if (this.event.video_link !== undefined && this.event.video_link !== null) {

    //   } else {
    //     return ''
    //   }
    // },
  },
  methods: {	
	setAddthisListener() {
		let gaAnalytics = this.$ga
		let intrvl = setInterval(function() {
			if(window.addthis) {
				clearInterval(intrvl)
				window.addthis.addEventListener('addthis.menu.share', function(evt) {
					if (evt.type == 'addthis.menu.share') {
						gaAnalytics.event('Tracking', 'share', 'click')
					}
				});
			}
		}, 551);
	}
  }
}
</script>
<style scoped>
.experience-description img {
  border-radius: 3px !important;
}

.inner-banner .inner-banner-wrapper {
  padding-bottom: 25%;
  padding-top: 20%;
  position: relative;
  z-index: 1;
}

h2 {
  font-weight: bolder;
}

.experience-description div {
  color: #6d6d6d;
  font-family: Titillium Web, sans-serif;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 20px;
}

.adminbox {
  border: 1px solid #d9d9d9;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 3px;
  padding: 15px;
}
.adminbox ul {
  padding-left: 0px;
}

.adminbox li {
  list-style: none;
}

@media (max-width: 767.98px) {
  .aboutus {
    background-position: center top 00px;
    padding-top: 0px;
  }
  .tripadviser-sm-content {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin-bottom: 30px;
    width: 100%;
    padding: 1rem;
  }
}
</style>
