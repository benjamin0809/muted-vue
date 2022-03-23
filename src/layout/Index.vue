<!--
 * @Author: your name
 * @Date: 2022-03-14 17:10:14
 * @LastEditTime: 2022-03-17 18:43:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\layout\Index.vue
-->
<template>
  <div class="common-layout"  >
    <el-container>
      <el-aside :width="asideWidth" class="aside" >
        <Menu />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header />
        </el-header>
        <el-main class="main">
          <div class="container">
            <router-view v-slot="{ Component }">
              <keep-alive :include="cacheViews">
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { useSettingStore } from "@/stores";
import { computed, ComputedRef } from "vue";  
const setting = useSettingStore();
const cacheViews = computed(() => setting.keepAlive.concat([]));
const asideWidth = computed(
  () => setting.asideWidth + "px"
); 

</script>

<style lang="scss" scoped> 
.common-layout {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $base-color-pink;
}
.header {
  padding: 0;
  height: 112px;
}
.aside {
  background-color: $base-color-yellow;
}
.main {
  margin: 16px;
  background: #fff;
  height: calc(100vh - 112px - 60px);
  position: relative;
  overflow-y: scroll;
  .container {
    background: #fff;
  }
}
</style>
