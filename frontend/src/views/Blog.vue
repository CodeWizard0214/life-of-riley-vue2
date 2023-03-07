<template>
  <div>
    <PageBanner>
      <template slot="title">Magazine</template>
    </PageBanner>
    <!-- Blog posts -->
    <div class="container-fluid blog-page-post">
      <div class="row">
        <div class="container">
          <!-- <div class="row">
            <div class="col-12">
              <h2>Our Blog Posts</h2>
            </div>
          </div>-->
          <div class="row">
            <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog"></BlogCard>
          </div>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageBanner from '@/components/PageBanner.vue'
import BlogCard from '@/components/BlogCard.vue'
import EventService from '@/services/EventService.js'
import InfiniteLoading from 'vue-infinite-loading'
import metaInfoMixin from '../mixins/metaInfo'

export default {
  mixins: [metaInfoMixin],
  components: {
    PageBanner,
    BlogCard,
    InfiniteLoading
  },
  data() {
    return {
      blogs: [],
      limit: 6,
      page: 1
    }
  },
  created() {
    // EventService.getBlogs(this.limit)
    //   .then(response => {
    //     this.blogs = response.data.data
    //   })
    //   .catch(error => {
    //     console.log('There was an error:', error.response)
    //   })
    this.setMetaInfo({
      title:
        'Magazine | Adventurous Things to Do & Bucket List Travel Ideas | Life of Riley',
      desc:
        'Lifestyle & travel blogs from the ultimate travel bucket list curators! Regularly updated with new events and insights to inform you on your future adventures',
      keywords: '',
      img: '', 
      url: window.location.href
    })
  },
  methods: {
    infiniteHandler($state) {
      EventService.getBlogs(this.limit, this.page)
        .then(response => {
          if (response.data.data.length) {
            this.page += 1
            this.blogs = [...this.blogs, ...response.data.data]
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-transform: capitalize;
  font-size: 32px;
}
</style>
