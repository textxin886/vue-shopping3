//懒人加载插件
import { useIntersectionObserver } from '@vueuse/core'
//引入vueuse的IntersectionObserver作用是监听元素是否在视口内，用来做懒加载
//在vueuse的官网中可以看到IntersectionObserver的使用方法

export const lazyLoad = {
//install用来做插件的安装，当使用app.use(plugin)，Vue 会自动调用插件的 install 方法
    install(app) {  
        //懒加载指令容器
        app.directive('img-lazy', {
    mounted(el, binding) {
        //定义全局属性img-lazy
         // el:是绑定的元素
        // binding:是指令的值-图片地址
        // console.log(el, binding.value)
      const {stop}= useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                // isIntersecting:是一个布尔值，表示元素是否在视口内
            //    console.log(isIntersecting);
                if (isIntersecting) {
                    // 如果元素在视口内，就设置src属性
                    el.src = binding.value
                    stop() //停止监听
                    
                }
            },
        )

    }
    })

    }
}