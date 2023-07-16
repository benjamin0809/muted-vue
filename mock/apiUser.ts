/*
 * @Author: your name
 * @Date: 2022-03-16 22:53:54
 * @LastEditTime: 2022-03-16 23:09:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\mock\apiUser.ts
 */
import Mock from "mockjs";
import { generateData, tryOnExecute } from "./util";
import User from "./User";
import { routes } from "./router";
const user = new User();
export default [
  {
    url: "/api/getUsers",
    method: "get",
    timeout: 300,
    response: ({ query }) => {
      console.log(query);
      const datalist = user.getList(query);
      return generateData(datalist);
    },
  },
  {
    url: "/api/deleteUser",
    method: "post",
    timeout: 300,
    response: ({ query, body }) => {
      console.log(body.id);
      return tryOnExecute(() => {
        return user.delete(body.id);
      });
    },
  },
  {
    url: "/api/saveUser",
    method: "post",
    timeout: 300,
    response: ({ body }) => {
      console.log(body);
      return tryOnExecute(() => {
        if (body.id) {
          return user.update(body);
        } else {
          return user.add(body);
        }
      });
    },
  },
  {
    url: "/api/getUser",
    method: "get",
    timeout: 200,
    response: ({ query }) => {
      console.log(query);
      return tryOnExecute(() => {
        return user.get(query.id);
      });
    },
  },
  {
    url: "/api/getRouters",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: routes,
      };
    },
  },
];
