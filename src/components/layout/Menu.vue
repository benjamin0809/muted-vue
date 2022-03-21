<!--
 * @Author: your name
 * @Date: 2022-03-14 16:14:47
 * @LastEditTime: 2022-03-14 16:29:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\components\Aside.vue
-->
<script lang="ts" setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores";
import router, { routes } from "@/routers";
const { isCollapse, routes: menus } = useSettingStore();
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const selectMenu = (index: string) => {
  // console.log(index);

  router
    .push({
      name: index,
    }).catch(console.error)
};
</script>
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="selectMenu"
  >
    <el-sub-menu index="1" v-for="item in menus" :key="item.id">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.name">{{item1.title}}</el-menu-item> 
    </el-sub-menu> 
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: transparent;
}
</style>

<style lang="scss">
@import "@/assets/color.scss";
.el-aside {
  transition: width 0.15s linear;
  background-color: transparent;
}
</style>
