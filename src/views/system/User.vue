<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-row :gutter="20">
      <el-col :span="6"><el-form-item label="Name">
          <el-input v-model="formInline.name" placeholder="Name by" />
        </el-form-item></el-col>
      <el-col :span="6">
        <el-form-item label="Address">
          <el-select v-model="formInline.address" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Email">
          <el-input v-model="formInline.email" placeholder="Email by" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Date">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a day" />
        </el-form-item>

      </el-col>
    </el-row>
    <el-row :gutter="20" justify="end">
      <!-- <el-col> -->
      <el-button type="primary" @click="onSubmit">Query</el-button>
      <el-button type="primary" @click="onReset">Reset</el-button>
      <el-button type="primary" @click="onCreate">Create</el-button>
      <!-- </el-col> -->
    </el-row>
  </el-form>
  <el-divider></el-divider>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="email" label="Email" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="{ row }">
        <el-button type="text" size="small" @click="handleClick(row)">详情</el-button>
        <el-button type="text" size="small" @click="handleModify(row)">修改</el-button>
        <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="page" v-model:page-size="size" :page-sizes="[10, 20, 50, 100]" :small="true"
    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
  <UserInfo v-model:dialogVisible="visible" :id="formId" :status="status" @refresh="refresh"></UserInfo>
</template>

<script lang="ts" setup>
import { reactive, provide } from 'vue'
import { IUser } from "@/api/user";
import UserInfo from './UserInfo.vue'
import useList from '../../stores/list'
import { API_URL, BenPost } from '@/api';
const { page,
  size,
  list,
  total,
  reset,
  handleSizeChange,
  handleCurrentChange,
  getData } = useList<IUser>(API_URL.getUsers)
import { ElMessage, ElMessageBox } from 'element-plus'
import { PROVIDE_GETUSER, PROVIDE_getUser, PROVIDE_key } from'@/provides'
const visible = ref(false)
const formId = ref(0)
const status = ref('create')
onMounted(() => {
  getData();
});
const init = () => ({
  name: '',
  email: '',
  date: '',
  address: '',
})
const formInline = reactive(init())

const onSubmit = (...e) => {
  getData(formInline)
  console.log('submit!', formInline)
}
const onReset = () => {
  console.log('init:', init())
  Object.assign(formInline, init())
  reset()
}
const refresh = () => {
  getData(formInline)
}
provide(PROVIDE_getUser, refresh)
provide(PROVIDE_GETUSER, refresh)
provide(PROVIDE_key, 'user provide varible')
const onCreate = () => {
  status.value = 'create'
  visible.value = true
}
const handleClick = (row) => {
  status.value = 'detail'
  visible.value = true
  formId.value = row.id
};
const handleModify = (row) => {
  status.value = 'modify'
  visible.value = true
  formId.value = row.id
};

const handleDelete = async (row) => {
  await ElMessageBox.confirm(
    'proxy will permanently delete the record. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
  BenPost(API_URL.deleteUser, { id: row.id })
  .then (res => {
    getData(formInline)
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  })

}
</script>
