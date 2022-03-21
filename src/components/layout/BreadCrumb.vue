<!--
 * @Author: your name
 * @Date: 2022-03-14 17:10:43
 * @LastEditTime: 2022-03-14 22:25:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\layout\components\BreadCrumd.vue
-->
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const { currentRoute } = router;

const handleBreadClick = (path: string) => {
  if (path === currentRoute.value.path) return;
  router.push(path);
};
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      class="breadcrumb-name"
      v-for="item in currentRoute.matched"
      :key="item.path"
      @click="handleBreadClick(item.path)"
    >
      <span class="breadcrumb-name">{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped>
.breadcrumb-name {
  cursor: pointer;
  &:hover {
    font-weight: bold ;
    // text-decoration: underline;
  }
}
</style>
