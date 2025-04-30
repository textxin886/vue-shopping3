import '@/styles/common.scss'//引入默认样式文件

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入懒人加载指令插件并注册
import { lazyLoad } from '@/directives/index.js'
//引入全局组件插件
import {componentPlugin} from '@/components/index.js'//导入全局组件
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyLoad)
app.use(componentPlugin) //注册全局组件
app.mount('#app')




