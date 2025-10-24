<template>
  <div class="user-page">
    <h2>用户管理</h2>
    <button @click="addUser">新增用户</button>
    <ul>
      <li v-for="user in userList" :key="user.id">{{ user.name }} - {{ user.phone }}</li>
    </ul>
  </div>
</template>

<script setup>
// 1. 导入封装的request对象
import { request } from '@/utils/request'
import { ref, onMounted } from 'vue'

// 2. 定义响应式数据
const userList = ref([]) // 用户列表
const loading = ref(false) // 加载状态（可选，优化体验）

// 3. 封装请求方法（推荐用async/await，同步写法更清晰）
// 3.1 获取用户列表（get请求，带URL参数：页码、每页条数）
const getUserList = async () => {
  loading.value = true // 开始加载
  try {
    // 调用get方法：参数1=接口地址，参数2=URL参数（会拼接为 /users?page=1&size=10）
    const data = await request.get('/users', { page: 1, size: 10 })
    userList.value = data // 赋值响应数据（已在拦截器中处理为res.data）
  } catch (error) {
    console.error('获取用户列表失败：', error) // 错误捕获（可选，用于调试）
  } finally {
    loading.value = false // 结束加载（无论成功/失败）
  }
}

// 3.2 新增用户（post请求，带请求体）
const addUser = async () => {
  try {
    // 调用post方法：参数1=接口地址，参数2=请求体（JSON格式）
    const data = await request.post('/users', {
      name: '张三',
      phone: '13800138000',
      role: '普通用户'
    })
    ElMessage.success('新增用户成功')
    getUserList() // 新增后刷新列表
  } catch (error) {
    console.error('新增用户失败：', error)
  }
}

// 4. 组件挂载时执行请求（页面加载时获取列表）
onMounted(() => {
  getUserList()
})
</script>
