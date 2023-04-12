const eleMap = new WeakMap()
const ob = new ResizeObserver(entries => {
    for (let item of entries) {
        // console.log(item)    
        const handler = eleMap.get(item.target)
        if (typeof handler === 'function') {
            handler({
                width: item.target.clientWidth,
                height: item.target.clientHeight
            })
        }

    }
})
const SizeObOption = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
        // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode, prevVnode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode, prevVnode) {
        if (!eleMap.has(el)) {
            eleMap.set(el, binding.value)
        }
        ob.observe(el)
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) { },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding, vnode, prevVnode) {

    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode) { },
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode, prevVnode) {
        ob.unobserve(el)
    }
}

export default SizeObOption
// 使 v-focus 在所有组件中都可用
// app.directive('size-ob', myDirective)
