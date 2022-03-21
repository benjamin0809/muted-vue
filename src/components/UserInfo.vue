<!--
 * @Author: your name
 * @Date: 2022-03-11 22:06:38
 * @LastEditTime: 2022-03-17 16:39:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-ts-pippe\src\components\UserInfo.vue
-->
<script lang="ts" setup>
import { useUserStore } from "@/stores/index";
import request from '@/util/request'
import { onActivated, onMounted, reactive } from "@vue/runtime-core"; 
const { userInfo } = useUserStore();
const result = reactive({ list: new Array()})
console.log(userInfo);
onMounted(() => {
  request.get(`/api/getUsers`).then(res => {
    result.list = res.data.data.list
  })
})

onActivated(() => {
  console.log('onActivated')
})

</script> 
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'user',
  setup() {
    
  },
})
</script>

<template>
  <div>
    <el-row class="mb-4">
      <el-button v-for="item in result.list" :key="item.id">{{item.id}}</el-button> 
    </el-row>

    <ul>
      <!-- <li v-for="item in userInfo" :key="item">
        {{ item }}{{ userInfo[item] }}
      </li> -->
    </ul>
  </div>
</template>
