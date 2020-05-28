import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/views/Detail'
import List from '@/views/List'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check user auth state
    let user = firebase.auth().currentUser
    if(user){
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router