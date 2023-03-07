<template>
  <div
    class="experience-filter d-md-flex flex-column justify-content-center col-5 col-md-2 col-sm-2 pr-0"
  >
    <div
      class="experience-filter-group d-flex flex-row align-items-center justify-content-end"
    >
      <!-- <button
        class="filter-item-button filter-tab"
        v-for="(button, index) in buttons"
        v-bind:key="index"
        v-text="button.name"
        v-bind:class="{ 'button-selected': button.active }"
        v-on:click="toggleActive(button)"
      ></button>-->
      <multiselect
        @select="toggleActive"
        v-model="selected"
        track-by="id"
        label="name"
        placeholder="Select"
        :options="buttons"
        :searchable="false"
        :allow-empty="false"
        class="customFont"
        :showLabels="false"
      ></multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  data() {
    return {
      selected: '',
      buttons: [
        { id: 1, name: 'Upcoming', active: false },
        { id: 2, name: 'New', active: false },
        { id: 3, name: 'Trending', active: false },
        { id: 4, name: 'Expiring Soon', active: false }
      ]
      // isActive: false
    }
  },
  methods: {
    toggleActive(button) {
      // this.buttons.forEach(e => {
      //   e.active = false
      // })
      // let item = this.buttons[index]
      // item.active = !item.active
      // this.$set(this.buttons, index, item)
      this.buttons.forEach(e => {
        e.active = false
      })
      button.active = !button.active
      this.$emit('filterEvents', button)
    }
  },
  mounted() {
    if (this.activeId) {
      // this.buttons.find(button => button.id === this.activeId).active = true
      this.selected = this.buttons.find(button => button.id === this.activeId)
    }
  },
  props: {
    activeId: Number
  },
  components: {
    Multiselect
  }
}
</script>

<style>
.customFont span.multiselect__single {
  font-size: 18px !important;
  font-weight: 700;
  margin-bottom: 0px;
  line-height: 32px !important;
}
.experience-filter.pr-0 {
  padding-right: 0;
}
.exterience-featured-search .experience-filter {
  position: inherit !important;
  margin-left: auto;
  margin-bottom: 15px !important;
}
@media (max-width: 480px) {
  .experience-filter {
    top: 20px;
  }
  .customFont span.multiselect__single {
    font-size: 12px !important;
  }
  .multiselect__option {
    padding: 10px;
    min-height: 30px;
    line-height: 14px;
    font-size: 12px;
  }
}
@media (max-width: 768px) {
  .home-experience .exterience-featured .filter-title {
    /* width: min-content; */
    /* margin-right: auto; */
    font-size: 20px;
    line-height: 28px;
  }
  /* .filter-title span {
    display: none;
  } */
  .filterbuttonmob {
    position: absolute;
    right: 0;
  }
  .experience-filter {
    /* position: absolute;
  right: 0;
  width: fit-content;
  top: 0x; */
    margin-left: auto;
    position: relative;
    top: 52px;
  }

  @media (max-width: 576px) {
    .experience-filter {
      top: 12px;
    }
    .home-experience .exterience-featured .filter-title {
      margin-top: -20px;
      margin-bottom: 15px;
    }
  }
}

.experience-filter-group .multiselect__select::before {
  color: #fff;
}
</style>
