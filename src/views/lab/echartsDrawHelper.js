import store from '@/store'

export const drawHelper = (analyser, echarts, wave, options) => {
  const drawLine = () => {
    const array = new Uint8Array(128)
    analyser.getByteFrequencyData(array)
    let max = (array[2] + array[1]) / 2
    // mapMutation
    if (max > 120) {
      store.commit('lab/setEnergy', max)
    }
    echarts.clear()
    switch (wave) {
      case 'bar':
        barHelper(echarts, options, Array.from(array))
        break
      case 'scatter':
        scatterHelper(echarts, options, Array.from(array))
        break
      case 'scatter1':
        scatter1Helper(echarts, options, Array.from(array))
        break
      default:
        barHelper(echarts, options, Array.from(array))
        break
    }
    requestAnimationFrame(drawLine)
  }
  requestAnimationFrame(drawLine)
}
let oldArray = []
let newArray = []
const barHelper = (echarts, options, array) => {
  const op = Object.assign({}, options, {
    yAxis: [
      {
        show: false,
        name: 'a',
      },
      {
        show: false,
        inverse: true,
        max: 200,
        name: 'b',
      },
    ],
    series: [
      {
        name: 'a',
        type: array[10] && array[10] > 175 ? 'line' : 'bar',
        data: array,
        barWidth: 5,
        smooth: true,
      },
      // {
      //   name: 'b',
      //   type: array[10] && array[10] > 170 ? 'bar' : 'line',
      //   data: array,
      //   barWidth: 5,
      //   smooth: true,
      //   yAxisIndex: 1,
      // },
    ],
  })

  echarts.setOption(op)
}

const scatterHelper = (echarts, options, array) => {
  const op = Object.assign({}, options, {
    series: [
      {
        name: '',
        type: 'scatter',
        data: array.map((item, index) => [index, item]),
        symbolSize: 10,
      },
    ],
  })

  echarts.setOption(op)
}

const scatter1Helper = (echarts, options, array) => {
  oldArray = newArray
  newArray = array.map((item, index) => [index, item])
  const op = Object.assign({}, options, {
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
    animation: false,
    series: [
      {
        name: '',
        type: 'scatter',
        data: newArray,
        dimensions: ['x', 'y'],
        symbolSize: 10,
        itemStyle: {
          opacity: 0.4,
        },
        large: true,
      },
      {
        name: 'B',
        type: 'scatter',
        data: oldArray,
        dimensions: ['x', 'y'],
        symbolSize: 10,
        itemStyle: {
          opacity: 0.4,
        },
        large: true,
      },
    ],
  })

  echarts.setOption(op)
}