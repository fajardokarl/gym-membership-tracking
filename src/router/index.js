import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Members from '../views/Members'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/members',
    name: 'Members',
    component: Members
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
