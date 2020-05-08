import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddProgram from '../views/AddProgram'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addprogram',
    name: 'AddProgram',
    component: AddProgram
  }
]

const router = new VueRouter({
  routes
})

export default router
