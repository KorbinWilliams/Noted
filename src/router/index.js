import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import Calendar from '../views/Calendar.vue'
// @ts-ignore
import Login from '../views/Login.vue'
// @ts-ignore
import PostIts from '../view/PostIts.vue'

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
  // {
  // path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: function () {
  //   // @ts-ignore
  //   return import("../views/Dashboard.vue")
  // }
  // },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: Calendar
    // will switch months for calendar inside calendar view (toggle data with v-show/if? or filter?)
  },
  {
    path: '/PostIts',
    name: 'PostIts',
    components: PostIts
  }
]

const router = new VueRouter({
  routes
})

export default router
