import {easeInOutQuad} from './index'
export default function scrollIntoView(container, selected) {
  const { cur, tar } = containerTop(container, selected)
  if (cur === tar) return
  const DURATION = Math.abs(tar - cur)
  let startTime
  function play(time){
    if (!startTime) {
      startTime = time
    }
    const timeSoFar = time - startTime
    const easeTop = easeInOutQuad(timeSoFar, cur, tar - cur, DURATION)
    container.scrollTop = easeTop
    if (easeTop < tar) {
      requestAnimationFrame(play)
    }
  }
  requestAnimationFrame(play)
}
function containerTop(container, selected) {
  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents = []
  let pointer = selected.offsetParent
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight
  if (top < viewRectTop) {
    // container.scrollTop = top
    return {
      cur: container.scrollTop,
      tar: top
    }
  } else if (bottom > viewRectBottom) {
    // container.scrollTop = bottom - container.clientHeight
    return {
      cur: container.scrollTop,
      tar: bottom - container.clientHeight,
    }
  }
  return {
    cur: 0,
    tar: 0,
  }
}
