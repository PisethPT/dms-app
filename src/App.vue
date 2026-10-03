<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import enLocale from 'element-plus/es/locale/lang/en'
import kmLocale from 'element-plus/es/locale/lang/km'

const { locale } = useI18n()
const themeStore = useThemeStore()

const elementLocale = computed(() => (locale.value === 'km' ? kmLocale : enLocale))

onMounted(() => {
  themeStore.applyTheme()
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>
