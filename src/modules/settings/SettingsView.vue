<template>
  <el-card shadow="never">
    <template #header>System Settings</template>
    <el-form label-width="180px">
      <el-form-item label="MQTT Broker URL">
        <el-input value="tcp://mqtt.dms.local:1883" />
      </el-form-item>
      <el-form-item label="Heartbeat Interval (s)">
        <el-input-number :min="5" :max="300" :model-value="30" />
      </el-form-item>
      <el-form-item label="Auto-Approve Devices">
        <el-switch :model-value="false" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Save Changes</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
