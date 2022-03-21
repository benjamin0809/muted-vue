/*
 * @Author: your name
 * @Date: 2022-03-16 22:53:54
 * @LastEditTime: 2022-03-16 23:09:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\mock\apiUser.ts
 */
import Mock from 'mockjs'
import  { generateData } from './util'
import { routes } from './router'
export default [{
    url: '/api/getUsers',
    method: 'get',
    response: () => {
        return generateData(Mock.mock({
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        })) 
    }
}, {
    url: '/api/getRouters',
    method: 'get',
    response: () => {
        return {
            code: 0,
            message: 'ok',
            data: routes
        }
    }
}]