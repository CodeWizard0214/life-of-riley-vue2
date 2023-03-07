<template>
  <div>
    <div class="AboutUs">
      <PageBanner>
        <template slot="title">Provider Signup</template>
      </PageBanner>
      <div class="container">
        <div
          class="container-fluid aboutus"
          style="background-image: url(images/World_map_green.png);"
        >
          <div class="row">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <p class="mb-5 d-block">
                    Thank you for getting in touch with Experiential Star. Our
                    experiences are only as good as the people who find them. If
                    you would like to suggest an experience please use the form
                    below.
                  </p>
                </div>
                <div class="col-12">
                  <div class="about-content">
                    <form
                      action
                      @submit.prevent="onSubmit"
                      @keydown="errors.clear($event.target.name)"
                    >
                      <div class="row">
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Experience Name</label>
                            <input
                              type="text"
                              name="expName"
                              class="form-control"
                              v-model="formData.expName"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('expName')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Experience Website</label>
                            <input
                              type="text"
                              name="expWebsite"
                              class="form-control"
                              v-model="formData.expWebsite"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('expWebsite')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Date</label>
                            <input
                              type="text"
                              name="expDate"
                              class="form-control"
                              v-model="formData.expDate"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('expDate')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Rough Cost</label>
                            <input
                              type="text"
                              name="expCost"
                              class="form-control"
                              v-model="formData.expCost"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('expCost')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Location</label>
                            <input
                              type="text"
                              name="expLocation"
                              class="form-control"
                              v-model="formData.expLocation"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('expLocation')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Your Email</label>
                            <input
                              type="text"
                              name="yourEmail"
                              class="form-control"
                              v-model="formData.yourEmail"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('yourEmail')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for>Description of experience</label>
                            <textarea
                              name="expSummary"
                              id
                              cols="30"
                              rows="10"
                              class="form-control"
                              v-model="formData.expSummary"
                            ></textarea>
                            <p
                              class="text-danger"
                              v-text="errors.get('expSummary')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-12 text-right">
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SignUp></SignUp>
  </div>
</template>

<script>
import PageBanner from '@/components/PageBanner.vue'
import SignUp from '@/components/SignUp.vue'
import axios from 'axios'
import metaInfoMixin from '../mixins/metaInfo'

class Errors {
  constructor() {
    this.errors = {}
  }

  get(field) {
    // console.log(field)
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  record(errors) {
    this.errors = errors
    console.log(this.errors)
  }

  clear(field) {
    delete this.errors[field]
  }
}

export default {
  mixins: [metaInfoMixin],
  components: {
    PageBanner,
    SignUp
  },
  data() {
    return {
      formData: {
        expName: '',
        expWebsite: '',
        expDate: '',
        expCost: '',
        expLocation: '',
        yourEmail: '',
        expSummary: ''
      },
      errors: new Errors()
    }
  },
  methods: {
    onSubmit() {
      axios
        .post('/storeContact', this.formData)
        .then(this.onSuccess)
        .catch(error => this.errors.record(error.response.data['errors']))
    },

    onSuccess() {
      this.$swal('Your suggestion has been submitted - Thank you!')
    }
  },
  created() {
    this.setMetaInfo({
      title: 'Contact Us | Experiential Star',
      desc:
        'Get in touch with us and submit your ideas for a new adventure that you would like to see on the site',
      keywords: '',
      img: '',
      url: window.location.href
    })
  }
}
</script>

<style lang="scss" scoped></style>
