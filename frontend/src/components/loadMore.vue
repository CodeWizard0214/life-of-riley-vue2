<template>
  <div>
    <button class="btn btn-info" :type="type" v-on:click="loadMore">
      More {{ type }} Events
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  methods: {
    loadMore() {
      alert('loading more ' + this.type + ' events.')
    }
  }
}
</script>

<style lang="scss" scoped></style>
