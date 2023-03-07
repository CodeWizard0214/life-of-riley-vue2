<template>
  <div
    class="experience-item d-flex flex-row"
    v-bind:class="event.featured == 1 ? 'featured-event' : ''"
  >
    <div
      class="events-item d-flex flex-column"
      v-bind:class="event.member_only == 1 ? 'MOE' : ''"
    >
      <div
        class="events-item-top d-flex flex-row align-items-center justify-content-between"
      >
        <div class="flag-icons d-flex flex-row align-items-center">
          <i class="flag-icon" v-bind:class="country_icon"></i>
          <span>{{ event.country }}</span>
        </div>
        <a
          title="Remove from bucket list"
          v-if="
            authenticated &&
              isEventInBucketList(event.id === undefined ? event.eid : event.id)
          "
          @click="removeFromBucketList(event)"
        >
          <i style="color: #C8AD5E;" class="fas fa-star"></i>
        </a>
        <a
          title="Add to bucket list"
          v-else-if="
            authenticated &&
              !isEventInBucketList(
                event.id === undefined ? event.eid : event.id
              )
          "
          @click="addToBucketList(event)"
        >
          <i class="fal fa-star"></i>
        </a>
        <!-- <router-link title="Add to bucket list" v-else :to="{ name: 'page-login' }">
          <i class="fal fa-star"></i>
        </router-link>-->
        <!-- events top -->
        <a href="javascript:void(0);" v-else>
          <i
            class="fal fa-star"
            v-on:click="bucketListRegisterPrompt(event)"
          ></i>
        </a>
      </div>
      <!-- events top -->
      <div class="events-item-image d-flex flex-column">
        <!-- <a
          @click="handleClick"
          class="d-flex flex-row align-items-end"
          v-bind:style="{ backgroundImage: 'url(' + small_tile_image + ')' }"
        >-->
        <a
          @click="handleClick"
          class="d-flex flex-row align-items-end loader-bg"
          v-lazy:background-image="small_tile_image"
        >
          <template v-if="event.member_only === 0">
            <span class="status" v-if="event.status === 'expired'">{{
              event.status
            }}</span>
          </template>
          <template v-else-if="event.member_only === 1">
            <span class="memberonly">MEMBERS ONLY</span>
          </template>
          <span class="season">
            <!-- {{ startDate | changeDateToFilter }}
            -
            {{ endDate | changeDateToFilter }}-->
            {{ displayDates }}
          </span>
        </a>
      </div>
      <!-- events image -->
      <div class="events-item-expert d-flex flex-column">
        <div class="events-item-tags">
          <!-- <a href="javascript:void(0);">{{ event.map_icon }},</a> -->
          <a v-for="(tag, index) in tags" :key="tag + index"
            >{{ tag }}{{ tags.length !== index + 1 ? ', ' : '' }}</a
          >
        </div>
        <h4>
          <router-link
            :to="{
              name: 'event-show',
              params: { slug: event.slug }
            }"
            >{{ event.name }}</router-link
          >
        </h4>
        <p>{{ event.seo_desc | truncateString(30) }}</p>
      </div>
      <div
        class="events-bottom d-flex flex-row align-items-center justify-content-between mt-auto"
      >
        <span>{{ event.views }} Views</span>
        <span class="pricing">
          <span v-if="event.cost < '5000'">Premium</span>
          <span v-else>Trip of a Lifetime</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { truncateString, changeDateToFilter } from '../utils/filters'
import { addToBucketList } from '../mixins/addToBucketList'
import { removeFromBucketList } from '../mixins/removeFromBucketList'
import { commonBucketListEvents } from '../mixins/commonBucketListEvents'
import { eventImageHandler } from '../mixins/eventImageHandler'
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    addToBucketList,
    removeFromBucketList,
    commonBucketListEvents,
    eventImageHandler
  ],
  filters: {
    truncateString,
    changeDateToFilter
  },
  props: {
    event: Object
  },
  data() {
    return {
      // small_tile_image:
      //   'https://cdn.alifeofriley.com/uploads/event/' +
      //   this.event.small_tile_image +
      //   '.webp',
      showPrice: 0,
      featured: false,
      country_icon: 'flag-icon-' + this.event.country_sort,
      startDate: this.event.start_date,
      endDate: this.event.end_date
    }
  },
  methods: {
    handleClick() {
      if (this.authenticated) {
        this.incrementView()
        this.goToEvent()
      } else {
        if (this.event.member_only == 1) {
          this.$swal({
            title: 'Members only',
            html:
              'This is a <b>member</b> only event. Please login or sign up to access.' +
              ' <br><br>' +
              '<ul class="text-left">' +
              '<li>Exclusive members only offers from your chosen experiences.</li>' +
              '<li>Invitations to exclusive members only experiences.</li>' +
              '<li>Build and share your bucket-list.</li>' +
              '<li>No signup fee or contract.</li>' +
              '</ul>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Signup for free',
            cancelButtonText: 'Login',
            // toast: true,
            // position: 'top-end',

            padding: '15px',
            footer:
              '<a href="/register">Sign up </a> &nbsp;for an account today - It is completely free!'
            // showConfirmButton: false
          }).then(result => {
            if (result.value) {
              window.location = '/register'
            } else window.location = '/login'
          })
        } else {
          this.incrementView()
          this.goToEvent()
        }
      }
    },
    bucketListRegisterPrompt(event) {
      this.setFailedEvent({
        event,
        type: 'add'
      })
      this.$store.commit('auth/SET_LOGIN_MODAL', true)
      // this.$swal({
      //   title: 'Members only',
      //   text:
      //     'To add this to your bucketlist you must first become a member. Registration is and always will be free.',
      //   icon: 'warning',
      //   confirmButtonText: 'Register',
      //   // toast: true,
      //   // position: 'top-end',
      //   timer: 4500,
      //   timerProgressBar: true,
      //   padding: '15px'
      //   // showConfirmButton: false
      // }).then(function() {
      //   window.location = '/register'
      // })
    },
    incrementView() {
      // console.log('adding a view')
      axios
        .post(
          '/incrementView/' +
            (this.event.id === undefined ? this.event.eid : this.event.id)
        )
        // .then(console.log('added a view'))
        .catch(error => error.response.data)
    },
    goToEvent() {
      console.log('sending you to event')
      // alert(this.event.name)
      this.$router.push({
        name: 'event-show',
        params: { slug: this.event.slug }
      })
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    }),
    displayDates() {
      let start = moment(this.event.start_date).format('MMM')
      let end = moment(this.event.end_date).format('MMM')
      if (start === end) {
        return start
      } else {
        return start + ' - ' + end
      }
    },
    tags() {
      let tags = []
      if (this.event.map_icon) {
        tags = [this.event.map_icon.toLowerCase()]
      }
      if (this.event.tags !== undefined) {
        if (this.event.tags.length) {
          const newTags = this.event.tags.map(item => item.name.toLowerCase())
          tags = [...tags, ...newTags]
        }
      }
      tags = new Set(tags)
      tags = [...tags]
      return tags
    }
  }
}
</script>

<style lang="scss" scoped>
.experience-item {
  max-width: 100%;
}
.MOE {
  border: solid 2px#C8AD5E;
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

.featured-event a {
  color: #ce9a62;
}

.featured-event h4 a {
  color: #ce9a62 !important;
}

.experience-item {
  cursor: pointer;
}
.loader-bg[lazy='loading'] {
  background-image: url('/images/image-loader.gif') !important;
  background-size: inherit;
}
</style>
