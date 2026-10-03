<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>Total Devices</template>
          <h1>1,248</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>Online</template>
          <h1 style="color: #67c23a">1,120</h1>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>Offline</template>
          <h1 style="color: #f56c6c">128</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
