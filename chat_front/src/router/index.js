import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Enter from '@/components/Enter'
import Chat from '@/components/Chat'
import ChatMessage from '@/components/ChatMessage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  history: 'true',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chat/:login',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/enter',
      name: 'Enter',
      component: Enter
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/chat/:login/:name',
      name: 'ChatMessage',
      component: ChatMessage
    }
  ]
})
