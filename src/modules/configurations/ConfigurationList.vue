<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>Device Configurations</span>
        <el-button type="primary">Create Profile</el-button>
      </div>
    </template>

    <el-table :data="configs" style="width: 100%">
      <el-table-column prop="name" label="Config Name" />
      <el-table-column prop="targetOs" label="Target OS" width="120" />
      <el-table-column prop="version" label="Version" width="100" />
      <el-table-column prop="updatedAt" label="Last Modified" width="180" />
      <el-table-column label="Actions" width="120">
        <template #default>
          <el-button link type="primary">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const configs = ref([
  { name: 'Android Kiosk Config', targetOs: 'Android', version: 'v1.4', updatedAt: '2026-09-28' },
  {
    name: 'Windows Terminal Agent Config',
    targetOs: 'Windows',
    version: 'v2.0',
    updatedAt: '2026-09-30',
  },
])
</script>
