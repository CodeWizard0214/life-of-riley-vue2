<template>
  <div>
    <div class="container-fluid blogpost-banner">
      <div class="row">
        <div
          class="blogpost-banner-content d-flex flex-row align-items-center justify-content-center"
          v-bind:style="{
            backgroundImage: 'url(' + bannerImg + ')'
          }"
        >
          <h1 class="text-center">{{ blog.title }}</h1>
          <!-- <div class="blogpost-banner-date-author">
            <div class="row">
              <div
                class="container d-flex flex-row align-items-center justify-content-between"
              >
                <span class="date">{{ blog.created_at }}</span>
                <span class="author">{{ blog.user_id }}</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- Blog post details banner end -->
    <!-- Blog single details -->
    <div class="container-fluid blog-single-content">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-md-8 blog-single-body" v-html="blog.body"></div>
            <div class="col-md-4">
              <div class="blog-single-sidebar">
                <h3>Other Posts</h3>

                <div class="side-blog" v-for="rel in related" :key="rel.id">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <router-link
                          :to="{
                            name: 'page-blog-detail',
                            params: { slug: rel.slug }
                          }"
                        >
                          <img
                            :src="getRelatedImage(rel.featured_image)"
                            class="card-img-top"
                            alt
                          />
                        </router-link>
                        <div class="card-body">
                          <h4 class="card-title">{{ rel.title }}</h4>
                          <p class="card-text" v-text="rel.seo_desc"></p>
                          <router-link
                            :to="{
                              name: 'page-blog-detail',
                              params: { slug: rel.slug }
                            }"
                            class="side-blog-button"
                            >View Blog!</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bigcta">
                  <h2>Your Adventure Awaits!</h2>
                  <p>
                    Start browsing hundreds of hand-picked Experiential Star
                    events today!
                  </p>
                  <div class="d-flex flex-row justify-content-center">
                    <router-link
                      :to="{ name: 'event-list' }"
                      class="experience-view-button d-flex flex-row align-items-center justify-content-center"
                      >View all Experiences</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import metaInfoMixin from '../mixins/metaInfo'
import { blogImageHandler } from '../mixins/blogImageHandler'
import { osName } from 'mobile-device-detect'

export default {
  mixins: [metaInfoMixin, blogImageHandler],
  data() {
    return {
      blog: [],
      related: [],
      limit: 6
      // imgPreURL: 'https://cdn.alifeofriley.com/uploads/blogs/',
      // bannerImg: 'https://cdn.alifeofriley.com/uploads/blogs/'
    }
  },
  props: ['slug'],
  created() {
    EventService.getBlog(this.slug)
      .then(response => {
        this.blog = response.data
        if (
          osName.toLowerCase() === 'ios' ||
          osName.toLowerCase() === 'mac os'
        ) {
          if (this.blog.body !== undefined) {
            this.blog = {
              ...this.blog,
              ...{
                body: this.blog.body.replace(/.webp/g, '.jpg')
              }
            }
          }
        }
        this.setMetaInfo({
          title: this.blog.seo_title,
          desc: this.blog.seo_desc,
          keywords: '',
          img: this.bannerImg,
          url: window.location.href
        })
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      }),
      EventService.getBlogs(this.limit)
        .then(response => {
          this.related = response.data.data
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
  }
}
</script>

<style lang="scss">
.blog-single-content .blog-single-body img {
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}
</style>
