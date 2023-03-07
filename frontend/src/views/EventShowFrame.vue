<template>
  <div>
    <div class="frame">
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <router-link to="/" class="navbar-brand">
              <img alt class="img-fluid d-block" src="/images/logo.svg" />
            </router-link>
          </div>
          <div class="col-sm-4 text-right">
            <ul class="list-inline mb-0">
              <!-- <li class="list-inline-item"><a href="" class="gold-btn">More Events</a></li> -->
              <li class="list-inline-item">
                <router-link to="/">More Experiences</router-link>
              </li>
              <li class="list-inline-item sep">|</li>
              <li class="list-inline-item">
                <a target="_blank" v-bind:href="websiteURL">Remove Frame</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="loader" v-if="showLoader">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
    <iframe v-if="websiteURL" :key="'iframe' + event.name" @load="onIframeLoad" v-bind:src="websiteURL" class="iframe" title="Event Page"></iframe>
  </div>
</template>
<script>
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'

export default {
  props: ['slug'],
  data() {
    return {
      event: {},
      showLoader: false
    }
  },
  created() {
    this.showLoader = true
    const type =
      this.$route.query.type !== undefined ? this.$route.query.type : ''
    EventService.getEventBySlug(this.slug, type)
      .then(response => {
        this.event = response.data
        this.setMetaInfo({
          title: this.event.seo_title,
          desc: this.event.seo_desc,
          keywords: this.event.keywords,
          img: this.small_tile_image,
          url: window.location.href
        })
      })
      .catch(() => {})
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    }),
    websiteURL() {
      let url = ''
      if (this.event.website_url !== undefined) {
        url = this.event.website_url
        if (url.indexOf('http') === -1) {
          url = `https://${url}`
        }
      }
      return url
    }
  },
  methods: {
    onIframeLoad() {
      this.showLoader = false
    }
  }
}
</script>
<style scoped>
img {
  width: 127px;
}
.iframe {
  width: 100%;
  border: none;
  height: 100vh;
}
.frame {
  background-color: #1e2226;
  /* padding-top: 15px; */
  /* padding-bottom: 15px; */
}
a {
  color: #fff;
  padding: 0px;
}

.gold-btn {
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
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 30px;
  max-width: 180px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-transform: uppercase;
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
  width: 100%;
}
.sep {
  color: #3b4147;
}

ul {
  margin-top: 10px;
}
.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #0000002e;
}
.loader i {
  color: #ffffff;
  font-size: 32px;
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
