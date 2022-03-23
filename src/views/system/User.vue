<template>
  <div>User ...</div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Name">
      <el-input v-model="formInline.user" placeholder="Name by" />
    </el-form-item>
        <el-form-item label="Date">
      <el-input v-model="formInline.user" placeholder="Date by" />
    </el-form-item>
       <el-form-item label="Email">
      <el-input v-model="formInline.user" placeholder="Email by" />
    </el-form-item>
    <el-form-item label="Address">
      <el-select v-model="formInline.address" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="email" label="Email" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :small="true"  
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { getUsers } from "@/api/user";
const tableData = ref();
const page = ref({
  currentPage: 1,
  pageSize: 10,
  total: 500

})
onMounted(() => {
  getData();
}); 

const formInline = reactive({
  user: '',
  address: '',
})

const onSubmit = (...e) => {
  console.log('submit!',formInline)
}
const handleClick = () => {
  console.log("click");
};
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  page.value.pageSize = val
  page.value.currentPage = 1
  getData() 
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  page.value.currentPage = val
  getData() 
}
const getData = async () => { 
  const { data } = await getUsers({
    page: page.value.currentPage,
    pageSize: page.value.pageSize
  });
  tableData.value = data.list;
  page.value.total = data.total  
}
</script>
