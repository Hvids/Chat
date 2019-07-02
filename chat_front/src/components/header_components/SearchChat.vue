<template lang="html">
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-9 col-sm-9 col-md-7 col-lg-5 col-xs-5">
          <input class="form-control" type="text" name="" value="" v-model="search">
        </div>
        <div class="col-1 offset-lg-1">
          <i class="fas fa-binoculars"></i>
        </div>
      </div>
      <div class="row" v-for = "data in chats_search.data" v-bind:key = "data.chat.name">
        <div class="container">
          <div class="row">
            <div class="col" >
                <button class="btn btn-light"  v-on:click="addUserInChat(data)" type="button" name="button">{{data.chat.name}}</button>
            </div>
          </div>
          <div class="row write-password" v-if = "data.write_password">
            <div class="col">
              <p class="lead">Password</p>
              <input class="form-control" type="password" name="" value="" v-model = "password">
              {{error_message}}
              <button class="btn btn-primary" type="button" name="button" v-on:click="joinChat(data)">Присоединиться</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      {{ListChatsAll}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchChat',
  data () {
    return {
      search: '',
      chats_all: [],
      user: {},
      password: '',
      error_message: '',
      chats_search: {
        page: 0,
        data: []
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_CHATS_ALL')
    this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
  },
  computed: {
    ListChatsAll: function () {
      var _chats = this.$store.getters.CHATS_ALL
      var _user = this.$store.getters.USER
      this.assign_user(_user)
      this.assign_chats_all(_chats)
      return _chats
    }
  },
  created () {
    this.$options.intervar = setInterval(this.getData, 600)
  },
  methods: {
    getData: function () {
      this.$store.dispatch('GET_CHATS_ALL')
      this.chats_all = this.$store.getters.CHATS_ALL
    },
    addUserInChat: function (data) {
      data.write_password = !data.write_password
    },
    joinChat: function (data) {
      if (data.chat.password === this.password) {
        data.write_password = false
        this.search = ''
        data.chat.users.push(this.user.id)
        this.$store.dispatch('SAVE_CHAT', data.chat)
        this.$store.dispatch('GET_CHATS_ALL')
        this.$store.dispatch('GET_CHATS_USER', this.user)
      } else {
        this.error_message = 'Вы ввели неправельный пароль'
      }
    },
    assign_chats_all: function (data) {
      this.chats_all = data
    },
    assign_user: function (data) {
      this.user = data
    }
  },
  watch: {
    search: function (val) {
      var arr = {
        write_password: false,
        chat: {}
      }
      this.chats_search.data = []
      this.chats_search.write_password = {}
      for (var i = this.chats_search.page; i < (this.chats_search.page + 5); i++) {
        var j = i % this.chats_all.length
        if (val !== '' && this.chats_all[j].name.indexOf(val) !== -1 && this.chats_all[j].users.indexOf(this.user.id) === -1) {
          arr.chat = this.chats_all[j]
          this.chats_search.data.push(arr)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input,button {
  margin-top: 5px;
    width: 205px;
    display: block;
}
h5{
  margin-top: 5px;
}
i{
  display: block;
  margin-top: 15px;
  margin-bottom: auto;
}
.data {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
}
p{
  font-size: 1rem;
  margin-bottom: 0;
}

</style>
