import './mock'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './api'
import './directives'
import app from './eventBus'
Vue.prototype.$bus = app
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
