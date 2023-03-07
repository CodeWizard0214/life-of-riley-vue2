<template>
  <div class="col-12 col-sm-6 col-md-4 d-flex flex-row">
    <div class="blog-page-item main-thumb">
      <router-link
        :to="{ name: 'page-blog-detail', params: { slug: blog.slug } }"
        class="blog-page-item-image"
      >
        <!-- <img alt v-bind:src="featured_image" /> -->
        <img
          alt
          v-lazy="{ src: featured_image, loading: '/images/image-loader.gif' }"
          class="loader-bg"
        />
      </router-link>

      <div class="blog-page-item-container">
        <div class="title-description">
          <!-- <h5 class="text-center blog-category">{{ blog.created_at | formatDate }}</h5> -->
          <h3 class="title">
            <router-link
              :to="{ name: 'page-blog-detail', params: { slug: blog.slug } }"
              >{{ blog.title }}</router-link
            >
          </h3>
          <div class="sort-desc">
            <p>{{ blog.seo_desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../utils/filters'
import { blogImageHandler } from '../mixins/blogImageHandler'
export default {
  mixins: [blogImageHandler],
  filters: {
    formatDate
  },
  props: {
    blog: Object
  }
  // data() {
  //   return {
  //     featured_image:
  //       'https://cdn.alifeofriley.com/uploads/blogs/' + this.blog.featured_image
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.loader-bg[lazy='loading'] {
  width: auto;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
