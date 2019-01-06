import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Rights from '../components/rights.vue'
import Roles from '../components/roles.vue'
import {Message} from 'element-ui'

// ../ 在这里相当于 @/ 指的是src

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        }
      ]
    },

    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})


router.beforeEach((to, from, next) => {
  // console.log('路由守卫');

  // console.log('11',to);
  // console.log('22',from);
  // 如果要去的是登录->继续执行路由配置
  if (to.name == 'login') {
    next();
  } else {
     // 如果要去的是home页，判断token->有，继续访问，没有，回到登录页
  
    const token = localStorage.getItem('token');
    if (!token) {

      Message.warning('请先去登录');
      
      router.push({
        name:'login'
      })
    } else {
      next();
    }
  }
 
  
  
})
export default router