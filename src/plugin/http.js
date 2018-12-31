
// 发送请求
import axios from 'axios'
const Http ={}
Http.install = function (Vue) {
   
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
    
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
//   导出对象
  export default Http