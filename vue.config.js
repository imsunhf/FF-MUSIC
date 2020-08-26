const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'ff-[name]'
      })
      .end()
    // const imageRule = config.module.rule('images')
    // imageRule
    //   .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
    //   .exclude
    //   .add(resolve('src/assets/svg-icons/icons'))
    //   .end()
  }
}
