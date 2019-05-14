import request from '../../api/request'

export default {
  namespaced: true,
  state: {
    userName: '',
    userPass: ''
  },
  mutations: {
    setUserInfo (state, userInfo) {
      console.log(userInfo)
      if (userInfo) {
        state.userName = userInfo.name
        state.userPass = userInfo.pass
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
          .then(({data}) => {
            console.log('输出一下', data)
            commit('setUserInfo', {
              name: user,
              pass: pass
            })
            return resolve(data)
          }).catch(reject)
      })
    },
    userLogout ({commit, state}) {
      return new Promise((resolve, reject) => {
        console.log('我是登出啦')
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

    // manager
    getUserList ({commit}) {
      return new Promise((resolve, reject) => {
        request.get('/manage/user/list.do')
          .then((result) => {
            return resolve(result)
          }).catch(reject)
      })
    }
  }
}
