<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import IconTranslate from '@/components/icons/IconTranslate.vue'
import {
  Platform,
  Odometer,
  Monitor,
  DataAnalysis,
  Comment,
  Operation,
  DocumentChecked,
  Grid,
  User,
  Setting,
  Moon,
  Sunny,
  ArrowDown,
  UserFilled,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const changeLang = (lang) => {
  locale.value = lang
  localStorage.setItem('dms_lang', lang)
}

const handleCommand = (command) => {
  if (command === 'logout') {
    authStore.logout()
    router.push('/auth/login')
  }
}

const languese = [
  {
    value: 'cn',
    label: '中文',
  },
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'km',
    label: 'ភាសាខ្មែរ',
  },
]
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="220px">
      <div class="logo">
        <el-icon class="logo-icon"><Monitor /></el-icon>
        <span>DMS Platform</span>
      </div>

      <el-menu :default-active="route.path" router class="el-menu-vertical">
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>{{ t('nav.dashboard') }}</template>
        </el-menu-item>

        <el-menu-item index="/devices">
          <el-icon><Monitor /></el-icon>
          <template #title>{{ t('nav.devices') }}</template>
        </el-menu-item>

        <el-menu-item index="/monitoring">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>{{ t('nav.monitoring') }}</template>
        </el-menu-item>

        <el-menu-item index="/commands">
          <el-icon><Comment /></el-icon>
          <template #title>{{ t('nav.commands') }}</template>
        </el-menu-item>

        <el-menu-item index="/configurations">
          <el-icon><Operation /></el-icon>
          <template #title>{{ t('nav.configurations') }}</template>
        </el-menu-item>

        <el-menu-item index="/policies">
          <el-icon><DocumentChecked /></el-icon>
          <template #title>{{ t('nav.policies') }}</template>
        </el-menu-item>

        <el-menu-item index="/applications">
          <el-icon><Grid /></el-icon>
          <template #title>{{ t('nav.applications') }}</template>
        </el-menu-item>

        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <template #title>{{ t('nav.users') }}</template>
        </el-menu-item>

        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>{{ t('nav.settings') }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="header-left">
          <span class="page-title">{{ route.meta.title }}</span>
        </div>
        <div class="header-right">
          <el-dropdown @command="changeLang">
            <IconTranslate style="cursor: pointer; outline: none; margin-right: 12px" />
            <template #dropdown>
              <el-dropdown-menu style="min-width: 100px">
                <el-dropdown-item
                  v-for="item in languese"
                  :key="item.value"
                  :command="item.value"
                  :disabled="locale === item.value"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button circle @click="themeStore.toggleTheme" style="margin-right: 16px">
            <el-icon><Moon v-if="themeStore.isDark" /><Sunny v-else /></el-icon>
          </el-button>

          <el-dropdown @command="handleCommand">
            <span class="user-dropdown" style="cursor: pointer; outline: none">
              <el-avatar :size="32" :icon="UserFilled" />
              <span class="username">{{ authStore.user?.username || 'Admin' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">{{ t('auth.logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-scrollbar>
        <el-main>
          <router-view />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-bottom: 1px solid var(--el-border-color-light);
  font-weight: 600;
  font-size: 16px;
}

.logo-icon {
  font-size: 20px;
  color: var(--el-color-primary);
}

.el-menu-vertical {
  border-right: none;
}

.el-header {
  height: 60px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.page-title {
  font-weight: 600;
  font-size: 16px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.el-main {
  background-color: var(--el-bg-color-page);
  padding: 20px;
  overflow-y: auto;
}
</style>
