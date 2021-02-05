if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FFMusic from '@/plugin/ff-music'
import * as recast from 'recast'
import Panel from '@/components/ff-panel'

Vue.use(FFMusic)
let instance = null

function render(props = {}) {
  const { container } = props


  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        // console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    })
}

export async function bootstrap() {
  // console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  // console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}


// Let's turn this function declaration into a variable declaration.
const code = [
  'function add(a, b) {',
  '  return a +',
  '    // Weird formatting, huh?',
  '    b;',
  '}',
].join('\n')

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse([Panel])
console.log(ast, 'ast');