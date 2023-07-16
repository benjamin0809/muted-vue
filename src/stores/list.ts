import { BenGet } from "@/api";
import { IResult, IUser } from "@/api/user";
import { reactive, ref } from "vue";

const useList = <T>(api: any, params?: any) => {
    const defaultParam = {
        page: 1,
        size: 10
    }
    Object.assign(defaultParam, params)
    const page = ref(defaultParam.page)
    const size = ref(defaultParam.size)
    const list = ref<any[]>([])
    const total = ref(0)

    const getData = (query?: Record<string, any>) => {
        const params = {
            page: page.value,
            size: size.value
        }
        Object.assign(params, query)
        return BenGet<IResult<T>>(api, params).then(res => {
            list.value = res.data.list
            total.value = res.data.total
        })
    }
    const reset = () => {
        page.value = 1
        getData()
    }
    const handleSizeChange = (val: number) => {
        console.log(`${val} items per page`)
        size.value = val
        page.value = 1
        getData()
    }
    const handleCurrentChange = (val: number) => {
        console.log(`current page: ${val}`)
        page.value = val
        getData()
    }
    return {
        page,
        size,
        list,
        total,
        handleSizeChange,
        handleCurrentChange,
        reset,
        getData
    }
}
export default useList