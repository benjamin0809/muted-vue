import { BenGet } from "@/api";
import { reactive, ref } from "vue";

const useList = <T>(api, ) => {
    const page = ref(1)
    const size = ref(10)

    const getData = () => {
        // BenGet<T>()
    }
    const reset = () => {

    }
    return {
        page,
        size,
        reset
    }
}
export default useList