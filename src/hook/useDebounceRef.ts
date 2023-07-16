
import { customRef } from "vue"; 
export default function userDebounceRef<T>(value: T, delay = 200) {
    let timer
    return customRef<T>((track, trigger) => {
        return {
            set(val) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    value = val
                    trigger()
                }, delay)
            },
            get() {
                track()
                return value
            },
        }
    })
}