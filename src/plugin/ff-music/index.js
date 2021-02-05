// svg 图标
import '@/assets/svg-icons'

// 组件
import '@/components/index.js'

import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css/animate.min.css'
import 'flex.css'
import VueLazyload from 'vue-lazyload'

export default {
  install(Vue, options){
    Vue.config.productionTip = false
    Vue.use(VueLazyload, {
      loading: require('../../assets/img/MusicEntertainment2.png'),
    })
    Vue.use(VueMeta, {
      refreshOnceOnNavigation: true,
    })
    Vue.use(ElementUI)
  }
}