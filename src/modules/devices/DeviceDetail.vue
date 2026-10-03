<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Back,
  Monitor,
  Cellphone,
  Cpu,
  Refresh,
  SwitchButton,
  Lock,
  InfoFilled,
  Connection,
  LocationInformation,
  LocationFilled,
  DocumentChecked,
  Grid,
} from '@element-plus/icons-vue'
import TelemetryChart from '@/components/charts/TelemetryChart.vue'

const router = useRouter()

// Mock Device Data
const device = ref({
  uuid: 'DEV-8823-PHNOM-PENH',
  name: 'Terminal-PP-Factory-01',
  serialNumber: 'SN-9081237129-X',
  status: 'ONLINE',
  os: 'Android',
  osVersion: 'Android 14 (API 34)',
  model: 'Advantech UTC-315 Industrial Kiosk',
  agentVersion: 'v1.4.2-build89',
  cpuModel: 'ARM Cortex-A78 Octa-Core @ 2.4GHz',
  totalRam: 8,
  freeStorage: 42.5,
  totalStorage: 128,
  battery: 25,
  uptime: '14 days, 6 hours',
  cpuUsage: 28,
  ramUsage: 45,
  ipAddress: '192.168.10.104',
  macAddress: '00:1A:2B:3C:4D:5E',
  publicIp: '203.144.68.12',
  mqttBroker: 'mqtt-cluster-asia-east.dms.com:1883',
  networkType: 'Ethernet / LAN',
  signalStrength: -45,
  lastSeen: 'Just now',
  locationName: 'Phnom Penh Factory Floor #2 (Cambodia)',
  lat: '11.5564 N',
  lng: '104.9282 E',
  geoX: 72, // SVG Map placement %
  geoY: 58, // SVG Map placement %
})

// Historical trend arrays for telemetry chart
const cpuHistory = ref([20, 25, 30, 28, 35, 40, 28, 32, 28])
const ramHistory = ref([42, 44, 45, 45, 46, 45, 44, 45, 45])

const installedApps = ref([
  { name: 'DMS Agent Core', version: '1.4.2', status: 'Active' },
  { name: 'MES Terminal UI', version: '2.1.0', status: 'Active' },
  { name: 'OPC-UA Telemetry Daemon', version: '0.9.1', status: 'Active' },
])

let timer = null

