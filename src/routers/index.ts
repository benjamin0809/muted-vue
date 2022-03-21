/*
 * @Author: your name
 * @Date: 2022-03-12 00:50:44
 * @LastEditTime: 2022-03-17 16:14:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\routers\index.ts
 */

import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/Index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 
NProgress.configure({ showSpinner: false });
export const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "DashBoard",
    component: Layout,
    redirect: "/user",
    children: [
      {
        name: "user",
        meta: {
          title: "User Management",
          isCache: true,
        },
        path: "user",
        component: () => import("@/views/system/User.vue"),
      },
      {
        name: "role",
        meta: {
          title: "Role Management",
          isCache: true,
        },
        path: "role",
        component: () => import("@/views/system/Role.vue"),
      },
      {
        name: "table",
        meta: {
          title: "Table Management",
          isCache: true,
        },
        path: "table",
        component: () => import("@/views/system/Table.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // ...
  // explicitly return false to cancel the navigation
  // setting.
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
