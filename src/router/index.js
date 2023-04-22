import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/MyIndex'
import Layout from '../views/Layout/MyIndex'
import Home from '../views/Home/MyIndex'
import User from '../views/User/MyIndex'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'// 默认显示layout 和layout下的首页
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
