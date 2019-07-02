// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueTimers from 'vue-timers'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueTimers)
Vue.use(VueCookies)
VueCookies.config('7d')

// set global cookie
VueCookies.set('theme', 'default')
VueCookies.set('hover-time', '1s')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
