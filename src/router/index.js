import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addmovie',
    name: 'addmovie',
    component: () => import('../views/AddMovie.vue')
  },
  {
    path: '/selected',
    name: 'selected',
    component: () => import('../views/Selected.vue')
  },
  {
    path: '/customize',
    name: 'customize',
    component: () => import('../views/Customize.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
