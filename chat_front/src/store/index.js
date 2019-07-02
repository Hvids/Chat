import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user.js'
import chat from '@/store/chat.js'
import message from '@/store/message.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    chat,
    message
  }
})
export default store
