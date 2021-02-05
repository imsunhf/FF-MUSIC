import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
const service = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 10000,
})

const errorLog = (error) => {
  // console.log(error)
}

service.interceptors.response.use(
  (response) => {
    // console.log(response, 'response')
    const dataAxios = response.data
    return dataAxios

    // const { code } = dataAxios
    // switch (code) {
    //   case 0:
    //     return dataAxios.data
    //   default:
    //     break
    // }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 301:
          // console.log('301')
          break
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    } else{
      if (error.message.indexOf('timeout') > -1) {
        MessageBox({
          title: '提示',
          message: '接口已超时，即将重新加载',
          confirmButtonText: '确定',
          closeOnClickModal: false,
          showClose: false,
        }).then(() => window.location.reload())
        return
      }
      Message({
        type: 'error',
        message: error.message
      })
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
