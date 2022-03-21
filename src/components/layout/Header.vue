<!--
 * @Author: your name
 * @Date: 2022-03-14 20:43:06
 * @LastEditTime: 2022-03-17 18:51:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\layout\components\Header.vue
-->
<template>
  <div class="header">
    <el-row>
      <el-col :span="24" class="tool">
        <div
          @click="toggleCollapse"
          class="logo"
          :class="{ 'logo-collapse': setting.isCollapse }"
        >
          <el-icon><expand /></el-icon>
          <!-- <el-icon><fold /></el-icon> -->
        </div>
        <div class="right">
          <el-badge :value="12" class="item">
            <el-icon size="18"><bell /></el-icon>
          </el-badge>

          <el-dropdown>
            <div class="avatar"></div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item divided>个人信息</el-dropdown-item>
                <el-dropdown-item divided>设置</el-dropdown-item>
                <el-dropdown-item  divided>退出登录</el-dropdown-item> 
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="breadcrumb" :span="24"> <BreadCrumb /> </el-col>
    </el-row>
    <el-row>
      <el-col class="breadcrumb" :span="24"> <Tags /> </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import BreadCrumb from "./BreadCrumb.vue";
import { useSettingStore } from "@/stores";
import Tags from "./Tags.vue";
import {
  Bell,
  Location,
  Fold,
  Expand,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

const toggleCollapse = () => {
  setting.toggleCollapse();
  // setting.isCollapse = !setting.isCollapse
};
const setting = useSettingStore();
</script>
<style lang="scss" scoped> 
.el-row:first-child {
  height: 28px;
  flex: 1;
}
.breadcrumb {
  height: 28px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.tool {
  display: flex;
  align-items: center;
  .right {
    margin-left: auto;
    margin-right: 24px;
    display: flex;
    align-items: center;
    .item {
      margin-right: 24px;
      &::after {
        width: 24px;
        display: block;
        content: "";
      }
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: $base-color-yellow;
    }
  }

  .logo {
    cursor: pointer;
    margin-left: 16px;
    transition: transform 0.15s linear;
    transform: rotate3d(0, 1, 0, 180deg);
  }
  .logo-collapse {
    transform: rotate3d(0, 0, 0, 180deg);
  }
}
.header {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $base-color-green;
  border-bottom: 1px solid #e6e6e6;
}
</style>
