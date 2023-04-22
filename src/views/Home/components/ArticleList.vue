<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="50"
    >
      <ArticleItem
        v-for="obj in list"
        :key="obj.art_id"
        :artObj="obj"
        @disLikeEV="disLikeFn"
        @reportEV="reportFn"
      ></ArticleItem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 问题1：网页刚打开，created里请求和onload里请求同时发送 请求的都是最新的数据
// onload中 两次一样的数据合并 数据重复 key重复
// 原因 van-list组件挂载时，默认就会判定一次是否触底
// 第一页数据也是网络请求回来的 标签先挂在了 数据回来更新DOM 所以标签没有高度 list的load事件上来就触发
// 解决方案1：list组件添加:immediate-check="false"上来初始化时不要判定
// 解决方案2 增加List长度判断 如果页面没有数据，没有高度，让本次load逻辑代码不往下执行
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
import { Notify } from 'vant'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 文章列表数组
      loading: false,
      finished: false,
      theTime: new Date().getTime(), // 用于分页
      isLoading: false // 顶部加载状态
    }
  },
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道Id
  },
  async created () {
    // 文章列表
    console.log('ccc')
    this.getArticleListFn()
  },
  methods: {
    // 用于发送请求
    async getArticleListFn () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      // pre_timestamp
      // 下一段开头的那篇文章时间戳
      // 第一次 系统时间(timestamp) ->后台返回0-9条 ->携带第10条pre_timestamp值返回
      // 第二次 (timestamp) ->上一次pre_timestamp(代表告诉后台，从指定的时间戳再往后找10个) 10-19条， 20条pre_timestamp返回
      // ....
      console.log('bbb')
      console.log(res)
      this.list = [...this.list, ...res.data.data.results] // 数组合并 展开
      this.theTime = res.data.data.pre_timestamp
      this.loading = false // 如果不关闭 底部一直是加载中状态
      if (res.data.data.pre_timestamp === null) { // 本次返回的数据时最后的 没有下一段数据
        this.finished = true
      }
      // 顶部加载状态改为false
      this.isLoading = false
    },

    async onLoad () {
      if (this.list.length === 0) { // 第一次上面还是判断触底(触发onload方法时loading自动改成true)
        this.loading = false// 如果不改回来 下次触底就不再执行onload方法
        return// 如果页面没有数据 没有高度 让本次onload逻辑代码不往下执行
      }
      this.getArticleListFn()
    },
    // 顶部 刷新数据事件方法
    async onRefresh () {
      // 数组清空 来一份新数据
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },
    // 反馈 不感兴趣
    async disLikeFn (id) {
      await dislikeArticleAPI({
        artID: id
      })
      // res里没有什么有用信息 所以await往下放行 就证明请求和响应成功 反馈成功
      // console.log('反馈不感兴趣', res)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈 举报文章
    async reportFn (id, type, remark) {
      await reportArticleAPI({
        artID: id
      })
      // res里没有什么有用信息 所以await往下放行 就证明请求和响应成功 反馈成功
      // console.log('反馈垃圾内容', res)
      Notify({ type: 'success', message: '举报成功' })
    }
  }
}
</script>

<style>
</style>
