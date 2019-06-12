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
    // manager
    getOrderList ({commit}, data) {
      if (data === null) {
        data = {
          pageNum: 1,
          pageSize: 8
        }
      }
      return new Promise((resolve, reject) => {
        request.get('/manage/order/list.do', {
          params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize
          }
        })
          .then((result) => {
            commit('setOrderList', result)
            return resolve(result)
          }).catch(reject)
      })
    },
    detailOrder ({commit}, orderNo) {
      return new Promise((resolve, reject) => {
        request.get('/manage/order/detail.do', {
          params: {
            orderNo: orderNo
          }
        })
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    sendOrder ({commit}, orderNo) {
      return new Promise((resolve, reject) => {
        request.get('/manage/order/send_goods.do', {
          params: {
            orderNo: orderNo
          }
        })
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    searchOrder ({commit}, data) {
      return new Promise((resolve, reject) => {
        request.get('/manage/order/search.do', {
          params: {
            orderNo: data.orderNo,
            pageNum: data.pageNum,
            pageSize: data.pageSize
          }
        })
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },

    // user
    listOrder ({commit}, data) {
      console.log('listOrder', data)
      if (data === undefined || data === null) {
        data = {
          pageNum: 1,
          pageSize: 8
        }
      }
      return new Promise((resolve, reject) => {
        request.get('/user/order/list.do', {
          params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize
          }
        })
          .then((result) => {
            commit('setOrderList', result.data.list)
            return resolve(result.data)
          }).catch(reject)
      })
    },
    createOrder ({commit}, shippingId) {
      return new Promise((resolve, reject) => {
        request.get('/user/order/create.do', {
          params: {
            shippingId: shippingId
          }
        })
          .then((result) => {
            return resolve(result.data)
          }).catch(reject)
      })
    },
    payOrder ({commit}, orderNo) {
      return new Promise((resolve, reject) => {
        request.get('/user/order/pay.do', {
          params: {
            orderNo: orderNo
          }
        })
          .then((result) => {
            console.log('payOrder', result)
            return resolve(result.data)
          }).catch(reject)
      })
    },
    queryOrder ({commit}, orderNo) {
      return new Promise((resolve, reject) => {
        request.get('/user/order/alipay_query.do', {
          params: {
            orderNo: orderNo
          }
        })
          .then((result) => {
            console.log('payOrder', result)
            return resolve(result.data)
          }).catch(reject)
      })
    }

  }
}
