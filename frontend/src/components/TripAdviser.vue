/* eslint-disable prettier/prettier */
<template>
      <div class="events-summary-item">
      <h5 class="font-weight-bold">TripAdviser Rating</h5>
      <img v-bind:src="tripAdviserData.rating_image_url" alt />
      <p class="m-0">
        Based on {{tripAdviserData.num_reviews}} Reviews
        <a
          v-bind:href="tripAdviserData.web_url"
          target="_blank"
          class="d-block"
        >Read More ></a>
      </p>
    </div>
</template>

<script>
export default {
  props: ['tripAdviserData']
}
</script>

<style lang="scss" scoped>
</style>
