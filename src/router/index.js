import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/modules/users/LoginView.vue'),
        meta: { title: 'Login', guestOnly: true },
      },
    ],
  },
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'devices',
        name: 'Devices',
        component: () => import('@/modules/devices/DeviceList.vue'),
        meta: { title: 'Devices' },
      },
      {
        path: 'devices/:id',
        name: 'DeviceDetail',
        component: () => import('@/modules/devices/DeviceDetail.vue'),
        meta: { title: 'Device Details' },
      },
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('@/modules/monitoring/MonitoringView.vue'),
        meta: { title: 'Monitoring' },
      },
      {
        path: 'commands',
        name: 'Commands',
        component: () => import('@/modules/commands/CommandList.vue'),
        meta: { title: 'Commands' },
      },
      {
        path: 'configurations',
        name: 'Configurations',
        component: () => import('@/modules/configurations/ConfigurationList.vue'),
        meta: { title: 'Configurations' },
      },
      {
        path: 'policies',
        name: 'Policies',
        component: () => import('@/modules/policies/PolicyList.vue'),
        meta: { title: 'Policies' },
      },
      {
        path: 'applications',
        name: 'Applications',
        component: () => import('@/modules/applications/ApplicationList.vue'),
        meta: { title: 'Applications' },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/modules/users/UserList.vue'),
        meta: { title: 'Users' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/modules/settings/SettingsView.vue'),
        meta: { title: 'Settings' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/common/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = Boolean(authStore.token)

  // Set document title
  if (to.meta.title) {
    document.title = `${to.meta.title} - DMS Admin`
  }

  // Redirect to login if trying to access a protected route without auth token
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Redirect authenticated user away from auth pages
  if (to.matched.some((record) => record.meta.guestOnly) && isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
