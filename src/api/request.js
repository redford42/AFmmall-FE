import axios from 'axios'
// import store from '../store/index'
// import vue from 'Vue'
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 15000 // 请求超时时间
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

service.interceptors.response.use(response => {
  if (response.data.status === 0) {
    return response.data
  } else if (response.data.status === 10) {
    window.vue.alert('用户登录失效，请重新登录')
    setTimeout(() => {
      window.vue.$router.push('/')
    }, 100)
    return null
  }
  console.log(response.data.status)
})
export default service
