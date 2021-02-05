import Layout from '../layout/index'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: { name: 'playList' },
    component: Layout,
    children: [
      {
        path: '/playList',
        name: 'playList',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/PlayList.vue'),
      },
      {
        path: '/playList/:id',
        name: 'playListDetails',
        component: () => import('../views/PlayListDetails.vue'),
      },
      {
        path: '/singer',
        name: 'singer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "singer" */ '../views/Singer.vue'),
      },
      {
        path: '/singer/:id',
        name: 'singerDetails',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "SingerDetails" */ '../views/SingerDetails.vue'
          ),
      },
      {
        path: '/lab/noteJump',
        name: 'noteJump',
        meta: {
          auth: true,
          isLab: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "noteJump" */ '../views/lab/noteJump.vue'
          ),
      },
      {
        path: '/lab/echartsJump',
        name: 'echartsJump',
        meta: {
          auth: true,
          isLab: true,
        },
        component: () =>
          import(/* webpackChunkName: "noteJump" */ '../views/lab/echartsJump.vue'),
      },
    ],
  },
]


const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/music' : '/music',
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
