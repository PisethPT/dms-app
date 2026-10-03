<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
}

const handleLogin = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        authStore.setAuth('mock-jwt-token-12345', { username: loginForm.username, role: 'ADMIN' })
        ElMessage.success('Logged in successfully')
        loading.value = false
        const redirect = route.query.redirect || '/dashboard'
        router.push(redirect)
      }, 800)
    }
  })
}
</script>

<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 24px">{{ t('auth.login') }}</h2>
    <el-form :model="loginForm" :rules="rules" ref="formRef" label-position="top">
      <el-form-item :label="t('auth.username')" prop="username">
        <el-input v-model="loginForm.username" placeholder="admin" />
      </el-form-item>
      <el-form-item :label="t('auth.password')" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          show-password
          placeholder="••••••••"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%" @click="handleLogin">
          {{ t('auth.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
