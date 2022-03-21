/*
 * @Author: your name
 * @Date: 2022-03-10 23:15:56
 * @LastEditTime: 2022-03-12 16:59:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\main.ts
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers' 
// import '@/assets/color.scss'


// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)
// app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
