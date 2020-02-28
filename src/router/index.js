import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import Calendar from '../views/Calendar.vue'
// @ts-ignore
import Login from '../views/Login.vue'
// @ts-ignore
import Postits from '../views/PostIts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: Calendar
    // will switch months for calendar inside calendar view (toggle data with v-show/if? or filter?)
  },
  {
    path: '/Postits',
    name: 'Postits',
    component: Postits
  }
]

const router = new VueRouter({
  routes
})

export default router
