<template lang="html">
  <div class="menu">
    <div class="container" style="margin-top:-10px;">
      <div class="row" style="margin-top:0px;">
        <div class="col">
        </div>
        <div class="col-8 col-sm-6 col-lg-4 col-md-5 col-xl-4" style="margin-top:0px;">
            <div class="container register">
              <div class="row">
                <div class="col">
                  <h4>Регистрация</h4>
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
                <div class="col error-message">
                  {{error_message}}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button type="button" class="btn btn-primary enter-button" name="Enter" v-on:click="onRegister">Регистрация</button>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <router-link :to="{ name: 'Home' }">Вход</router-link>
                </div>
              </div>
            </div>
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
      error_message: '',
      action_register: false,
      actiom_push: false,
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister: function () {
      if (this.user.login === '' || this.user.password === '') {
        this.error_message = 'Заполните поля'
      } else {
        this.error_message = ''
        this.action_register = true
        this.$store.dispatch('GET_USERS_LOGIN', this.user)
      }
    },
    enter: function (users) {
      if (this.action_register) {
        if (users.length === 0) {
          this.error_message = ''
          this.$store.dispatch('POST_USER', this.user)
          this.$store.dispatch('SET_CHATS_USER', [])
          this.$router.push({name: 'Chat', params: {login: this.user.login}})
          window.location.reload()
          this.actiom_push = true
        }
        if (!this.actiom_push && users.length === 0) {
          this.error_message = 'Пользователь уже существует'
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS_LOGIN', this.user)
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
.register {
  margin-top:0px;
  background-color: white;
  border-radius: 10px;
}
.error-message {
  color: red;
}
button,
input {
    width: 205px;
    display: block;
    margin-left: auto;
    margin-right: 0;
}
p{
  font-size: 1rem;
}
.enter-button {
    margin-bottom: 50px;
}
div {
    margin-top: 10px;
}
.computed{
  opacity: 0;
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
