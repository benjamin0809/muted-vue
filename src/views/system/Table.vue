<template>
  <div>Table ...</div>
  <div class="bg">
    <ContextMenu :items="items" @item-clicked="receive">
      00000000

      {{ name }}
    </ContextMenu>
  </div>
</template> 

<script lang="ts"  setup>
import { onMounted } from 'vue';
import ContextMenu from '@/components/layout/ContextMenu.vue';

const items = Array.from({length: 6}, (k, v) => ({name: 'Item' + v, id: Math.random()}));

const name = ref('')
onMounted(() => {
  console.log(items);
});

const receive = (data) => {
  console.log(data)
  name.value = data.name
}
</script>


<style scoped lang="scss">
.bg {
  background-color: aqua;
  width: 300px;
  height: 300px;
}
</style>