<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>Device Commands</span>
        <el-button type="primary">Dispatch New Command</el-button>
      </div>
    </template>

    <el-table :data="commands" style="width: 100%">
      <el-table-column prop="id" label="Task ID" width="120" />
      <el-table-column prop="target" label="Target Device / Group" />
      <el-table-column prop="action" label="Command Type" width="180" />
      <el-table-column prop="status" label="Status" width="140">
        <template #default="{ row }">
          <el-tag :type="getStatusTag(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Dispatched At" width="180" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const commands = ref([
  {
    id: 'CMD-101',
    target: 'DEV-001',
    action: 'REBOOT',
    status: 'Completed',
    time: '2026-10-03 09:30',
  },
  {
    id: 'CMD-102',
    target: 'Group-All-Android',
    action: 'CLEAR_CACHE',
    status: 'In Progress',
    time: '2026-10-03 10:00',
  },
  {
    id: 'CMD-103',
    target: 'DEV-002',
    action: 'COLLECT_LOGS',
    status: 'Failed',
    time: '2026-10-03 10:05',
  },
])

const getStatusTag = (status) => {
  if (status === 'Completed') return 'success'
  if (status === 'In Progress') return 'warning'
  return 'danger'
}
</script>
