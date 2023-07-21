
<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="70%">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" size="small"
            status-icon>
            <el-form-item label="User name" prop="name">
                <el-input v-model="ruleForm.name" clearable :disabled="disabled" />
                <span class="tips">Please input User name，Length should be 3 to 20；eg: Benjamin Chiu</span>
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
                <el-select :disabled="disabled" v-model="ruleForm.role" multiple filterable remote reserve-keyword
                    placeholder="Please enter a keyword" remote-show-suffix :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Date" prop="date">
                <el-input v-model="ruleForm.date" :disabled="disabled" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">Cancel</el-button>
                <el-button type="primary" @click="submitForm()" :loading="loading">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { API_URL, BenPost, BenGet, IResult, API_ROLE_URL } from '@/api';
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { PROVIDE_getUser, PROVIDE_key } from '@/provides';
import { FORM_STATUS } from '@/constants/common';
import { useInstanceRef } from '@/shared'
import { FormRulesMap } from 'element-plus/es/components/form/src/form.type';
import { IRole } from '@shared/types';
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
const ruleFormRef = useInstanceRef(ElForm)
const options = ref<IRole[]>([])
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    address: '',
    email: '',
    date: '',
    role: '',
    avatar: ''
})
const rules = reactive<FormRulesMap>({
    name: [
        { required: true, message: 'Please input User name', trigger: 'blur' },
        { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    email: [
        {
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入正确的邮箱',
            trigger: 'blur',
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
const resetForm = () => {
    if (!ruleFormRef || !ruleFormRef.value?.resetFields) return
    ruleFormRef.value.resetFields()
}
watchEffect(() => {
    console.log('watchEffect,', props.id, props.status)
    if (props.id && [FORM_STATUS.DETAIL, FORM_STATUS.MODIFY].includes(props.status as FORM_STATUS)) {
        getData(props.id)
    } else {
        // resetForm()
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

const remoteMethod = (query: string) => {
    if (query) {
        loading.value = true
        BenGet<IResult<IRole>>(API_ROLE_URL.getRoles, { name: query }).then((res) => {
            loading.value = false
            options.value = res.data.list;
        });
    } else {
        options.value = []
    }
}
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
const submitForm = async () => {
    if (!ruleFormRef) return
    await ruleFormRef.value?.validate((valid, fields) => {
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
<style lang="scss" scoped>
.tips {
    color: #9e9e9e;
}
</style>