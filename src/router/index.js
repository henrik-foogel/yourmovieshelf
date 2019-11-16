import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/index.html",
    redirect: "/" 
  },
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
    path: '/yourshelfs',
    name: 'customize',
    component: () => import('../views/Customize.vue')
  },
  {
    path: '/movienight',
    name: 'movienight',
    component: () => import('../views/MovieNight.vue')
  },
  {
    path: '/addsoundtracks',
    name: 'addsoundtracks',
    component: () => import('../views/AddSoundtracks.vue')
  },
  {
    path: '/soundtracks',
    name: 'soundtracks',
    component: () => import('../views/Soundtracks.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
