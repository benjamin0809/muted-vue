<template>
  <input v-model="input" placeholder="" />
  <el-input v-model="input" placeholder="Please input" />
  <span>{{ input }}}</span>
  <el-button type="" @click="stop"></el-button>
  <Suspense @resolve="resolve" @pending="pending" @fallback="fallback">
    <WithSuspense :time="2000">
      <WithSuspense :time="1500" />
      <WithSuspense :time="1200">
        okok {{ time }}
        <WithSuspense :time="1000" />
        <WithSuspense :time="5000" />
      </WithSuspense>
    </WithSuspense>

    <template #fallback>
      loading {{ time }}
    </template>
  </Suspense>
</template> 
<script lang="ts" setup>
import { ref, watch, onMounted, effectScope } from 'vue';
import WithSuspense from '@/components/case/WithSuspense.vue'
import useDebounceRef from '@/hook/useDebounceRef';
import { getCurrentScope } from 'vue';
const time = ref(0)
const timer = ref<any>(0)
const setTimer = () => {
  time.value++
  timer.value = setTimeout(() => {
    test.value.nested++
    setTimer()
  }, 1000);
}
setTimer()

const test = ref({
  nested: 0
})
const doubled = computed(() => test.value.nested * 2)

onMounted(() => {
  watch(test.value, (val) => console.log('nest is changed', val))
})
const input = useDebounceRef<string>('hello')
onMounted(() => {
  watch(doubled, (val) => console.log('doubled is changed', val))
})

const scope = effectScope()


scope.run(() => {

  watch(input, () => console.log(input.value))

  // watchEffect(() => console.log('Count: ', input))
  console.log('scope.run:', getCurrentScope())
})
console.log('scope outer:', getCurrentScope())
const stop = () => {
  // 处理掉当前作用域内的所有 effect
  scope.stop()
}



const resolve = () => {
  clearTimeout(timer.value)
  console.log('resolve')
}

const pending = () => {
  console.log('pending')
}

const fallback = () => {
  console.log('fallback')
}

// await delay(1000)
</script>