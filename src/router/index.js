import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateMeeting from '@/components/CreateMeeting.vue'
import Reminder from '../components/Reminder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create-meeting',
    name: 'create-meeting',
    component: CreateMeeting
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
