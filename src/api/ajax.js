import axios from 'axios'
import { message } from 'antd'

// 创建axiso实例
const service = axios.create({
  baseURL: '/api',
  timeout: 500000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.status !== 0) message.error(data.msg)
    return data
  },
  error => {
    message.error('请求出错了：' + error.message)
    return Promise.reject(error)
  }
)

// ajax请求封装
export default function ajax (url, params = {}, type = 'GET') {
  return type === 'GET'
    ? service.get(url, { params })
    : service.post(url, params)
}
