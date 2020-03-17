import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器

service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    /**
     * success
     */
    const res = response.data
    if (res.success) {
      const errMsg1 = res.errMsg
      if (errMsg1) {
        Message({
          message: errMsg1,
          type: 'success'
        })
      }
      return response
    } else {
      const errMsg = res.errMsg
      const code = res.code
      if (code !== 4001) {
        Message({
          message: errMsg,
          type: 'warning'
        })
      } else {
        MessageBox.confirm('提示信息：' + errMsg, '错误代码：' + code, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
    }
  },

  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
