import axios from 'axios'

const service = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

const errorLog = error => {
  console.log(error)
}

service.interceptors.response.use(
  response => {
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
  error => {
    if (error && error.response) {
      switch (error.response.status) {
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
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service