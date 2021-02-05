const path = require('path')
const { name } = require('./package')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = 8893
module.exports = {
  publicPath: '/music',
  // lintOnSave: true,
  outputDir: path.resolve(__dirname, 'dist/music'),
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`,
      },
    },
  },
  chainWebpack: (config) => {
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
        symbolId: 'ff-[name]',
      })
      .end()
    // const imageRule = config.module.rule('images')
    // imageRule
    //   .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
    //   .exclude
    //   .add(resolve('src/assets/svg-icons/icons'))
    //   .end()
  },
  devServer: {
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api2': {
        target: 'http://121.5.61.122:8090',
        pathRewrite: {
          '/api2': '',
        },
      },
      '/api': {
        target: 'http://121.5.61.122:3000',
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}
