<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>Security Policies</span>
        <el-button type="primary">Add Policy</el-button>
      </div>
    </template>

    <el-table :data="policies" style="width: 100%">
      <el-table-column prop="id" label="Policy ID" width="120" />
      <el-table-column prop="title" label="Policy Title" />
      <el-table-column prop="enforced" label="Enforced" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.enforced" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const policies = ref([
  { id: 'POL-01', title: 'Disable USB Storage Access', enforced: true },
  { id: 'POL-02', title: 'Force Screen Lock Timeout (5 min)', enforced: true },
  { id: 'POL-03', title: 'Restrict Sideloading APKs', enforced: false },
  { id: 'POL-04', title: 'Enable Device Encryption', enforced: true },
  { id: 'POL-05', title: 'Disable Camera Access', enforced: false },
  { id: 'POL-06', title: 'Restrict App Installations', enforced: true },
  { id: 'POL-07', title: 'Enforce Strong Password Policy', enforced: true },
  { id: 'POL-08', title: 'Disable Bluetooth Access', enforced: false },
  { id: 'POL-09', title: 'Enable Remote Wipe Capability', enforced: true },
  { id: 'POL-10', title: 'Restrict Location Services', enforced: false },
])
</script>
