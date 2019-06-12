import request from '../../api/request'

export default {
  namespaced: true,
  state: {
    cartList: null
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
      console.log('cartMutations', list)
    }
  },
  actions: {
    getCartList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/user/cart/list.do')
          .then((result) => {
            console.log('cartAPI=======>', result.data)
            commit('setCartList', result.data)
            return resolve(result.data)
          }).catch(reject)
      })
    },
    addCartList ({commit}, {productId, count}) {
      return new Promise((resolve, reject) => {
        request.get('/user/cart/add.do', {
          params: {
            productId: productId,
            count: count
          }
        })
          .then((result) => {
            console.log('cartAPI=======>', result.data)
            commit('setCartList', result.data)
            return resolve(result.data)
          }).catch(reject)
      })
    },
    updateCartList ({commit}, {productId, count}) {
      return new Promise((resolve, reject) => {
        request.get('/user/cart/update.do', {
          params: {
            count: count,
            productId: productId
          }
        }).then(data => {
          console.log(data)
        })
      })
    }
  }
}
