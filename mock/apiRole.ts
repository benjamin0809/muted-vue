/*
 * @Author: your name
 * @Date: 2022-03-16 22:53:54
 * @LastEditTime: 2022-03-16 23:09:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\mock\apiRole.ts
 */
import Mock from "mockjs";
import { generateData, tryOnExecute } from "./util";
import roleService from "./service/roleService";
import { routes } from "./router";
const role = new roleService();
export default [
  {
    url: "/api/getRoles",
    method: "get",
    timeout: 300,
    response: ({ query }) => {
      console.log(query);
      const datalist = role.getList(query);
      return generateData(datalist);
    },
  },
  {
    url: "/api/deleteRole",
    method: "post",
    timeout: 300,
    response: ({ query, body }) => {
      console.log(body.id);
      return tryOnExecute(() => {
        return role.delete(body.id);
      });
    },
  },
  {
    url: "/api/saveRole",
    method: "post",
    timeout: 300,
    response: ({ body }) => {
      console.log(body);
      return tryOnExecute(() => {
        if (body.id) {
          return role.update(body);
        } else {
          return role.add(body);
        }
      });
    },
  },
  {
    url: "/api/getRole",
    method: "get",
    timeout: 200,
    response: ({ query }) => {
      console.log(query);
      return tryOnExecute(() => role.get(query.id));
    },
  }
];
