import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('dms_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('dms_user') || 'null'))

  const setAuth = (newToken, userData) => {
    token.value = newToken
    user.value = userData
    localStorage.setItem('dms_token', newToken)
    localStorage.setItem('dms_user', JSON.stringify(userData))
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('dms_token')
    localStorage.removeItem('dms_user')
  }

  return { token, user, setAuth, logout }
})
