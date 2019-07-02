<template lang="html">
  <div class="menu">
    <div class="container">
      <div class="row">
        <div class="col">
          <h4>Войдите</h4>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <p class="lead">{{login_text}}</p>
        </div>
        <div class="col">
            <input class="form-control" type="text" name="" value="" v-model="user.login">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="lead">{{password_text}}</p>
        </div>
        <div class="col">
          <input class="form-control" type="password" name="" value="" v-model="user.password">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="lead error-message">{{error_message}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-primary" name="Enter" v-on:click="onEnter">Вход</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link :to="{ name: 'Register' }">Регистрация</router-link>
        </div>
      </div>
    </div>
    <div class="computed">
      {{User}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      login_text: 'Логин',
      password_text: 'Пароль',
      login: '1',
      error_message: '',
      action_enter: false,
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    onEnter: function () {
      if (this.user.login === '' || this.user.password === '') {
        this.error_message = 'Заполните поля'
      } else {
        this.action_enter = true
        this.$store.dispatch('GET_USERS', this.user)
      }
    },
    enter: function (users) {
      if (this.action_enter) {
        if (users.length === 0) {
          this.error_message = 'Введен невырный логин или пароль'
        } else if (users.length === 1) {
          this.$store.dispatch('SET_USERS', [])
          this.$store.dispatch('SET_CHATS_USER', [])
          this.$store.dispatch('SET_USER', this.user)
          this.$store.dispatch('GET_USERS_CHAT', this.user)
          this.$router.push({name: 'Chat', params: {login: this.user.login}})
          window.location.reload()
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS', this.user)
  },
  computed: {
    User: function () {
      var users = this.$store.getters.USERS
      this.enter(users)
      return users
    }
  }
}
</script>

<style lang="scss" scoped>
button,
input {
    width: 205px;
    display: block;
    margin-left: auto;
    margin-right: 0;
}
button {
  margin-bottom: 50px;
}
p{
  font-size: 1rem;
}
div {
    margin-top: 10px;
}
.computed{
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
}
.menu {
  background-color: white;
  border-radius: 10px;
}
.error-message{
  color: red;
}
@media only screen and (max-width: 1091px) {
    input,button{
      margin-left: auto;
      margin-right: auto;
   }
 }
 @media only screen and (max-width: 633px) {
   input,button{
     margin-left: auto;
     margin-right: 0;
  }
 }
 @media only screen and (max-width: 578px) {
   input,button{
     margin-left: auto;
     margin-right: auto;
  }
 }
</style>
