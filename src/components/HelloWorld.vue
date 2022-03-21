<!--
 * @Author: your name
 * @Date: 2022-03-10 23:15:56
 * @LastEditTime: 2022-03-12 16:34:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\components\HelloWorld.vue
-->

<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore, useUserStore } from "@/stores/index";
defineProps<{ msg: string }>();

const counter = useCounterStore();
const user = useUserStore();

const count = ref(0);
const counterIncrement = () => counter.count++;

const onchange = () => {
  user.setName("new name");
};
</script>

<template>
  <h1>{{ user.userInfo }}</h1>
  <button @click="onchange">onchange</button>
  <button @click="counterIncrement">counterIncrement</button>
  <h1>{{ msg }}{{ counter.count }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
