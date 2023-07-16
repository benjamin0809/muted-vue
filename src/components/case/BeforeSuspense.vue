<template>
    <div class="async-component" :class="!loading && 'loaded'">
        <spinner v-if="loading"></spinner>
        <slot></slot>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(false)
const { time } = defineProps({
    time: {
        type: Number,
        time: 2000
    }
})
setTimeout(() => {
    loading.value = time
})
</script>