<template>
  <div>Table ...</div>
  <div class="bg" v-size-ob="handleSizeOb">
    <ContextMenu :items="items" @item-clicked="receive" >
      00000000
      {{ vw }}
      {{ vh }}
      {{ x }} 
      {{ y }} 
      {{ name }}
    </ContextMenu>
  </div>
</template> 

<script lang="ts"  setup>
import { onMounted } from 'vue';
import ContextMenu from '@/components/layout/ContextMenu.vue';
import useViewport from '@/hook/useViewport';
import useMouse from '@/hook/useMouse';
// import { useMouse } from '@vueuse/core';
const { vw, vh } = useViewport()
const { x, y } = useMouse()
console.log({ vw, vh })
const items = Array.from({ length: 6 }, (k, v) => ({ name: 'Item' + v, id: Math.random() }));

const name = ref('')
onMounted(() => {
  console.log(items);
});

const receive = (data) => {
  console.log(data)
  name.value = data.name
}

const handleSizeOb = (e) => {
  console.log(e)
}
</script>


<style scoped lang="scss">
.bg {
  background-color: aqua;
  width: 100%;
  height: 100%;
}
</style>