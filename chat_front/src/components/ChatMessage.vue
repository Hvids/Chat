<template lang="html">
  <div class="">
    <div class="container menu">
      <div class="row">
        <div class="col" >
          <div class="" v-if = "user.login">
            <router-link :to="{ name: 'Chat', params: {login: user.login} }"><i class="fas fa-archive"></i></router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col message">
          <h5>Сообщения</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-1" v-on:click="getAllMessages">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="col-1">
          <i class="fas fa-angle-double-down" v-on:click="Scroll"></i>
        </div>
      </div>
      <div class="container rounded border">
        <div class="row justify-content-center" v-for="i in randge" v-bind:key="i">
          <div class="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 align-self-center">
            <div class="" v-if="messages_chat[i] && users[messages_chat[i].user]">
              <div class="my-message" v-if ="users[messages_chat[i].user].login==user.login">
                  <h5>{{users[messages_chat[i].user].login}}</h5>
                <p class="lead">{{messages_chat[i].text}}</p>
              </div>
              <div class="no-my-message" v-else>
                  <h5>{{users[messages_chat[i].user].login}}</h5>
                <p class="lead">{{messages_chat[i].text}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-input">
        <div class="col">
          <textarea v-on:keyup.ctrl.enter="sendMessage" name="name" rows="2" cols="31" v-model="message_text"></textarea>
        </div>
        <div class="col-1 i">
          <i class="fas fa-comment" v-on:keyup.ctrl.enter="sendMessage"  v-on:click="sendMessage"></i>
        </div>
      </div>
    </div>
    <div class="data">
      {{DataUser}}
      {{DataChat}}
      {{DataUsersChat}}
      {{DataMessagesChat}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  data () {
    return {
      messages_list: {
        action: false,
        start: 0,
        end: 5
      },
      action_scroll: false,
      date: '',
      message: {},
      message_text: '',
      chat: {},
      user: {},
      users: {},
      messages_chat: [],
      message_send: {
        text: '',
        user: '',
        chat: ''
      }
    }
  },
  created () {
    this.$options.interval = setInterval(this.getData, 300)
    this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
    this.$store.dispatch('GET_CHAT_NAME', this.$route.params)
  },
  mounted () {
    this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
    this.$store.dispatch('GET_CHAT_NAME', this.$route.params)
  },
  computed: {
    DataUser: function () {
      var _user = this.$store.getters.USER
      this.assign_user(_user)
      return this.user
    },
    DataChat: function () {
      var _chat = this.$store.getters.CHAT
      this.assign_chat(_chat)
      return this.chat
    },
    DataUsersChat: function () {
      var data = this.$store.getters.USERS_CHAT
      this.assign_users_chat(data)
      return this.users
    },
    randge: function () {
      var arr = []
      for (var i = this.messages_list.start; i <= this.messages_list.end; i++) {
        arr.push(i)
      }
      return arr
    },
    DataMessagesChat: function () {
      var messagesChat = this.$store.getters.MESSAGES_CHAT
      this.assign_messages_chat(messagesChat)
      return this.messages_chat
    }
  },
  methods: {
    getAllMessages: function () {
      this.messages_list.action = true
      this.messages_list.start = 0
      this.messages_list.end = this.messages_chat.length - 1
    },
    Scroll: function () {
      window.scrollTo(0, document.body.scrollHeight)
      return window
    },
    getData: function () {
      if (this.chat.id) {
        this.$store.dispatch('GET_MESSAGES_CHAT', this.chat)
        this.messages_chat = this.$store.getters.MESSAGES_CHAT
        this.$store.dispatch('GET_USERS_CHAT', this.chat)
        var data = this.$store.getters.USERS_CHAT
        this.assign_users_chat(data)
        if (!this.messages_list.action) {
          if (this.messages_chat.length - 1 < 0) {
            this.messages_list.end = 0
          } else {
            this.messages_list.end = this.messages_chat.length - 1
          }
          if (this.messages_chat.length - 11 < 0) {
            this.messages_list.start = 0
          } else {
            this.messages_list.start = this.messages_chat.length - 6
          }
        }
      }
    },
    sendMessage: function () {
      if (this.message_text !== '') {
        this.message_send.user = this.user.id
        this.message_send.chat = this.chat.id
        this.message_send.text = this.message_text
        this.$store.dispatch('POST_MESSAGE', this.message_send)
        this.$store.dispatch('GET_MESSAGES_CHAT', this.chat)
        this.message_text = ''
        this.messages_chat = this.$store.getters.MESSAGES_CHAT
      }
    },
    assign_user: function (_user) {
      this.user = _user
    },
    assign_chat: function (_chat) {
      this.chat = _chat
      this.$store.dispatch('GET_USERS_CHAT', _chat)
      if (_chat.id) {
        this.$store.dispatch('GET_MESSAGES_CHAT', _chat)
      }
    },
    assign_users_chat: function (data) {
      for (var i = 0; i < data.length; i++) {
        this.users[data[i].id] = data[i]
      }
    },
    assign_messages_chat: function (messagesChat) {
      this.messages_chat = messagesChat
    }
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  }
}
</script>

<style lang="scss" scoped>
.text-input{
  margin-top: 10px;
}
.i{
  margin-left: -65px;
  margin-right: -15px;
}
textarea{
  display: block;
  width: 100%;
}
.boder{
  border: 10px;
}
.message {
  text-align: center;
  color: #FFFAFA;
  background-color: #87CEEB;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.down{
  display: block;
  position: fixed;
}
p{
  font-size: 1rem
}
i{
  margin-left: 10px;
  padding-bottom: 10px;
}
.my-message {
  text-align: right;
  p{
    padding-right: 30px;
  }
}
.no-my-message {
  text-align: left;
  p{
    padding-left: 30px;
  }
}
.menu{
  border-radius: 15px;
  background-color: white;
}
.data {
  position: absolute;
  top: -9999px;
  opacity: 0;
}
</style>
