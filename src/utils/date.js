// 封装处理时间的方法
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh' // 集成中文

/**
 * ...多久之前
 * @param {*} targetTime 是之前的时间
 * @returns 系统时间到之前指定事件的距离值
 */
export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b)
}
