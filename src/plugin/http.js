// 发送请求
import axios from 'axios'
import { Message } from 'element-ui'
const Http = {}
Http.install = function (Vue) {
	axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

	// 添加请求拦截器
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
	});
	// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	console.log('拦截响应');
	console.log(response);
	const {meta:{msg,status}} = response.data;
	
	
	// // 拦截不是200 和201的请求吧
	
	if (status!==200 & status!==201) {
		Message.waring(msg);
	}
	
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

	// 4. 添加实例方法
	Vue.prototype.$http = axios
}
//   导出对象
export default Http
