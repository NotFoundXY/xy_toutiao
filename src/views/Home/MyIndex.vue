<template>
  <div>
    <!-- 头部导航
          fixed 可以让头部div带固定定位样式
          原理 组件内props传入true/false 影响到组件内的动态央视class -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img src="../../assets/logo.gif" class="logo" />
        </template>
        <template #right>
          <!-- postcss只能翻译style里css样式,标签内行内样式无法转换px为rem,所以需要自己手动计算 -->
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab局域栏导航 v-tabs 一行容器 v-tab 每个tab栏 v-model 关联的激活项的下表(双向绑定)-->
    <div class="main">
      <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
        <van-tab
          :title="obj.name"
          v-for="obj in userChannelList"
          :key="obj.id"
          :name="obj.id"
          ><ArticleList :channelId="channelId"></ArticleList
        ></van-tab>
      </van-tabs>

      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="plusClickFn"
      />
    </div>

    <!-- 频道管理弹出层 -->
    <van-popup v-model="show" get-container="body" class="channel_popup"
      ><ChannelEdit></ChannelEdit></van-popup
    >
  </div>
</template>

<script>
// 目标：点击tab标签页@change触发，重新发送请求，拿到新的数据
// 问题：每次切换tab拿到的数据都是新的
// 即使你用keep-alive也没用(防止组件被销毁，为你的组件没有销毁，实在点击切换数据)
// 解决：外面现在用的是同一个数组切换数据(多个ArticleList用的是同一个数组，换回影响别人)
// 文章列表数据，请求，数组，分别放入到ArticleList内部(自己请求自己的数据)
// 外面只负责传入当前激活的频道ID
import { getUserChannelsAPI, getAllChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      channelId: 0, // tab导航 激活使用频道Id 页面打开是推荐频道高亮
      userChannelList: [],
      allChannelLise: [],
      show: false
    }
  },
  methods: {
    plusClickFn () {
      this.show = true
    }
  },
  async created () {
    // 我的频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
    console.log('我的频道', res)
    // 所有频道列表
    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
    console.log('所有频道', res2)
  }
}
</script>

<style>
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
  /* 底部再layout/index.vue给二级路由的挂载点容器上 */
}
.moreChannels {
  position: fixed;
  top: 60px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vh;
  height: 100vh;
}
</style>
