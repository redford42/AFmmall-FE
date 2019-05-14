import request from '../../api/request'

export default {
  namespaced: true,
  state: {
    categoryList: null
  },
  mutations: {
    setCategoryList (state, list) {
      state.categoryList = list
      console.log(list)
    }
  },
  actions: {
    getCategoryList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/user/category/get_category.do')
          .then((result) => {
            commit('setCategoryList', result.data)
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
