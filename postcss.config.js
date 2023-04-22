module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 能够把所有元素的px单位转为rem
      // rootValue:转换px的基准值
      // 编码时，一个元素宽度时75px,则缓存rem之后时2em
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
