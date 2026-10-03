<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>System Users</span>
        <el-button type="primary">Add User</el-button>
      </div>
    </template>

    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="role" label="Role" width="140" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="status" label="Status" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === 'Active' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { username: 'admin', role: 'System Admin', email: 'admin@ood.com', status: 'Active' },
  { username: 'operator1', role: 'Operator', email: 'op1@ood.com', status: 'Active' },
])
</script>
