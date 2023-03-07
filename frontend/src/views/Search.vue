<template>
  <div>
    <div class="AboutUs">
      <PageBanner>
        <template slot="title">Search</template>
      </PageBanner>
      <div class="container-fluid tarms-conditions">
        <div class="row">
          <div class="container">
            <input
              type="text"
              name
              v-model="state"
              id
              autocomplete="off"
              class="form-control z-10"
              @input="filterStates"
              @focus="modal = true"
              placeholder="Search for a state..."
            />
            <div v-if="filteredStates && modal" class="results z-10">
              <ul class="list">
                <li
                  v-for="filteredState in filteredStates"
                  :key="filteredState.id"
                  @click="setState(filteredState)"
                >{{ filteredState.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageBanner from '@/components/PageBanner.vue'
export default {
  components: {
    PageBanner
  },
  data() {
    return {
      state: '',
      modal: false,
      states: [
        {
          id: 1,
          name: 'Alaska'
        },
        {
          id: 2,
          name: 'Alabama'
        },
        {
          id: 3,
          name: 'Florida'
        }
      ],
      filteredStates: []
    }
  },
  methods: {
    filterStates() {
      this.filteredStates = this.states.filter(state => {
        // return state.name.toLowerCase().startsWith(this.state.name.toLowerCase())
        return state.name.toLowerCase().startsWith(this.state.toLowerCase())
      })
    },
    setState(state) {
      this.state = state.name
      this.modal = false
    }
  }
}
</script>

<style lang="scss">
.list {
  background-color: #e7e7e7;
}
.list li {
  list-style: none;
  cursor: pointer;
  padding-top: 15px;
  padding-bottom: 15px;
}

.wrapper {
  position: absolute;
  background-color: red;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0 !important;
}

.z-10 {
  z-index: 10 !important;
}
</style>

states: [ { id: 1, name: 'Alaska' }, { id: 2, name: 'Alabama' }, { id: 3, name:
'Florida' } ],
