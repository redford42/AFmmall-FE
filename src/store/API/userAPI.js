import request from '../../api/request'
import { Notification } from 'element-ui'
export default {
  namespaced: true,
  state: {
    userName: '',
    userPass: '',
    user: null
  },
  mutations: {
    setUserInfo (state, userInfo) {
      console.log(userInfo)
      if (userInfo) {
        state.userName = userInfo.name
        state.userPass = userInfo.pass
        state.user = userInfo.user
      }
    }
  },
  actions: {
    userLogin ({commit, state}, {user, pass}) {
      return new Promise((resolve, reject) => {
        console.log('数出一下user', user)
        request.post('/user/login.do',
          {
            username: user,
            password: pass
          }
        )
          .then(data => {
            if (data.status === 0) {
              Notification.success({
                title: '用户登录成功',
                duration: 2000
              })
            }
            console.log('输出一下', data)
            localStorage.setItem('userId', user)
            commit('setUserInfo', {
              name: user,
              pass: pass,
              user: data
            })
            return resolve(data)
          }).catch(reject)
      })
    },
    userLogout ({commit, state}) {
      return new Promise((resolve, reject) => {
        console.log('我是登出啦')
        localStorage.removeItem('userId')
        request.post('/user/logout.do').then(data => {
          console.log('我是登出的返回data==========>', data)
          if (data.status === 0) {
            commit('setUserInfo', {
              name: '',
              pass: ''
            })
          }
          return resolve(data)
        }).catch(reject)
      })
    },
    getUserInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        console.log('我是获取用户信息啦')
        request.post('/user/get_information.do').then(data => {
          console.log('我是获取用户信息的返回data===============>', data)
          return resolve(data.data)
        }).catch(reject)
      })
    },

    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        request.post('/user/update_information.do', user)
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    resetPassword ({commit}, data) {
      return new Promise((resolve, reject) => {
        request.post('/user/reset_password.do', {
          passwordOld: data.passwordOld,
          passwordNew: data.passwordNew
        })
          .then((result) => {
            console.log('resetPassword', result)
            return resolve(result)
          }).catch(reject)
      })
    },
    // manager
    getUserList ({commit}, data) {
      if (data === null || data === undefined) {
        data = {
          pageNum: 1,
          pageSize: 8
        }
      }
      return new Promise((resolve, reject) => {
        request.get('/manage/user/list.do', {
          params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize
          }
        })
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    },
    registerUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        request.post('/user/register.do', user)
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
