import { BenGet } from "@/api";
import { IResult } from "@/api/user";
import { reactive, ref } from "vue";
import { cloneDeep } from "lodash-es";
interface IListOptions {
  /**
   * 表格配置
   */
  params?: any;
  /**
   * 查询条件
   */
  query?: Record<string, any>;
}
/**
 *
 * @param api 接口地址
 * @param listOption 表格配置
 * @returns
 */
const useList = <T>(api: any, listOption?: IListOptions) => {
  const defaultParam = {
    page: 1,
    size: 10,
  };
  let initTableModel = {};
  if (listOption?.query) {
    initTableModel = cloneDeep(listOption?.query);
  }
  const tableModel = reactive(listOption?.query || {});
  Object.assign(defaultParam, listOption?.params);
  const page = ref(defaultParam.page);
  const size = ref(defaultParam.size);
  const list = ref<any[]>([]);
  const total = ref(0);

  /**
   * 获取表格数据
   * @param query 查询参数
   * @returns
   */
  const getData = (query?: Record<string, any>) => {
    const params = {
      page: page.value,
      size: size.value,
    };
    Object.assign(params, query);
    return BenGet<IResult<T>>(api, params).then((res) => {
      list.value = res.data.list;
      total.value = res.data.total;
    });
  };
  /**
   * 重置
   */
  const reset = () => {
    page.value = 1;
    Object.assign(tableModel, initTableModel);
    getData(initTableModel);
  };
  /**
   * 页面大小改变
   * @param val 页面大小
   */
  const handleSizeChange = (val: number) => {
    size.value = val;
    page.value = 1;
    getData(tableModel);
  };
  /**
   * 页码变更事件
   * @param val
   */
  const handleCurrentChange = (val: number) => {
    page.value = val;
    getData(tableModel);
  };

  /**
   * 刷新事件
   */
  const refresh = () => {
    getData(tableModel);
  };
  return {
    page,
    size,
    list,
    total,
    handleSizeChange,
    handleCurrentChange,
    reset,
    refresh,
    getData,
    tableModel,
  };
};
export default useList;
