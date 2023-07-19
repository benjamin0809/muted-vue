import { FORM_STATUS } from "@/constants/common";
import { ref } from "vue";
interface Options {
  visible: boolean;
  formId: number;
  status: string;
}
export default function useFormTableRef(options?: Options) {
  const visible = ref(options?.visible || false);
  const formId = ref(options?.formId || 0);
  const status = ref(options?.status || FORM_STATUS.CREATE);
  return {
    visible,
    formId,
    status
  }
}
