<template>
  <div>
    <div class="AboutUs">
      <PageBanner>
        <template slot="title">Contact</template>
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
                            <label for>Name</label>
                            <input
                              type="text"
                              name="userName"
                              class="form-control"
                              v-model="formData.userName"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('userName')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Email</label>
                            <input
                              type="text"
                              name="userEmail"
                              class="form-control"
                              v-model="formData.userEmail"
                            />
                            <p
                              class="text-danger"
                              v-text="errors.get('userEmail')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label for>Inquiry Type</label>
                            <!-- <input
                              type="text"
                              name="userInquryType"
                              class="form-control"
                              v-model="formData.userInquryType"
                            /> -->
                            <select name="userInquryType" class="form-control" v-model="formData.userInquryType">
                              <option value="" selected readonly>Please Select</option>
                              <option value="General Inquiry">General Inquiry</option>
                              <option value="Account Issues">Account Issues</option>
                              <option value="Problem With Site">Problem With Site</option>
                            </select>
                            <p
                              class="text-danger"
                              v-text="errors.get('userInquryType')"
                            ></p>
                          </div>
                        </div>
               
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for>Message</label>
                            <textarea
                              name="userMessage"
                              id
                              cols="30"
                              rows="10"
                              class="form-control"
                              v-model="formData.userMessage"
                            ></textarea>
                            <p
                              class="text-danger"
                              v-text="errors.get('userMessage')"
                            ></p>
                          </div>
                        </div>
                        <div class="col-12 text-right">
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 mt-4">
                          <router-link :to="{ name: 'page-provider-signup'}">
                            <img src="images/provider-signup.png" class="img-fluid rounded" alt="Become a provide today!">
                          </router-link>
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
  </div>
</template>

<script>
import PageBanner from '@/components/PageBanner.vue'
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
    PageBanner
    },
  data() {
    return {
      formData: {
        userName: '',
        userEmail: '',
        userInquryType: '',
        userMessage: ''
      },
      errors: new Errors()
    }
  },
  methods: {
    onSubmit() {
      axios
        .post('/storeContactInquiry', this.formData)
        .then(this.onSuccess)
        .catch(error => this.errors.record(error.response.data['errors']))
    },

    onSuccess() {
      this.$swal({
              title: 'Success!',
              text: 'Your inquiry has been submitted',
              icon: 'success',
              // confirmButtonText: 'Try Again',
              timer: 4500,
              timerProgressBar: true,
              padding: '15px'
              // showConfirmButton: false
            })
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
