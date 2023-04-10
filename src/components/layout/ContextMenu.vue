<template>
    <div ref="area" class="context-menu-box">
        <slot></slot>
        <Teleport to="body">
            <div v-if="isShow" class="context-menu-container" :style="{
                top: y + 'px',
                    left: x + 'px'
            }">
                <ul>
                    <li v-for="item in props.items" :key="item.id" @click="handleClick(item)">{{ item.name }}</li>
                </ul>
            </div>
        </Teleport>
    </div>
</template> 
  
<script lang="ts"  setup>
import { onMounted, ref, defineEmits } from 'vue';
interface ContextMenuProps {
    items: Array<Menu>
}
interface Menu {
    name: string,
    id: number
}
const x = ref(0)
const isShow = ref(false)
const area = ref<HTMLElement>()
const y = ref(0)

const emits = defineEmits(['item-clicked'])
const handleClick = (item: Menu) => {
    // Emit the clicked item's id to the parent component
    emits('item-clicked', item)
    isShow.value = false
}
onMounted(() => {
    console.log(area.value)
    // Listen for contextmenu event
    area.value?.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        event.stopPropagation()
        // Do something on contextmenu event
        isShow.value = true
        x.value = event.clientX
        y.value = event.clientY
        console.log('contextmenu', event)
    });

    window.addEventListener('contextmenu', () => {
        isShow.value = false
    }, false)
})
const props = defineProps<ContextMenuProps>()
</script>



<style lang="scss" scoped>
.context-menu-box {
    width: 100%;
    height: 100%
}

.context-menu-container {
    position: fixed;
    background-color: aliceblue;
    padding: 0px 0px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    /* 生成一个弹窗阴影 */
}

ul {
    list-style: none;
    padding: 0px;
    width: 160px;

    li {
        height: 32px;
        line-height: 32px;
        vertical-align: center;
        padding: 0px 12px;
        cursor: pointer;
    }

    li:hover {
        background: #e3e3e3;
    }
}
</style>