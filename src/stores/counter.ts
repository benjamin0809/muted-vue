/*
 * @Author: your name
 * @Date: 2022-03-10 23:20:50
 * @LastEditTime: 2022-03-10 23:22:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEimport 
 * 
 * @FilePath: \vite-ts-pippe\src\store\counter.js
 */
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
    state: () => {
        return { count: 0}
    },
    actions: {
        increment() {
            this.count ++
        }
    }
})