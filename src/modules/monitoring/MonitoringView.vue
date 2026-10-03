<script setup></script>

<template>
  <el-space direction="vertical" fill style="width: 100%">
    <el-card shadow="never">
      <template #header>Real-time Telemetry & Metrics</template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-statistic title="CPU Usage Avg" :value="42" suffix="%" />
        </el-col>
        <el-col :span="12">
          <el-statistic title="Memory Consumption" :value="3.8" suffix="GB" />
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <template #header>System Events Stream</template>
      <el-timeline>
        <el-timeline-item timestamp="2026-10-03 10:10:00" type="primary">
          DEV-001 sent heartbeat pong
        </el-timeline-item>
        <el-timeline-item timestamp="2026-10-03 10:05:12" type="danger">
          DEV-002 reported high memory threshold (91%)
        </el-timeline-item>
        <el-timeline-item timestamp="2026-10-03 09:50:00" type="info">
          Policy update pushed to group: Production-Terminals
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-space>
</template>

<style scoped></style>
