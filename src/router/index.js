import Vue from 'vue'
import VueRouter from 'vue-router'
import CalendarView from '../views/CalendarView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: CalendarView,
  }
]

const router = new VueRouter({
  routes
})

export default router
