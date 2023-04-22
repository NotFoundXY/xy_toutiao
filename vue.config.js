// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
// transpileDependencies: true,
const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // less-loader 版本小于 6.0 移除lessOptions这一级 直接配置选项
        // lessOptions: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff',
          // 或者通过less文件覆盖 文件路径为绝对路径
          // __dirname node环境下全局内置变量
          hack: `true;@import "${path.join(__dirname, '/src/styles/cover.less')}";`
        }
        // }
      }
    }
  }
}
// })
