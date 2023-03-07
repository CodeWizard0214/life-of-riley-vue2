<template>
  <section
    class="container-fluid inner-banner"
    v-bind:style="{ backgroundImage: 'url(' + bannerImg + ')' }"
  >
    <div class="row">
      <div class="container">
        <div class="inner-banner-wrapper">
          <h1 class="text-center">
            <slot name="title"></slot>
          </h1>
          <div class="d-flex flex-row justify-content-center"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bannerImg:
        'images/banners/' +
        this.$route.path.replace('/', '') +
        '-banner.jpg?token=' +
        new Date().getTime()
    }
  },
  // created() {
  //   hello() {
  //     console.log(this.$slots)
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
