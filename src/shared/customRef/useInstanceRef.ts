import { ref } from 'vue'

/**
 * 返回组件实例类型的ref
 * @param _comp 组件对象
 * @returns 具有组件实例类型的ref
 */
export function useInstanceRef<T extends abstract new (...args: any) => any>(_comp: T) {
    return ref<InstanceType<T>>()
}