import axios from 'axios'
import { Notification } from 'element-ui'
// import store from '../store/index'
// import vue from 'Vue'
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 15000 // 请求超时时间
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

service.interceptors.response.use(response => {
  console.log('interceptors.respons', response)
  if (response.data.status === 0) {
    return response.data
  } else if (response.data.status === 10) {
    Notification.warning({
      title: '用户未登录',
      message: '需要重新登录',
      type: 'warning'
    })
    window.vue.alert('用户登录失效，请重新登录')
    setTimeout(() => {
      window.vue.$router.push('/')
    }, 100)
    return null
  } else if (response.data.status === 1) {
    Notification.error({
      title: '登陆错误',
      message: response.data.msg,
      duration: 2000
    })
  }
  console.log(response.data.status)
})
export default service
