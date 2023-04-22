// 此文件封装3个方法 用于操作token
// 封装：代码分层 更方便 更清晰 以后修改方便
const key = 'geek-itheima'
// 设置
export const setToken = token => {
  localStorage.setItem(key, token)
}
// 获取
export const getToken = () => localStorage.getItem(key)

// 删除
export const removeToken = () => {
  localStorage.removeItem(key)
}
