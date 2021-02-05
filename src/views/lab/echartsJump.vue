<template>
  <jump
    ref="noteJump"
    @toggle="handleToggle"
    @canplay="canplay"
    @end="end"
  >
  <div class="charts-wrap">
    <div id="echarts-jump" ref="echartsJump" style="width: 100%;height:100%;"></div>

  </div>
    <!-- <canvas
      id="note-jump-canvas"
      ref="noteJumpCanvas"
      height="300"
      width="1300"
    ></canvas> -->
  </jump>
</template>

<script>
import * as echarts from 'echarts'
import {debounce} from 'lodash'
import Jump from './Jump.vue'
import { jumpHelper } from './jumpHelper'
import { drawHelper } from './echartsDrawHelper'

const waves = ['bar', 'scatter', 'scatter1']
const options = {
  tooltip: {},
  grid:{
    left: '2%',
    right: '2%',
    bottom: 0,
    top: 0
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    show: false
  },
  animation: false
}
export default {
  metaInfo() {
    return{
      title: '可视化',
      titleTemplate: '%s',
      htmlAttrs: {
        // lang: 'en',
        // amp: undefined
      },
    }
  },
  data() {
    return {
      waveIndex: 0,
      isPlay: false,
      isAnim: false,
    }
  },
  activated() {
    if (!this.$_resizeHandler) {
      // avoid duplication init
      this.initListener()
    }

    // when keep-alive chart activated, auto resize
    this.resize()
  },
  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(document.getElementById('echarts-jump'))
      this.resize()
      window.addEventListener('resize', this.resize)
    })
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    canplay(audio) {
      this.analyser = jumpHelper(audio)
      drawHelper(
        this.analyser,
        this.myChart,
        waves[this.waveIndex],
        options
      )
    },
    end() {
      
    },
    changeSize({ width, height }) {
      // 5:3
      const nextWidth = Math.max(Math.floor(this.energy / 1.3), 100)
      const nextHeight = Math.max(Math.floor(this.energy / 1.6 / 1.3), 60)
      this.ele.style.width = Math.min(nextWidth, 200) + 'px'
      this.ele.style.height = Math.min(nextHeight, 120) + 'px'
    },
    labaReset() {
      this.ele.style.width = 100 + 'px'
      this.ele.style.height = 60 + 'px'
    },
    handleToggle() {
      this.waveIndex += 1
    },
    initListener() {
      this.$_resizeHandler =  debounce(() => {
        this.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)
    },
    resize() {
      this.myChart && this.myChart.resize()
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
      this.myChart.clear()
    },
  },
  watch: {
    waveIndex() {
      drawHelper(
        this.analyser,
        this.myChart,
        waves[this.waveIndex % 4],
        options
      )
    },
  },
  components: {
    Jump
  }
}
</script>

<style lang="scss" scoped>
  .charts-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    // border: 1px solid #f00;
  }
</style>



