// axios 基础的封装
import 'element-plus/theme-chalk/el-message.css'//提示组件
import { ElMessage } from 'element-plus'
import axios from 'axios';
//axios.create的作用是创建一个新的axios实例，
// 这个实例可以有自己的配置和拦截器等，互不影响
// 这样做的好处是可以根据不同的需求创建不同的axios实例，
const httpInstance=axios.create({
    baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
    //这里只能写到域名
    // 具体的请求路径在请求的时候传入
    // 例如：url:/home/category/head
    timeout: 5000,
})
// 添加请求拦截器
httpInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // console.log('请求拦截器', config);
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // console.log('响应拦截器', response);
        return response.data;
    },
    (error) => {
        //错误提示
        // console.log('响应错误', error.response)
        ElMessage({
            message: error.response.data.message || '请求失败',
            type: 'warning',
        })
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
export default httpInstance;//暴露出去