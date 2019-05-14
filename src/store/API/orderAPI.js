import request from '../../api/request'

export default {
  namespaced: true,
  state: {
    orderList: null
  },
  mutations: {
    setOrderList (state, list) {
      state.orderList = list
      console.log(list)
    }
  },
  actions: {
    getOrderList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/manage/order/list.do')
          .then((result) => {
            commit('setOrderList', result)
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
