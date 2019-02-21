// const Foo = () => import('./Foo.vue')

// const Vue = () => import('vue')
// const Router = () => import('vue-router')
// const Login = () => import('../components/login.vue')
// const Home = () => import('../components/home.vue')
// const Users = () => import('../components/users.vue')
// const Rights = () => import('../components/rights.vue')
// const Roles = () => import('../components/roles.vue')
// const Goolslist = () => import('../components/goodslist.vue')
// const Goodsadd = () => import('../components/goodsadd.vue')
// const Params = () => import('../components/params.vue')
// const Goodscate = () => import('../components/goodscate.vue')
// const Order = () => import('../components/order.vue')
// const Report = () => import('../components/report.vue')

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Users from'../components/users.vue'
import Rights from '../components/rights.vue'
import Roles from '../components/roles.vue'
import Goolslist from '../components/goodslist.vue'
import Goodsadd from'../components/goodsadd.vue'
import Params from '../components/params.vue'
import Goodscate from'../components/goodscate.vue'
import Order from '../components/order.vue'
import Report from'../components/report.vue'
import { Message } from 'element-ui'

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
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goolslist
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: Goodsadd
        },
        {
          name: 'params',
          path: '/params',
          component: Params
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscate
        },
        {
          name: 'orders',
          path: '/orders',
          component: Order
        },
        {
          name: 'reports',
          path: '/reports',
          component: Report
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
        name: 'login'
      })
    } else {
      next();
    }
  }



})
export default router