import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
// ../ 在这里相当于 @/ 指的是src

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children:[ 
        {
        name: 'users',
        path: '/users',
        component:Users
      }]
    },

    {
      name: 'login',
      path: '/login',
      component: Login
    }
    
   
  ]
})
