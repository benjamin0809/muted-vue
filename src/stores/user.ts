import { defineStore } from "pinia";
import { reactive } from "vue";

/*
 * @Author: your name
 * @Date: 2022-03-10 23:41:00
 * @LastEditTime: 2022-03-12 00:42:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\stores\user.ts
 */
export const useUserStore = defineStore('user', () => {
    const userInfo = reactive({
        name: 'benjamin',
        email: '894306909@qq.com',
        age: 28,
        school: '北京师范大学珠海分校',
        skills: ['JavaScript', 'CSS3','Vue']
    })

    const setName = (name: string) => userInfo.name = name
    return {
        setName,
        userInfo
    }
})