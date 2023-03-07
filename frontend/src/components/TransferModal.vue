<template>
  <div
    class="modal events-popup-modal fade"
    id="eventPopupModal"
    tabindex="-1"
    role="dialog"
    style="display: block"
    aria-labelledby="eventPopupModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div
        class="modal-content"
        style="background-image: url('/images/events-popup-modal-bg.jpg');"
      >
        <div class="modal-body">
          <h2
            class="modal-title"
            id="eventPopupModalTitle"
          >Before we transfer you to Experienc Title</h2>
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
            <a
              class="events-popup-button gradient-button"
              href="javascript:void(0);"
            >continue as member</a>
            <button class="events-popup-button white-button">continue as guest</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>

<style lang="scss" scoped></style>
