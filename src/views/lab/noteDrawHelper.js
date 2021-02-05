import store from '@/store'
let preArr = []
export const drawHelper = (analyser, canvas, wave, ctx) => {
  const drawLine = () => {
    const array = new Uint8Array(128)
    analyser.getByteFrequencyData(array)
    let max = (array[2] + array[1]) / 2
    // mapMutation
    if (max > 120) {
      store.commit('lab/setEnergy', max)
    }
    drawDesign(ctx, canvas, array, wave, (array, wave) => {
      // drawText(ctx)
      for (let i = 0; i < array.length; i++) {
        let value = array[i]
        //绘制线根据能量值变化
        // line(ctx)

        switch (wave) {
          case 'xin':
            xinHelper(ctx, i, value)
            break
          case 'bar':
            barHelper(ctx, i, value)
            break
          case 'line':
            lineHelper(ctx, i, value)
            break
          case 'dashed':
            dashedHelper(ctx, i, value)
            break
          default:
            barHelper(ctx, i, value)
            break
        }
      }
    })

    preArr = array
    requestAnimationFrame(drawLine)
  }
  requestAnimationFrame(drawLine)
}

const drawDesign = (ctx, canvas, array, wave, fn) => {
  const width = canvas.width
  const height = canvas.height
  ctx.clearRect(0, 0, width, height) //清除画布
  // ctx.strokeStyle = '#800080'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 5 //线粗细
  ctx.font = 'bold 12px'
  ctx.beginPath()
  fn && fn(array, wave)
  ctx.stroke()
  ctx.closePath()
}
const barHelper = (ctx, i, value) => {
  // context.beginPath()
  ctx.moveTo(i * 10, 300)
  ctx.lineTo(i * 10, 300 - value)
  // context.closePath()
}

const lineHelper = (ctx, i, value) => {
  //  context.beginPath()
  ctx.lineWidth = 1 //线粗细

  ctx.lineTo(i * 10, 300 - value - 30)
  // context.closePath()
}

const dashedHelper = (ctx, i, value) => {
  //  ctx.beginPath()
  // ctx.lineWidth = 1 //线粗细

  ctx.moveTo(i * 10, 300 - value - 20)
  ctx.lineTo(i * 10, 300 - value - 21)
  ctx.closePath()
}

const xinHelper = (ctx, i, value) => {
  ctx.lineWidth = 1 //线粗细
  ctx.moveTo(i * 10, 300 - value - 50)
  ctx.arcTo(
    i * 10 - 1,
    300 - value - 50 - 1,
    i * 10 + 1,
    300 - value - 50 + 1,
    1
  )

  ctx.closePath()
}

const textHelper = (ctx, i, value, text) => {
  // ctx.moveTo(i * 10, 300 - value)
  ctx.fillStyle = '#f00'
  ctx.fillText(text, i * 10, 300 - value - 50)
}
const tests = ['音', '符', '跳', '动']
const drawText = (ctx) => {
  if (preArr.length <= 0 || !preArr[0]) return
  ;[2, 3, 4, 5].forEach((t, i) => {
    textHelper(ctx, t, 300 - preArr[t] - 20, tests[i])
  })
}
