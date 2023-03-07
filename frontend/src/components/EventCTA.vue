/* eslint-disable prettier/prettier */
<template>
  <div class="bigcta d-none d-lg-block mb-30">
    <h2>Your Adventure Awaits!</h2>
    <p>Learn more about this unique experience.</p>
    <div class="d-flex flex-row justify-content-center">
      <template v-if="event.status == 'active'">
        <template v-if="authenticated">
          <button
            class="experience-view-button"
            type="button"
            v-on:click="recaptcha()"
          >
            View Experience
          </button>
        </template>
        <template v-else>
          <button
            class="experience-view-button"
            type="button"
            v-on:click="toggleTransferModal"
          >
            View Experience
          </button>
        </template>
      </template>
      <template v-else>
        <button
          class="experience-view-button"
          type="button"
          v-on:click="eventExpired"
        >
          Event Expired
        </button>
      </template>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <template v-if="authenticated">
        <button
          type="button"
          class="addbucketlist text-center mt-3"
          @click="addToBucketList(event)"
          id="loginPop"
        >
          Add to Bucket List
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="addbucketlist text-center mt-3"
          @click="addToBucketListGuest()"
          id="loginPop"
        >
          Add to Bucket List
        </button>
      </template>
    </div>
    <!-- <TransferModal></TransferModal> -->
    <div
      class="modal events-popup-modal fade"
      :class="{ show: transferModal }"
      id="eventPopupModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="eventPopupModalTitle"
      aria-hidden="true"
      :style="this.transferModal == true ? 'display: block;' : 'display: none;'"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background-image: url('/images/events-popup-modal-bg.jpg');"
        >
          <div class="modal-body text-left">
            <button
              class="btn btn-danger float-right"
              v-on:click="toggleTransferModal"
            >
              X
            </button>
            <h2 class="modal-title" id="eventPopupModalTitle">
              Before we transfer you to {{ event.name }}
            </h2>
            <p>
              Our members get access to great features that are listed below.
              <br />Sign up for free now, It only takes 20 seconds!
            </p>
            <h4>Member Benefits</h4>
            <ul class="list-unstyled d-flex flex-column">
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>Exclusive member-only perks</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>Invitations to member-only experiences</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>Build and share your bucket-list</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>No fees or contracts</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>No middle-man fee</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>Join over 20,000 adventure seekers</span>
              </li>
              <li class="d-flex flex-row align-items-start">
                <span>
                  <i class="fal fa-check"></i>
                </span>
                <span>It will only take 20 seconds</span>
              </li>
            </ul>

            <div class="d-flex flex-column flex-lg-row events-popup-buttons">
              <router-link
                :to="{ name: 'page-register' }"
                class="events-popup-button gradient-button"
                >Signup as member</router-link
              >
              <button
                class="events-popup-button white-button"
                @click="recaptcha(true)"
              >
                continue without perks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addToBucketList } from '../mixins/addToBucketList'
import { eventActions } from '../mixins/eventActions'

export default {
  mixins: [addToBucketList, eventActions]
}
</script>

<style lang="scss" scoped>
.modal-body h2 {
  display: initial;
}
.experience-view-button {
  margin-bottom: 0px !important;
}
</style>
