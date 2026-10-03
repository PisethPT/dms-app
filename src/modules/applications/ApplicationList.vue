<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>App Package Repository</span>
        <el-button type="primary">Upload APK / Package</el-button>
      </div>
    </template>

    <el-table :data="apps" style="width: 100%">
      <el-table-column prop="appName" label="Application Name" />
      <el-table-column prop="packageName" label="Package ID" />
      <el-table-column prop="version" label="Version" width="120" />
      <el-table-column prop="size" label="Size" width="100" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const apps = ref([
  {
    appName: 'DMS Agent Service',
    packageName: 'com.ood.dms.agent',
    version: '1.0.4',
    size: '12.4 MB',
  },
  {
    appName: 'MES Shopfloor Kiosk UI',
    packageName: 'com.ood.mes.kiosk',
    version: '2.1.0',
    size: '45.1 MB',
  },
])
</script>
