<!--
 * @Author: your name
 * @Date: 2022-03-12 12:08:26
 * @LastEditTime: 2022-03-12 16:34:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\components\Test.vue
-->
<script lang="ts" setup>
import { reactive } from "vue";
const array = reactive([
  {
    name: "Benjamin",
    id: 1,
  },
  {
    name: "Rose",
    id: 3,
  },
]);

const obj = reactive({
  name: "Benjamin",
  id: 1,
});
</script>
<template>
  <div>
    <ul>
      <li v-for="(item, name, index) in array" :key="name">
        <label>name: {{ name }}</label>
        <p>item: {{ item }}</p>
        <p>index: {{ index }}</p>
      </li>
    </ul>
    **************************************
    <ul>
      <li v-for="(item, name, index) of array" :key="name">
        <label>name: {{ name }}</label>
        <p>item: {{ item }}</p>
        <p>index: {{ index }}</p>
      </li>
    </ul>
    **************************************
    <ul>
      <li v-for="(item, name, index) in obj" :key="name">
        <label>name: {{ name }}</label>
        <p>item: {{ item }}</p>
        <p>index: {{ index }}</p>
      </li>
    </ul>
    **************************************
    <ul>
      <li v-for="(item, name, index) of obj" :key="name">
        <label>name: {{ name }}</label>
        <p>item: {{ item }}</p>
        <p>index: {{ index }}</p>
      </li>
    </ul>
  </div>
</template>
