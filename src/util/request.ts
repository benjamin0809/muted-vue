/*
 * @Author: your name
 * @Date: 2022-03-12 19:18:06
 * @LastEditTime: 2022-03-12 22:26:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\util\request.ts
 */
import { baseUrl } from "@/config";
import Axios from "axios";
const instance = Axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    ContentType: "application/json",
  },
});
const token = 1
instance.interceptors.request.use(
  (config) => {
    config.headers = {
        Authorization: token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => { 
      if(response.status === 200) {
        if(response.data.code === 0) {
          return response.data
        } else {
          throw response.data.message
        } 
      } else if(response.status === 401){
        console.error(response.statusText)
      } 
    },
    (error) => Promise.reject(error)
  );

export default instance