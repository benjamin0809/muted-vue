<template>
  <el-form :inline="true" :model="tableModel" class="demo-form-inline">
    <el-row :gutter="20">
      <el-col :span="6"><el-form-item label="Name">
          <el-input v-model="tableModel.name" placeholder="Name by" />
        </el-form-item></el-col>
      <el-col :span="6">
        <el-form-item label="Permission">
          <el-input v-model="tableModel.permission"  clearable placeholder="Permission by" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="OrgId">
          <el-input v-model="tableModel.orgId" placeholder="orgId by" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="Date">
          <el-date-picker v-model="tableModel.date" type="date" placeholder="Pick a day" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="end">
      <!-- <el-col> -->
      <el-button type="primary" @click="refresh">Query</el-button>
      <el-button type="primary" @click="onReset">Reset</el-button>
      <el-button type="primary" @click="onHandleOperate('create')">Create</el-button>
      <!-- </el-col> -->
    </el-row>
  </el-form>
  <el-divider></el-divider>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="orgId" label="orgId" />
    <el-table-column prop="permission" label="Permission" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="{ row }">
        <el-button type="text" size="small" @click="onHandleOperate('detail', row)">详情</el-button>
        <el-button type="text" size="small" @click="onHandleOperate('modify', row)">修改</el-button>
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

import { provide } from 'vue'
import UserInfo from './UserInfo.vue'
import useList from '../../stores/list'
import { API_ROLE_URL, BenPost } from '@/api';

import { ElMessage, ElMessageBox } from 'element-plus'
import { PROVIDE_getUser } from '@/provides'
import useFormTableRef from '@/hook/useFormTableRef';
import { FORM_STATUS } from '@/constants/common';
import { IUser } from '@shared/types';
const { visible, formId, status } = useFormTableRef()
const initModel = {
  name: '',
  orgId: '',
  date: '',
  permission: '',
}
const { page,
  size,
  list,
  total,
  tableModel,
  reset: onReset,
  handleSizeChange,
  handleCurrentChange,
  refresh,
  getData } = useList<IUser>(API_ROLE_URL.getRoles, {
    query: initModel
  })
// provide to Childs
provide(PROVIDE_getUser, refresh)

/**
 * 操作（新增、修改、详情）
 * @param row 
 * @param _status 状态
 */
const onHandleOperate = (_status, row?: IFormBase) => {
  status.value = _status
  visible.value = true
  if ([FORM_STATUS.DETAIL, FORM_STATUS.MODIFY].includes(_status)) {
    formId.value = row!.id
  }
}

/**
 * 删除
 * @param row 行数据
 */
const handleDelete = async (row: IFormBase) => {
  await ElMessageBox.confirm(
    'proxy will permanently delete the record. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
  await BenPost(API_ROLE_URL.deleteRole, { id: row.id })
  refresh()
  ElMessage({
    type: 'success',
    message: 'Delete completed',
  })
}

onMounted(() => {
  getData();
});
</script>
