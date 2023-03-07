<template>
  <div class="modal show d-block" tabindex="-1" v-if="modal">
    <div class="modal-dialog modal-dialog-centered mt-5">
      <div class="modal-content">
        <!-- <div class="modal-header">
       
      </div> -->
        <div class="modal-body">
          <h4 class="modal-title font-weight-bold mb-3">Covid-19 Notice</h4>
          <p>
            Due to covid 19 we have temporarily paused our services. Our
            membership is currently free to view and all members who have paid
            the $69 annual charge have been refunded.
          </p>

          <p>
            If you would like to join our membership for free and receive
            updates from us please create your account <a  class="link-here text-primary" @click="$router.push({name: 'page-register'}),modal = !modal" >here</a>.
          </p>

          <p>
            If you are an experience provider and you would like us to consider
            your offering in the future please get in touch <a  class="link-here text-primary" @click="$router.push({name: 'page-contact'}),modal = !modal" >here</a>.
          </p>
          <p>
            We look forward to welcoming you all back when the world has gone
            back to normal!
          </p>

          <p>- The Experiential Star Team</p>
        </div>
       
          <button
            type="button"
            class="btn btn-secondary model-button p-3"
            data-bs-dismiss="modal"
            @click="modal = !modal"
          >
            Ok, Thanks!
          </button>
       
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return{
        modal: false
        }
    },
    created(){
        if(!localStorage.getItem("firstUser")){
            this.modal = true
            localStorage.setItem("firstUser",'true')
        }
    }
}
</script>
<style scoped>
.model-button{
      background-image: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
    background-size: 200% auto;
    color: #fff;
    font-size: 13px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    width: 100%;
    border-radius: 0px 0px 4px 4px;
    border: 0;
}
.modal {
    background: #00000073;
}
.link-here{
    cursor: pointer;
}
</style>