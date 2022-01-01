import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/province',
    name: 'Province',
    component: () => import(/* webpackChunkName: "Province" */ '../views/Province.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
