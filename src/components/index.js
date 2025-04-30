//把components中所有的组件进行全局化注册
import  imageView  from './imageView/index.vue'
import  Sku  from './XtxSku/index.vue'
export const componentPlugin = {
    install(app) {//是 Vue 插件的核心方法。当使用 app.use(componentPlugin) 注册插件时，Vue 会自动调用这个 install 方法。
        //app.component('组件名称', 组件的配置对象)
        // 全局注册组件-这样使用时候就不需要import 了
        app.component('XtximageView', imageView)
        app.component('XtxSku', Sku)
    }}

