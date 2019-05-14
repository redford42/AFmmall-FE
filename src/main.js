// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Layout from './components/Layout'
import router from './router'
import IndexPage from './pages/Index'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  store,
  router,
  components: { App, Layout, IndexPage },
  template: '<App/>',
  methods: {
    alert (msg) {
      console.log(msg)
    }
  }
})
