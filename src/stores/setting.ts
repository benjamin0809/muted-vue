/*
 * @Author: your name
 * @Date: 2022-03-14 20:34:29
 * @LastEditTime: 2022-03-17 17:10:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\stores\setting.ts
 */
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
interface IStore {
    isCollapse: boolean
    asideWidth: number
    keepAlive: string[]
    routes: any[]
}

interface IGetters {
    cacheViews: string 
}

interface IActions {
    toggleCollapse: () => void
    addKeepAlive: (name: string) => void
    removeKeepAlive: (name: string) => void
}
  
export const useSettingStore = defineStore<string, IStore, any, IActions>('setting', {
    state: () => {
        return { isCollapse: false, asideWidth: 200, keepAlive: new Array(), routes: []}
    },
    getters: {
        cacheViews: (state) => {
            return state.keepAlive.join(',')
        } 
    },
    actions: {
        toggleCollapse() { 
            this.isCollapse = !this.isCollapse  
            if(this.isCollapse) {

            }
            this.asideWidth = this.isCollapse ? 64 : 200
        },
        addKeepAlive(name: string) {
            if(this.keepAlive && !this.keepAlive.includes(name)) {
                this.keepAlive.push(name)
            }
        },
        removeKeepAlive(name: string) {
            if(this.keepAlive && this.keepAlive.includes(name)) {
                const index = this.keepAlive.indexOf(name)
                this.keepAlive.splice(index, 1)
            }
        }, 
    }
})