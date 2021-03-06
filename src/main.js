// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Http from './plugin/http'
import './assets/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import myBread from './components/cusBread.vue'

// 处理日期格式
Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.use(Http)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component(myBread.name, myBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
