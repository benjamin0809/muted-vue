
<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="70%">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small"
            status-icon>
            <el-form-item label="Activity name" prop="name">
                <el-input v-model="ruleForm.name" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="Address" prop="address">
                <el-input v-model="ruleForm.address" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="Avatar" prop="avatar">
                <el-input v-model="ruleForm.avatar" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="Role" prop="role">
                <el-input v-model="ruleForm.role" :disabled="disabled" />
            </el-form-item>
            <el-form-item label="Date" prop="date">
                <el-input v-model="ruleForm.date" :disabled="disabled" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">Cancel</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { API_URL, BenPost, BenGet } from '@/api';
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import FormRules from 'element-plus'
import { PROVIDE_getUser, PROVIDE_key } from '@/provides';
import { FORM_STATUS } from '@/constants/common';

type FormInstance = InstanceType<typeof ElForm>

function useTypeRef(t: { new (...args): any }, ...args) {
    return ref<InstanceType<typeof t>>()

}
interface RuleForm {
    name: string
    address: string
    avatar: string
    date: string
    role: string
    email: string
}
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false
    },
    id: Number,
    status: String
})
const disabled = computed(() => props.status === FORM_STATUS.DETAIL)
const ruleFormRef = useTypeRef(ElForm)
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    address: '',
    email: '',
    date: '',
    role: '',
    avatar: ''
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})
const refresh = inject(PROVIDE_getUser)
const parent_key = inject(PROVIDE_key)
const emits = defineEmits(['update:dialogVisible', 'refresh'])
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl || !formEl.resetFields) return
    console.log('resetForm:', formEl)
    formEl.resetFields()
}
watchEffect(() => {
    console.log('watchEffect,', props.id, props.status)
    if (props.id && [FORM_STATUS.DETAIL, FORM_STATUS.MODIFY].includes(props.status as FORM_STATUS)) {
        getData(props.id)
    } else {
        Object.assign(ruleForm, {
            name: 'Hello',
            address: '',
            email: '',
            date: '',
            role: '',
            avatar: ''
        })
    }
})
const getData = (id) => {
    BenGet(API_URL.getUser, { id }).then(res => {
        console.log(res)
        Object.assign(ruleForm, res.data)
    })
}

const close = () => {
    emits('update:dialogVisible', false)
}

const loading = ref(false)
const submit = () => {
    return BenPost(API_URL.saveUser, ruleForm)
}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            submit().then(() => {
                loading.value = false
                // emits('refresh')
                console.log(parent_key)
                refresh!()
                close()
            })
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>
  