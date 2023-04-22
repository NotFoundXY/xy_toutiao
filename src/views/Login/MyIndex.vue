<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <div>
      <!-- 输入框name属性='用户名' 表单整体提交时，默认收集一个提交对象 往后台发送的参数名就是name里值{"用户名":"页面值"} -->
      <!-- rules实行配置检验规则 :属性名="表达式"(动态属性) 属性名="字符串" -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="mobile"
          label="手机号"
          placeholder="请输入11位手机号"
          required
          :rules="[{ required: true, message: '请填写手机号',pattern:/^1[3-9]\d{9}$/ }]"
        />
        <van-field
          v-model="user.code"
          type="password"
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          required
          :rules="[{ required: true, message: '请填写密码',pattern:/^\d{6}$/ }]"
        />
        <div style="margin: 16px;">
          <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          :disabled="isLoading"
          loading-text="正在登录ing...">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 目标1：实现顶部导航->自定义样式
// 目标2：实现表单组件->读 改 加
// 目标3：收集值以后 调用接口->查看登陆结果
// 目标4：点击登陆以后给用户提示(正在登陆中~~)，防止用户频繁点击
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '15278988811',
        code: '246810' // 验证码(密码 246810)
      },
      isLoading: false // 登录按钮的加载状态
    }
  },
  methods: {
    async onSubmit (values) {
      // values 代表收集的参数名和值
      console.log('submit', values)
      console.log(this.user)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.data.token)
        // 跳转写到最后->尽量最后执行
        // this.$route.push()压栈(会产生历史记录，可以回退)
        // this.$route.replace() 替换(不会产生历史记录)
        this.$router.replace({
          path: '/layout/home' // 路由规则里/layout里没有重定向 所以直接在这里写全
        })
      } catch (error) {
        // Promise内ajax抛出错误 直接进入这里
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isLoading = false
    }
  }

}
</script>

<style scoped lang="less">
/* 此类名时van-nav-bar组件内根标签 */
// .van-nav-bar {
//   background-color: #007bff;
// }
/* 此选择器名字是van-nav-bar组件内标签 scoped尝试把此选择器后属性选择器匹配当前页面标签(不能选中组件内部的) */
// lang="less" 当前标签内的是less语法
// 用/deep/就不会被vscode标记红线 会把属性选择器加到前面
// 修改组件内样式，如果使用了scoped 就要再选择器前面加/deep/
// /deep/  .van-nav-bar__title {
//   color: white;
// }
 </style>
