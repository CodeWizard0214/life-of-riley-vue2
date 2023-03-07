<template>
  <div>
    <button class="btn btn-danger" :type="type" v-on:click="loadLess">Less {{ type }} Events</button>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  methods: {
    loadLess() {
      alert('loading less ' + this.type + ' events.')
    }
  }
}
</script>

<style lang="scss" scoped></style>
