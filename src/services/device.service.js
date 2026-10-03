import api from './api'

export const deviceService = {
  getDevices(params) {
    return api.get('/devices', { params })
  },
  getDeviceById(id) {
    return api.get(`/devices/${id}`)
  },
  sendCommand(deviceId, commandData) {
    return api.post(`/devices/${deviceId}/commands`, commandData)
  },
}
