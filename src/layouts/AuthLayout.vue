<template>
  <div class="auth-layout">
    <el-card class="auth-card" shadow="always">
      <router-view />
    </el-card>
  </div>
</template>

<style scoped>
.auth-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
}
.auth-card {
  width: 400px;
}
</style>
