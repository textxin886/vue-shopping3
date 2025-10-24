import axios from 'axios'
import { ElMessage } from 'element-plus' // 若用Element Plus，用于提示；无则删除
import { useRouter } from 'vue-router' // Vue3路由 hooks

// 1. 创建Axios实例（配置基础路径、超时等）
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从.env文件读取基础地址（推荐）
  timeout: 5000, // 请求超时时间（5秒）
  headers: {
    'Content-Type': 'application/json;charset=utf-8' // 默认请求头
  }
})

// 2. 请求拦截器（添加Token、处理请求参数等）
service.interceptors.request.use(
  (config) => {
    const router = useRouter()
    // 示例：从本地存储获取Token，添加到请求头（登录后需存储Token）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Token格式按后端要求调整
    }
    return config
  },
  (error) => {
    // 请求错误时的统一处理
    ElMessage.error('请求参数错误，请检查后重试')
    return Promise.reject(error)
  }
)

// 3. 响应拦截器（统一处理结果、错误提示等）
service.interceptors.response.use(
  (response) => {
    // 后端返回数据格式：{ code: 200, data: {}, msg: "成功" }（按实际调整）
    const res = response.data
    if (res.code !== 200) { // 非成功状态（如401未登录、403无权限）
      ElMessage.error(res.msg || '请求失败，请稍后重试')
      // 示例：401未登录时跳转登录页
      if (res.code === 401) {
        localStorage.removeItem('token') // 清除无效Token
        useRouter().push('/login') // 跳登录页
      }
      return Promise.reject(res) // 抛出错误，让组件捕获
    } else {
      return res.data // 只返回核心数据（res.data），简化组件使用
    }
  },
  (error) => {
    // 网络错误/服务器错误（如500）
    ElMessage.error(error.message || '网络异常，请检查网络连接')
    return Promise.reject(error)
  }
)

// 4. 封装常用请求方法（get/post/put/delete），简化调用
export const request = {
  // get请求：params为URL参数（拼接在?后）
  get(url, params = {}) {
    return service({
      url,
      method: 'get',
      params // 等价于 params: params
    })
  },

  // post请求：data为请求体（JSON格式）
  post(url, data = {}) {
    return service({
      url,
      method: 'post',
      data
    })
  },

  // put请求（修改数据，用法同post）
  put(url, data = {}) {
    return service({
      url,
      method: 'put',
      data
    })
  },

  // delete请求（删除数据，params为URL参数）
  delete(url, params = {}) {
    return service({
      url,
      method: 'delete',
      params
    })
  }
}

// 导出默认实例（也可直接导出request对象）
export default service
