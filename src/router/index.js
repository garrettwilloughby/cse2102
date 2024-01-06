import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path:'/help',
      name: 'help',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/instructorCourses',
      name: 'instructorCourses',
      component: () => import('../views/Instructor/InstructorCourses.vue')
    },
    {
      path: '/instructorLand',
      name: 'instructorLand',
      component: () => import('../views/Instructor/InstructorLand.vue')
    },
    {
      path: '/instructorSchedule',
      name: 'instructorSchedule',
      component: () => import('../views/Instructor/InstructorSchedule.vue')
    },
    {
      path: '/studentCourses',
      name: 'studentCourses',
      component: () => import('../views/Student/StudentCourses.vue')
    },
    {
      path: '/studentLand',
      name: 'studentLand',
      component: () => import('../views/Student/StudentLand.vue')
    },
    {
      path: '/studentSchedule',
      name: 'studentSchedule',
      component: () => import('../views/Student/StudentSchedule.vue')
    },
    {
      path: '/studentRegister',
      name: 'studentRegister',
      component: () => import('../views/Student/StudentRegister.vue')
    },
    {
      path: '/adminLand',
      name: 'adminLand',
      component: () =>  import('../views/Admin/AdminLanding.vue')
    },
    {
      path:'/admin/:id',
      name:'adminPageCourses',
      component: () => import('../views/Admin/AdminCourseView.vue')
    },
    {
      path:'/admin/102',
      name:'adminPage',
      component: ()=> import('../views/Admin/AddCourseForm.vue')
    },
    {
      path:'/course/:courseid',
      name: 'singleCourseView',
      component: ()=> import('../views/CoursePage.vue'),
      props: true,
    },
    {
      path:'/searchCourses',
      name:'searchCourses',
      component: () => import('../components/CourseSearch.vue')
    }

  ]
})

export default router
