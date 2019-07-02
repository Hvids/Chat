<template lang="html">
  <div class="body">
    <div class="container border rouded">
      <div class="row">
        <div class="col">
          <h5>Список чатов</h5>
        </div>
      </div>
      <div class="row" v-for="chat_user in chats_user" v-bind:key="chat_user.name">
        <div class="col">
          <button class="btn btn-ligth" type="button" name="button"> <router-link :to="{ name: 'ChatMessage', params: {login: user.login, name: chat_user.name} }">{{chat_user.name}}</router-link> </button>
          <i class="far fa-calendar"></i>
        </div>
      </div>
    </div>
    <div class="data">
      {{DataUser}}
      {{DataChatsUser}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBody',
  data () {
    return {
      user: {},
      chats_user: []
    }
  },
  methods: {
    getData: function () {
      if (this.user.id) {
        this.$store.dispatch('GET_CHATS_USER', this.user)
        this.chats_user = this.$store.getters.CHATS_USER
      }
    },
    assign_user: function (_user) {
      if (_user.id) {
        this.$store.dispatch('GET_CHATS_USER', _user)
        this.user = _user
      }
    },
    assign_chats_user: function (_chats) {
      this.chats_user = _chats
    }
  },
  created () {
    this.$options.intervar = setInterval(this.getData, 100)
  },
  mounted () {
    this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
  },
  computed: {
    DataUser: function () {
      this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
      var _user = this.$store.getters.USER
      this.assign_user(_user)
      return _user
    },
    DataChatsUser: function () {
      var _chats = this.$store.getters.CHATS_USER
      this.assign_chats_user(_chats)
      return _chats
    }
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  }
}
</script>

<style lang="scss" scoped>
.body{
  display: block;
  margin-top: 50px;
}
.data {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
}
</style>
