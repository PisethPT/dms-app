<script setup>
import { useI18n } from 'vue-i18n'

import {
  DataBoard,
  Monitor,
  Odometer,
  Operation,
  Setting,
  Lock,
  Files,
  User,
  Connection,
} from '@element-plus/icons-vue'

const { t } = useI18n()

const menuItems = [
  { title: 'navigation.dashboard', path: '/', icon: DataBoard },
  { title: 'navigation.devices', path: '/devices', icon: Monitor },
  { title: 'navigation.monitoring', path: '/monitoring', icon: Odometer },
  { title: 'navigation.commands', path: '/commands', icon: Operation },
  { title: 'navigation.configurations', path: '/configurations', icon: Setting },
  { title: 'navigation.policies', path: '/policies', icon: Lock },
  { title: 'navigation.applications', path: '/applications', icon: Files },
  { title: 'navigation.users', path: '/users', icon: User },
  { title: 'navigation.settings', path: '/settings', icon: Connection },
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">D</div>

      <div class="brand-text">
        <h2>{{ t('app.name') }}</h2>
        <span>{{ t('app.fullName') }}</span>
      </div>
    </div>

    <div class="sidebar-section-label">
      {{ t('navigation.management') }}
    </div>

    <el-menu router :default-active="$route.path" class="sidebar-menu">
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>

        <span>{{ t(item.title) }}</span>
      </el-menu-item>
    </el-menu>

    <div class="sidebar-footer">
      <span class="system-status"></span>
      <span>System Operational</span>
    </div>
  </aside>
</template>
