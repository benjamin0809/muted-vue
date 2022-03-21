<!--
 * @Author: your name
 * @Date: 2022-03-17 16:19:18
 * @LastEditTime: 2022-03-17 18:39:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\layout\components\Tabs.vue
-->
<template>
  <el-tag
    v-for="tag in setting.keepAlive"
    :key="tag"
    class="mx-2 space"
    closable
    :type="router.currentRoute.value.name === tag ? 'success' : 'info'"
    @click="handleClick(tag)"
    @close="handleClose"
  >
    {{ tag }}
  </el-tag>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useSettingStore } from "@/stores";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const setting = useSettingStore();
const router = useRouter();

// 监听路由改变 若tabs中不存在当前路由，则增加路由
watch(
  () => route.name,
  () => {
    // 获取当前路由所在tabs的下标
    setting.addKeepAlive(route.name as string);
  },
  {
    immediate: true,
  }
);

const handleClick = (tag: string) => {
  console.log(tag, router.currentRoute.value.name) 
  router.push({
    name: tag,
  });
};

const handleClose = () => {};

const tags = ref([
  { name: "Tag 1", type: "" },
  { name: "Tag 2", type: "success" },
  { name: "Tag 3", type: "info" },
  { name: "Tag 4", type: "warning" },
  { name: "Tag 5", type: "danger" },
]);
</script>

<style lang="scss" scoped>
.space {
  &:nth-child(n + 2) {
    margin-left: 16px;
  }
  cursor: pointer;
}
</style>
