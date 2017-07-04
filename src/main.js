/* jshint esversion: 6 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import 'font-awesome/css/font-awesome.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(MintUI)

import routes from './routes.js'
const router = new VueRouter({
  mode: 'history',
  base: 'dashboard',
  // base: __dirname,
  routes // （缩写）相当于 routes: routes
})

new Vue({
  router ,
  render: h => h(App)
}).$mount('#app')
