<template>
  <div class="not-found-container">
    <el-result icon="warning" title="404" sub-title="Page Not Found">
      <template #extra>
        <el-button type="primary" @click="router.push('/dashboard')"> Back to Dashboard </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
