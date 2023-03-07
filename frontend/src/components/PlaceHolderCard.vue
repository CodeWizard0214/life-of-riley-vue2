<template>
  <div class="experience-item d-flex flex-row">
    <div class="events-item d-flex flex-column animated-background">
      <div class="events-item-top d-flex flex-row align-items-center justify-content-between">
        <div class="flag-icons d-flex flex-row align-items-center">
          <i class="flag-icon"></i>
          <span></span>
        </div>
        <a>
          <i class="fal fa-star"></i>
        </a>
      </div>
      <!-- events top -->
      <div class="events-item-image d-flex flex-column">
        <a class="d-flex flex-row align-items-end" style="background: rgba(2,2,2,0.1);">
          <span class="season"></span>
        </a>
      </div>
      <div class="events-bottom d-flex flex-row align-items-center justify-content-between mt-auto">
        <span class="temp-hide-el">.</span>
        <span class="pricing">
          <span class="temp-hide-el">.</span>
          <span class="temp-hide-el">.</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.experience-item {
  max-width: 100%;
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.animated-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 470px;
}
.season {
  width: 82px;
  height: 38px;
  background-color: rgba(30, 34, 38, 0.1) !important;
}
.events-bottom {
  background-color: rgba(30, 34, 38, 0.1);
}
.temp-hide-el {
  visibility: hidden;
}
</style>