onMounted(() => {
  // Simulate live telemetry updates
  timer = setInterval(() => {
    const newCpu = Math.floor(20 + Math.random() * 25)
    const newRam = Math.floor(40 + Math.random() * 10)

    device.value.cpuUsage = newCpu
    device.value.ramUsage = newRam

    cpuHistory.value.shift()
    cpuHistory.value.push(newCpu)

    ramHistory.value.shift()
    ramHistory.value.push(newRam)
  }, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const triggerAction = (actionName) => {
  ElMessage.success(`Command dispatched: ${actionName} requested for ${device.value.name}`)
}
</script>

<template>
  <div class="device-detail-container">
    <!-- Header Bar -->
    <el-card shadow="never" class="header-card">
      <div class="device-header">
        <div class="device-title">
          <el-button :icon="Back" circle @click="router.back()" />
          <el-icon class="os-icon">
            <Monitor v-if="device.os === 'Windows'" />
            <Cellphone v-else-if="device.os === 'Android'" />
            <Cpu v-else
          /></el-icon>
          <div>
            <div class="name-row">
              <h2>{{ device.name }}</h2>
              <el-tag :type="device.status === 'ONLINE' ? 'success' : 'danger'" effect="dark">
                {{ device.status }}
              </el-tag>
            </div>
            <span class="sub-text"
              >UUID: {{ device.uuid }} | IMEI/Serial: {{ device.serialNumber }}</span
            >
          </div>
        </div>

        <!-- Action Controls -->
        <div class="action-buttons" style="display: flex; justify-content: flex-end; width: 100%">
          <el-button type="primary" :size="'small'" :icon="Refresh" @click="triggerAction('Sync')"
            >Sync Policy</el-button
          >
          <el-button
            type="warning"
            :size="'small'"
            :icon="SwitchButton"
            @click="triggerAction('Reboot')"
            >Reboot</el-button
          >
          <el-button type="danger" :size="'small'" :icon="Lock" @click="triggerAction('Lock')"
            >Remote Lock</el-button
          >
        </div>
      </div>
    </el-card>

    <!-- Main Content Layout -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- Left Side: Specs & Live Telemetry -->
      <el-col :span="16">
        <!-- Telemetry Metrics Cards -->
        <el-row :gutter="16">
          <el-col :span="12">
            <el-card shadow="never">
              <TelemetryChart
                title="CPU Usage History"
                :data="cpuHistory"
                :current-value="device.cpuUsage"
              />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="never">
              <TelemetryChart
                title="Memory Allocation History"
                :data="ramHistory"
                :current-value="device.ramUsage"
              />
            </el-card>
          </el-col>
        </el-row>

        <!-- Detailed Hardware & System Specs -->
        <el-card shadow="never" style="margin-top: 20px">
          <template #header>
            <span class="card-title"
              ><el-icon><InfoFilled /></el-icon> System Hardware & Hardware Specs</span
            >
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="Device Model">{{ device.model }}</el-descriptions-item>
            <el-descriptions-item label="Operating System"
              >{{ device.os }} ({{ device.osVersion }})</el-descriptions-item
            >
            <el-descriptions-item label="DMS Agent Version">{{
              device.agentVersion
            }}</el-descriptions-item>
            <el-descriptions-item label="Processor (CPU)">{{
              device.cpuModel
            }}</el-descriptions-item>
            <el-descriptions-item label="Total Memory (RAM)"
              >{{ device.totalRam }} GB</el-descriptions-item
            >
            <el-descriptions-item label="Storage (Free / Total)"
              >{{ device.freeStorage }} GB / {{ device.totalStorage }} GB</el-descriptions-item
            >
            <el-descriptions-item label="Battery Level">
              <el-progress
                :percentage="device.battery"
                :status="device.battery < 20 ? 'exception' : 'success'"
              />
            </el-descriptions-item>
            <el-descriptions-item label="Up Time">{{ device.uptime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!-- Network Topology & Connection Details -->
        <el-card shadow="never" style="margin-top: 20px">
          <template #header>
            <span class="card-title"
              ><el-icon><Connection /></el-icon> Network Connectivity</span
            >
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="IP Address (LAN)">{{
              device.ipAddress
            }}</el-descriptions-item>
            <el-descriptions-item label="MAC Address">{{ device.macAddress }}</el-descriptions-item>
            <el-descriptions-item label="Public / WAN IP">{{
              device.publicIp
            }}</el-descriptions-item>
            <el-descriptions-item label="MQTT Broker Node">{{
              device.mqttBroker
            }}</el-descriptions-item>
            <el-descriptions-item label="Network Type"
              >{{ device.networkType }} (Signal:
              {{ device.signalStrength }} dBm)</el-descriptions-item
            >
            <el-descriptions-item label="Last Heartbeat">{{
              device.lastSeen
            }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <!-- Right Side: Worldwide Map Location & Installed Apps -->
      <el-col :span="8">
        <!-- Worldwide Location Card -->
        <el-card shadow="never">
          <template #header>
            <span class="card-title"
              ><el-icon><LocationInformation /></el-icon> Worldwide Location</span
            >
          </template>
          <div class="geo-info">
            <el-tag type="info" style="margin-bottom: 10px">{{ device.locationName }}</el-tag>
            <div class="world-map-preview">
              <div class="map-grid">
                <div class="map-pin" :style="{ top: device.geoY + '%', left: device.geoX + '%' }">
                  <el-icon class="pin-icon"><LocationFilled /></el-icon>
                  <span class="pin-pulse"></span>
                </div>
              </div>
            </div>
            <div class="geo-coords">
              <span
                >Latitude: <strong>{{ device.lat }}</strong></span
              >
              <span
                >Longitude: <strong>{{ device.lng }}</strong></span
              >
            </div>
          </div>
        </el-card>

        <!-- Assigned Policies & Compliance -->
        <el-card shadow="never" style="margin-top: 20px">
          <template #header>
            <span class="card-title"
              ><el-icon><DocumentChecked /></el-icon> Assigned Security Group</span
            >
          </template>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div class="policy-item">
              <span>Policy Profile:</span>
              <el-tag type="success">Kiosk-Strict-v2</el-tag>
            </div>
            <div class="policy-item">
              <span>Compliance Status:</span>
              <el-tag type="success" effect="plain">Compliant</el-tag>
            </div>
            <div class="policy-item">
              <span>USB Storage Access:</span>
              <el-tag type="danger" size="small">Disabled</el-tag>
            </div>
          </div>
        </el-card>

        <!-- Package & Applications Status -->
        <el-card shadow="never" style="margin-top: 20px">
          <template #header>
            <span class="card-title"
              ><el-icon><Grid /></el-icon> Managed Packages</span
            >
          </template>
          <el-table :data="installedApps" size="small" style="width: 100%">
            <el-table-column prop="name" label="Application" />
            <el-table-column prop="version" label="Version" width="80" />
            <el-table-column prop="status" label="Status" width="90">
              <template #default="{ row }">
                <el-tag size="small" :type="row.status === 'Active' ? 'success' : 'info'">{{
                  row.status
                }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.device-detail-container {
  padding-bottom: 30px;
}
.header-card {
  background-color: var(--el-bg-color);
}
.device-header {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.device-title {
  display: flex;
  align-items: center;
  gap: 16px;
}
.os-icon {
  font-size: 32px;
  color: var(--el-color-primary);
}
.name-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.name-row h2 {
  margin: 0;
  font-size: 20px;
}
.sub-text {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
.card-title {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.geo-info {
  display: flex;
  flex-direction: column;
}
.world-map-preview {
  width: 100%;
  height: 180px;
  background-color: var(--el-color-info-light-9);
  border: 1px solid var(--el-border-color-light);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(var(--el-border-color) 1px, transparent 0);
  background-size: 12px 12px;
}
.map-grid {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
}
.pin-icon {
  font-size: 22px;
  color: var(--el-color-danger);
  position: relative;
  z-index: 2;
}
.pin-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  background-color: var(--el-color-danger-light-5);
  border-radius: 50%;
  animation: pulse 1.8s infinite ease-out;
  z-index: 1;
}
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}
.geo-coords {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 10px;
}
.policy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
</style>
