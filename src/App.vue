<!--
 * @Author: your name
 * @Date: 2022-03-10 23:15:55
 * @LastEditTime: 2022-03-17 16:13:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\App.vue
-->
<script setup lang="ts">
import { getRouters } from "@/api/user";
import { arrayToTree } from "@/util";
import { useSettingStore } from "@/stores";
// This starter template is using Vue 3 <script setup> SFCs
const setting = useSettingStore()
getRouters().then(res => setting.routes = arrayToTree(res))


// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
 
</script>
<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus"; 

export default defineComponent({
  components: {
    ElConfigProvider,
  }, 
  data() {
    return {
      zIndex: 3000,
      size: "small",
    };
  },
});
</script>

<template>
  <el-config-provider size="small">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
