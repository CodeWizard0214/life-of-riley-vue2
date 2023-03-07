<template>
  <div>
    <div class="AboutUs">
      <div class="container">
        <!-- <h3 class="text-center">Messaging</h3> -->
        <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Inbox</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input
                      v-model.trim="searchText"
                      type="text"
                      class="search-bar"
                      placeholder="Search"
                    />
                    <span class="input-group-addon">
                      <button type="button">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="inbox_chat">
                <div
                  :class="{
                    chat_list: true,
                    selected: selectedTicket.id === item.id
                  }"
                  v-for="item in searchResults"
                  :key="item.id"
                  v-on:click="getConversations(item)"
                >
                  <div class="chat_people">
                    <div class="chat_img">
                      <img src="/images/inbox-item.png" alt="Conversation" />
                    </div>
                    <div class="chat_ib">
                      <h5>{{ item.subject }}</h5>
                      <h5>{{ item.status }}</h5>
                      <!-- <p v-text="item.content"></p> -->
                      <h5>
                        <span class="chat_date">{{ item.created_at | formatDate }}</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mesgs">
              <InboxConversation
                :conversations="conversations"
                :user="user"
                :isLoading="isLoading"
              />

              <div v-if="selectedTicket" class="type_msg">
                <div class="input_msg_write">
                  <input
                    v-model="textMessage"
                    type="text"
                    class="write_msg"
                    placeholder="Type a message"
                  />
                  <button
                    :title="!textMessage ? 'Type a message' : 'Send'"
                    @click="sendMessage()"
                    @keyup.enter="sendMessage()"
                    :disabled="!textMessage"
                    class="msg_send_btn"
                    type="button"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
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
import EventService from '@/services/EventService.js'
import { mapGetters } from 'vuex'
import { formatDate, formatTime } from '../utils/filters'
import InboxConversation from '@/components/InboxConversation.vue'
import metaInfoMixin from '../mixins/metaInfo';

export default {
  mixins: [metaInfoMixin],
  filters: {
    formatDate
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    searchResults() {
      const text = this.searchText.toLowerCase()
      if (text) {
        return [...this.inboxItems].filter(item => {
          if (item.subject.toLowerCase().indexOf(text) !== -1) {
            return true
          } else if (item.content.toLowerCase().indexOf(text) !== -1) {
            return true
          }
          return false
        })
      }
      return [...this.inboxItems]
    }
  },
  data() {
    return {
      inboxItems: [],
      conversations: [],
      isLoading: false,
      selectedTicket: '',
      textMessage: '',
      searchText: ''
    }
  },
  methods: {
    getConversations(ticket) {
      this.conversations = []
      this.selectedTicket = ticket
      this.isLoading = true
      EventService.getConversations(ticket.id)
        .then(response => {
          this.isLoading = false
          this.conversations = response.data
        })
        .catch(error => {
          this.isLoading = false
          console.log('There was an error:', error.response)
        })
      EventService.readConversation(ticket.id)
        .then(() => {
          // console.log(response)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    sendMessage() {
      this.isLoading = true
      const data = {
        status: 'open',
        content: this.textMessage,
        ticket_id: this.selectedTicket.id
      }
      EventService.sendMessage(data)
        .then(() => {
          this.conversations.push({
            id: Date.parse(new Date()),
            content: this.textMessage,
            created_at: formatTime(new Date().toISOString()),
            user_id: this.user.id
          })
          this.textMessage = ''
          this.isLoading = false
          // this.inboxItems = response.data;
        })
        .catch(error => {
          this.isLoading = false
          console.log('There was an error:', error.response)
        })
    }
  },
  created() {
    EventService.getInboxByUserId(this.user.id)
      .then(response => {
        this.inboxItems = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    this.setMetaInfo({
      title: 'Inbox',
      desc: '',
      keywords: '',
      img: '',
      url: window.location.href,
    })
  },
  components: {
    InboxConversation
  }
}
</script>

<style lang="scss" scoped>
// .AboutUs {
//   padding-top: 50px;
//   padding-bottom: 50px;
// }

.container {
  max-width: 1170px;
  margin: auto;
}

img {
  max-width: 100%;
}

.inbox_people {
  background: transparent none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}

.inbox_msg {
  // border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}

.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}

.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #1e2226;
  font-size: 21px;
  margin: auto;
}

.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}

.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}

.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}

.chat_ib h5 span {
  font-size: 13px;
  float: left;
  margin-top: 5px;
}

.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}

.chat_img {
  float: left;
  width: 11%;
}

.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}

.chat_list {
  border-bottom: 1px solid #f7f7f7;
  margin: 0;
  padding: 18px 16px 10px;
  cursor: pointer;
}
.chat_list.selected {
  background: #e7e7e7;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #f1f2f6;
}

.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}

.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}

.messaging {
  padding: 0 0 0px 0;
}

.msg_send_btn:disabled {
  cursor: not-allowed;
  background: #7f7f7f;
}
</style>
