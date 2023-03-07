<template>
  <section class="slider-container">
    <a class="slider-button previous-slide" v-on:click.prevent="showPrevious">
      <i class="far fa-chevron-left" aria-hidden="true"></i>
    </a>
    <div class="row d-block d-sm-none">
      <div class="col-12">
        <ViewMoreEventsButton :eventType="eventType" v-if="showViewAll" />
      </div>
    </div>
    <div class="experience-row container">
      <!-- <VueSlickCarousel ref="eventCarousel" :infinite="false" v-bind="sliderSettings" :slidesToShow="5" v-if="events.length" :arrows="false"> -->
      <div class="row d-none d-sm-block">
        <div class="col-12">
          <ViewMoreEventsButton :eventType="eventType" v-if="showViewAll" />
        </div>
      </div>
      <VueSlickCarousel
        ref="eventCarousel"
        :infinite="true"
        :slidesToShow="3"
        :arrows="false"
        v-bind="sliderSettings"
      >
        <template v-if="events.length === 0">
          <PlaceHolderCard v-for="index in 12" :key="index" />
        </template>
        <EventCard v-for="event in events" :key="event.id" :event="event" />
        <!-- <ViewAllButtonCard :eventType="eventType" v-if="showViewAll" /> -->
      </VueSlickCarousel>
    </div>
    <a class="slider-button next-slide" v-on:click.prevent="showNext">
      <i class="far fa-chevron-right" aria-hidden="true"></i>
    </a>
  </section>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
// import ViewAllButtonCard from '@/components/ViewAllButtonCard.vue'
import ViewMoreEventsButton from '@/components/ViewMoreEventsButton.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import PlaceHolderCard from '@/components/PlaceHolderCard.vue'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  data() {
    return {
      sliderSettings: {
        autoplay: false,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 1599,
            settings: {
              autoplay: false,
              arrows: false,
              dots: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 1023,
            settings: {
              autoplay: false,
              arrows: false,
              dots: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 767,
            settings: {
              autoplay: false,
              arrows: false,
              dots: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 575,
            settings: {
              autoplay: false,
              arrows: false,
              dots: false,
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  components: {
    EventCard,
    VueSlickCarousel,
    PlaceHolderCard,
    // ViewAllButtonCard,
    ViewMoreEventsButton
  },
  props: {
    events: Array,
    showViewAll: Boolean,
    eventType: String
  },
  methods: {
    showNext() {
      this.$refs.eventCarousel.next()
    },
    showPrevious() {
      this.$refs.eventCarousel.prev()
    }
  }
}
</script>
