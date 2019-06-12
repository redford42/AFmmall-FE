import request from '../../api/request'

export default {
  namespaced: true,
  state: {
    shippingList: null
  },
  mutations: {
    setShippingList (state, list) {
      state.shippingList = list
      console.log(list)
    }
  },
  actions: {
    getShippingList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/user/shipping/list.do')
          .then((result) => {
            commit('setShippingList', result.data.list)
            return resolve(result.data.list)
          }).catch(reject)
      })
    },
    selectShipping ({commit}, shippingId) {
      return new Promise((resolve, reject) => {
        request.get('/user/shipping/select.do', {
          params: {
            shippingId: shippingId
          }
        })
          .then((result) => {
            commit('setShippingList', result.data.list)
            return resolve(result.data.list)
          }).catch(reject)
      })
    },
    addShippingList ({commit}, shipping) {
      return new Promise((resolve, reject) => {
        request.post('/user/shipping/add.do', shipping)
          .then((result) => {
            commit('setShippingList', result.data.list)
            return resolve(result)
          }).catch(reject)
      })
    },
    updateShippingList ({commit}, shipping) {
      return new Promise((resolve, reject) => {
        request.post('/user/shipping/update.do', shipping)
          .then((result) => {
            console.log('updateShippingList', result)
            return resolve(result)
          }).catch(reject)
      })
    },
    deleteShippingList ({commit}, shippingId) {
      return new Promise((resolve, reject) => {
        request.get('/user/shipping/delete.do', {
          params: {
            shippingId: shippingId
          }
        })
          .then((result) => {
            console.log('deleteShippingList', result)
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
