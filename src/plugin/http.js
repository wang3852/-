// 发送请求
import axios from 'axios'
const Http = {}
Http.install = function (Vue) {
	axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

	axios.interceptors.request.use(function (config) {
		// 在发送请求之前做些什么
		// console.log(config);
		
		if (config.url !== 'login') {
			const token = localStorage.getItem('token')
			config.headers.Authorization = token;
		}
		return config
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	})

	// 4. 添加实例方法
	Vue.prototype.$http = axios
}
//   导出对象
export default Http
