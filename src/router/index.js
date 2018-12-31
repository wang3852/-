import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
// ../ 在这里相当于 @/ 指的是src

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'home',
      path: '/',
      component:Home
     
    },

    { 
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
