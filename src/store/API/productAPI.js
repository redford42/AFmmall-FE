import request from '../../api/request'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    productList: null,
    managerProductList: null
  },
  mutations: {
    setProductList (state, list) {
      state.productList = list
      console.log(list)
    },
    setManagerProductList (state, list) {
      state.managerProductList = list
      console.log(list)
    }
  },
  actions: {
    getProductList ({commit}, data) {
      return new Promise((resolve, reject) => {
        request.get('/user/product/list.do', {
          params: {
            categoryId: data.categoryId || null,
            pageNum: data.pageNum,
            pageSize: data.pageSize
          }
        })
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    getManagerProductList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/manage/product/list.do')
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    getManagerProductDetail ({commit}, productId) {
      return new Promise((resolve, reject) => {
        request.get('/manage/product/detail.do', {
          params: {
            productId: productId
          }
        })
          .then((result) => {
            return resolve(result.data)
          }).catch(reject)
      })
    },
    setManagerProductPhoto ({commit}, file) {
      let param = new FormData()
      param.append('name', file.name)
      param.append('upload_file', file)
      return new Promise((resolve, reject) => {
        axios.post('/manage/product/upload.do',
          param
        )
          .then(result => {
            console.log('productPhoto', result)
            return resolve(result.data.data)
          }).catch(reject)
      })
    }

  }
}
