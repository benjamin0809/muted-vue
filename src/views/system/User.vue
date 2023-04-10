<template>
  <div>User ...</div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Name">
      <el-input v-model="formInline.name" placeholder="Name by" />
    </el-form-item>
    <el-form-item label="Date">
      <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a day" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="formInline.email" placeholder="Email by" />
    </el-form-item>
    <el-form-item label="Address">
      <el-select v-model="formInline.address" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
      <el-button type="primary" @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="email" label="Email" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick">Detail</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="page" v-model:page-size="size" :page-sizes="[10, 20, 50, 100]" :small="true"
    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { IUser } from "@/api/user";
import useList from '../../stores/list'
import { API_URL } from '@/api';
import { getCurrentInstance } from 'vue';
const { page,
  size,
  list,
  total,
  reset,
  handleSizeChange,
  handleCurrentChange,
  getData } = useList<IUser>(API_URL.getUsers)

const {
  appContext: {
    config: {
      globalProperties: {
        benjaminPublic
      }
    }
  }
} = getCurrentInstance()
onMounted(() => {
  getData();
  console.log(this)
  console.log(benjaminPublic());
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
const handleClick = () => {
  console.log("click");
};
</script>
