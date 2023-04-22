// 基于axios封装网络请求
import theAxios from 'axios'
// 引入路由
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/utils/token'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // 20秒超时时间（请求20s无响应直接判定超时）
  timeout: 20000
})

// 拦截器本质就是一个函数
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标 同统一携带token
  // ?. 可选链操作符
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // http响应状态码为4xx 5xx进入这里
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // http响应状态码为2xx 3xx进入这里

  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('login') // 不能使用this.$router 因为this不是vue组件对象
  }
  return Promise.reject(error)
})

// 解构赋值
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
// return new Promise((resolve,reject)=>{
// 判断params是否有值，需要自己写js代码，把params对象里的key value拼接到url上
// $.ajax({
//     url,
//     data,
//     headers,
//     type:method,
//     success:(res)=>{
//         resolve(res)
//     },
//     error:err=>{
//         reject(err)
//     }
// })
// })

/*
 axios({
    url:'请求地址',
    method:'请求方式',
    params:{},
    data:{},
    headers:{}
 })
*/
// 若需要更i性能request.js里封装网络请求的工具
// 把axios替换成jquery的$.ajax
// import $ from 'jquery'
// export default $.ajax
/*
 $.ajax({
    url:'请求地址',
    type:'请求方式',
    data:{},//没有params
    headers:{}
})
*/
