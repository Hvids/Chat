<template lang="html">
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-6" v-if="write_see">
          Имя
          <input class="form-control" type="text" name="" value="" v-model="chat.name">
          Пароль
          <input class="form-control" type="password" name="" value="" v-model="chat.password">
          <button class="btn btn-success" type="button" name="button" v-on:click="createChat">Создать</button>
            <p class="lead error">{{error_message}}</p>
        </div>
        <div class="col-1">
          <button class="btn btn-primary add" type="button" name="button" v-on:click="addChat">{{button_text}}</button>
        </div>
      </div>
    </div>
    <div class="data">
      {{data}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddChat',
  data () {
    return {
      user: {},
      write_see: false,
      create_action: false,
      button_text: '+',
      error_message: '',
      chat: {
        name: '',
        password: '',
        user_created: '',
        date_created: '',
        users: []
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USER_LOGIN', this.$route.params)
  },
  computed: {
    data: function () {
      var _user = this.$store.getters.USER
      var _chats = this.$store.getters.CHATS
      this.assign_user(_user)
      this.create(_chats)
      return _user
    }
  },
  methods: {
    addChat: function () {
      if (this.write_see) {
        this.button_text = '+'
      } else {
        this.button_text = '-'
      }
      this.write_see = !this.write_see
      this.chat.user_created = this.user.id
    },
    createChat: function () {
      if (this.chat.name !== '' && this.chat.password !== '') {
        this.create_action = true
        this.$store.dispatch('GET_CHATS_NAME', this.chat)
      } else {
        this.error_message = 'Заполните все поля'
      }
    },
    assign_user: function (data) {
      this.user = data
    },
    create: function (chats) {
      if (this.create_action) {
        if (chats.length === 0) {
          this.error_message = ''
          this.create_action = false
          this.write_see = false
          this.button_text = '-'
          this.chat.users.push(this.user.id)
          var chatpost = {
            name: this.chat.name,
            password: this.chat.password,
            user_created: this.chat.user_created,
            date_created: '',
            users: this.chat.users
          }
          this.$store.dispatch('POST_CHAT', chatpost)
          this.$store.dispatch('GET_CHATS_USER', this.user)
          this.$store.dispatch('GET_CHATS_ALL')
          this.chat.name = ''
          this.chat.password = ''
        } else {
          this.error_message = 'Такой чат уже есть'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add{
  display: block;
  margin-left: auto;
  margin-right: 5px;
  width: 35px
}
p{
  font-size: 1rem;
}
.error{
  color: red
}
input,button {
  margin-top: 5px;
    width: 205px;
    display: block;
}
.col-1{
  display: block;
  margin-left: auto;
  margin-right: 10px;
}
.col-6 {
  display: block;
  margin-left: auto;
  margin-right: 0px;
}
.data {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
}
@media screen and (max-width:375px){
  .col-6 {
    display: block;
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
