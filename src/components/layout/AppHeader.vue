<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../../stores/theme'

import { Moon, Sunny, Bell, Search, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const themeStore = useThemeStore()
const { t, locale } = useI18n()

const pageTitle = computed(() => {
  if (route.name === 'dashboard') {
    return t('dashboard.title')
  }

  return route.meta.title || 'DMS'
})

function changeLanguage(value) {
  locale.value = value
  localStorage.setItem('dms-locale', value)
}
</script>

<template>
  <header class="app-header">
    <div class="header-title">
      <h2>{{ pageTitle }}</h2>
      <span>Device Management System</span>
    </div>

    <div class="header-actions">
      <el-button circle text title="Search">
        <el-icon><Search /></el-icon>
      </el-button>

      <el-button circle text title="Notifications">
        <el-badge is-dot>
          <el-icon><Bell /></el-icon>
        </el-badge>
      </el-button>

      <el-divider direction="vertical" />

      <el-select
        :model-value="locale"
        class="language-select"
        size="default"
        @change="changeLanguage"
      >
        <el-option label="English" value="en" />
        <el-option label="ខ្មែរ" value="km" />
      </el-select>

      <el-button
        circle
        @click="themeStore.toggleTheme"
        :title="themeStore.isDark ? t('common.lightMode') : t('common.darkMode')"
      >
        <el-icon>
          <Sunny v-if="themeStore.isDark" />
          <Moon v-else />
        </el-icon>
      </el-button>

      <el-dropdown>
        <div class="user-profile">
          <el-avatar :size="34">AD</el-avatar>

          <div class="user-info">
            <strong>Administrator</strong>
            <span>System Admin</span>
          </div>

          <el-icon><ArrowDown /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              {{ t('header.profile') }}
            </el-dropdown-item>

            <el-dropdown-item divided>
              {{ t('header.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
