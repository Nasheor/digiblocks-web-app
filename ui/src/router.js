import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Dashboard from '@/views/pages/Dashboard/index'
import Login from '@/views/pages/Login/index'
import Register from '@/views/pages/Register/index'
import Buildings from '@/views/pages/Buildings/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      component: Index,
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: Dashboard,
        },
        {
          name: 'Buildings',
          path: '/buildings',
          component: Buildings,
        },
      ],
    },
    {
      name: 'Login',
      path: '/',
      component: Login,
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
    }
  ],
})
