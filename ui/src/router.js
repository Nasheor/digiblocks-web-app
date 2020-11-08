import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Dashboard from '@/views/pages/Dashboard/index'
import Login from '@/views/pages/Login/index'
import Register from '@/views/pages/Register/index'
import Buildings from '@/views/pages/Buildings/index'
import Certificate from '@/views/pages/Certificate/index'
import VerifyCertificate from '@/views/pages/VerifyCertificate/index'
import Transactions from '@/views/pages/Transactions/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      component: Index,
      children: [
        {
          name: 'Home',
          path: '/dashboard',
          component: Dashboard,
        },
        {
          name: 'Buildings',
          path: '/buildings',
          component: Buildings,
        },
        {
          name: 'Energy Certificate',
          path: '/certificate',
          component: Certificate,

        },
        {
          name: 'Verify Certificate',
          path: '/verify_certificate',
          component: VerifyCertificate
        },
        {
          name: 'Transactions',
          path: '/transactions',
          component: Transactions
        }
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
