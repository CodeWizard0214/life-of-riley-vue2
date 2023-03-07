<template>
  <div class="msg_history">
    <i v-if="isLoading" class="fas fa-circle-notch fa-spin"></i>
    <span v-for="message in conversations" :key="message.id">
      <div v-if="message.user_id === user.id" class="outgoing_msg">
        <div class="sent_msg">
          <p v-text="message.content"></p>
          <span class="time_date">{{ message.created_at | formatTime }}</span>
        </div>
      </div>
      <div v-else class="incoming_msg">
        <div class="incoming_msg_img">
          <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
        </div>
        <div class="received_msg">
          <div class="received_withd_msg">
            <p v-text="message.content"></p>
            <span class="time_date">{{ message.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { formatTime } from '../utils/filters'
export default {
  filters: {
    formatTime
  },
  props: {
    conversations: Array,
    user: Object,
    isLoading: Boolean
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}

.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}

.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

.received_withd_msg {
  width: 57%;
}

.sent_msg p {
  background: #0086ff none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}

.sent_msg {
  float: right;
  width: 46%;
}

.fas.fa-circle-notch.fa-spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.msg_history {
  height: 516px;
  overflow-y: auto;
  position: relative;
}
</style>
