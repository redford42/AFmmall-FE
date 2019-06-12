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
            return resolve(result.data)
          }).catch(reject)
      })
    },
    updateCategory ({commit}, category) {
      return new Promise((resolve, reject) => {
        request.post('/manage/category/update_category.do', category)
          .then((result) => {
            console.log(result)
            commit('setCategoryList', result)
            return resolve(result)
          }).catch(reject)
      })
    },
    addCategory ({commit}, category) {
      return new Promise((resolve, reject) => {
        request.get('/manage/category/add_category.do?' + 'categoryName=' + category.name)
          .then((result) => {
            console.log(result)
            commit('setCategoryList', result)
            return resolve(result)
          }).catch(reject)
      })
    },
    changeCategoryStatus ({commit}, categoryId) {
      return new Promise((resolve, reject) => {
        request.get('/manage/category/change_category_status.do?' + 'categoryId=' + categoryId)
          .then((result) => {
            console.log(result)
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
