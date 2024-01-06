import Vue from 'vue'
import VueRouter from 'vue-router'
import CoursePage from '@/views/CoursePage.vue'
import CoursesList from '@/views/Course_info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/course/:id',
    name: 'CoursePage',
    component: CoursePage
  },
  {
    path: '/courses',
    name: 'Courses_info',
    component: CoursesList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
