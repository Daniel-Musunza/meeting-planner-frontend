import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Zoom from '@/components/Zoom.vue'
import Meet from '../components/Meet.vue'
import Reminder from '../components/Reminder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/zoom',
    name: 'zoom',
    component: Zoom
  },
  {
    path: '/meet',
    name: 'meet',
    component: Meet
  },
  {
    path: '/reminder',
    name: 'reminder',
    component: Reminder
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
