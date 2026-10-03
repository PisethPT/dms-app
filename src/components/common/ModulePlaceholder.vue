<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <el-card shadow="never">
    <el-empty :description="`${route.meta.title} module is coming soon`" />
  </el-card>
</template>
