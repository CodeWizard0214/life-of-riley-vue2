<template>
  <main>
    <HomeBanner>Homepage</HomeBanner>
    <EventSearch></EventSearch>
    <span v-show="isSearchDataEmpty">
      <EventCategory type="featured"></EventCategory>
      <EventCategory type="adventure"></EventCategory>
      <EventCategory type="party"></EventCategory>
      <EventCategory type="hotel"></EventCategory>
      <EventCategory type="romance"></EventCategory>
      <EventCategory type="sport"></EventCategory>
      <EventCategory type="glamour"></EventCategory>
      <EventCategory type="spiritual"></EventCategory>
      <EventCategory type="cultural"></EventCategory>
      <EventCategory type="inspiration"></EventCategory>
    </span>
    <div class="container-fluid dark-bg">
      <div class="container">
        <h2>From the Magazine</h2>
        <div class="row">
          <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog"></BlogCard>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EventService from '@/services/EventService.js'
import HomeBanner from '@/components/HomeBanner.vue'
import EventCategory from '@/components/EventCategory.vue'
import EventSearch from '@/components/EventSearch.vue'
import BlogCard from '@/components/BlogCard.vue'
import { mapActions, mapGetters } from 'vuex'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [metaInfoMixin],
  components: {
    HomeBanner,
    EventCategory,
    EventSearch,
    BlogCard
  },
  data() {
    return {
      blogs: [],
      limit: 3,
      page: 1
    }
  },
  methods: {
    ...mapActions({
      fetchBucketListEvents: 'bucketlist/fetchBucketListEvents'
    })
  },
  computed: {
    ...mapGetters({
      isSearchDataEmpty: 'eventsearch/isSearchDataEmpty'
    })
  },
  created() {
    this.fetchBucketListEvents(),
      EventService.getBlogs(this.limit)
        .then(response => {
          this.blogs = response.data.data
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    this.setMetaInfo({
      title:
        'Experiential Star | The Best Experiences In The World... And Out Of It!',
      desc:
        "Your downtime is precious and in short supply which is why we only curate the best experiences in the world... and out of it! What's on your travel bucket list?",
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped>
.dark-bg {
  background-color: #1e2226;
  h2 {
    color: #fff;
    font-size: 32px;
    font-family: 'Titillium Web', sans-serif;
    font-weight: 700;
    margin-bottom: 30px;
    margin-top: 0;
    line-height: 40px;
    text-align: left;
    text-transform: capitalize;
    width: 100%;
  }
}
</style>
