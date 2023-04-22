<template>
  <div>
    <!-- 一条文章的单元格 -->
    <van-cell>
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图 -->
          <img
            v-if="artObj.cover.type === 1"
            class="thumb"
            :src="artObj.cover.images[0]"
            alt=""
          />
        </div>
        <!-- 多图 -->
        <div class="thumb-box artObj.cover.type > 1">
          <img
            class="thumb"
            v-for="(imgUrl, index) in artObj.cover.images"
            :key="index"
            :src="imgUrl"
            alt=""
          />
        </div>
      </template>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <van-icon name="cross" @click="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      get-container="body"
      @cancel="cancelFn"
      @close="closeFn"
      :cancel-text="bottomText"
    />
  </div>
</template>

<script>
// 目标1：点击“反馈垃圾内容” 进行数据切换
// 1.监听点击事件 区分用户点击的是哪一个
// 2.切换actions数组里数据

// 目标2: 二级反馈数据出现 取消按钮文字要换成返回

import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artObj: Object // 文章对象
  },
  data () {
    return {
      show: false, // 反馈面板显示或者隐藏
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo, // 函数体是timeAgo
    onSelect (action, item) {
      console.log(action)// name值
      console.log(item) // 索引值
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false // 无论成功失败 隐藏反馈面板
      } else { // 二级的反馈选项
        this.$emit('reportEV', this.artObj.art_id, action.value)
        this.show = false
      }
    },
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style>
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-box span {
  margin: 0 3px;
  /* &:first-child{
    margin-left: 0;
  } */
}
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
