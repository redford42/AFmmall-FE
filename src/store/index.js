import Vue from 'vue'
import Vuex from 'vuex'
import categoryAPI from './API/categoryAPI'
import userAPI from './API/userAPI'
import productAPI from './API/productAPI'
import cartAPI from './API/cartAPI'
import orderAPI from './API/orderAPI'
import shippingAPI from './API/shippingAPI'
Vue.use(Vuex)

const state = {
  httpError: {
    hasError: false,
    status: '',
    statusText: ''
  }
}

const mutations = {
  ON_HTTP_ERROR (state, payload) {
    state.httpError = payload
  }
}

export default new Vuex.Store({
  namespaced: true,
  modules: {
    categoryAPI,
    userAPI,
    productAPI,
    cartAPI,
    orderAPI,
    shippingAPI
  },
  state,
  mutations
})
