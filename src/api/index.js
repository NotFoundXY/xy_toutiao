// 统一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面，导入这个接口方法，就能发请求
// 好处：请求Url路径 可以在这里进行统一管理
import axios from '../utils/request'
// 登录 -- 登录接口
// axios内部会把参数转出json字符串格式发后台
// axios内部会自动携带请求参数(headers)里Content-Type:'application/json' 添加好
export const loginAPI = ({ mobile, code }) =>
  axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
// 频道 -- 获取所有频道
export const getAllChannelsAPI = () =>
  axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
// 频道 -- 获取用户选择的频道
export const getUserChannelsAPI = () =>
  axios({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
// 新闻 -- 获取新闻详情
export const getAllArticleListAPI = ({ channel_id, timestamp }) =>
  axios({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id,
      timestamp
    }
  })
// 文章 -- 反馈 -- 对文章不喜欢
export const dislikeArticleAPI = ({ artID }) =>
  axios({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artID
    }
  })
// 文章 -- 反馈 -- 举报文章
export const reportArticleAPI = ({ artID, type, remark }) =>
  axios({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artID,
      type: type,
      remark: '可以在逻辑页面判断0 则弹框输入其他问题'
    }
  })
