<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Monitor,
  SuccessFilled,
  WarningFilled,
  RefreshRight,
  Search,
  Plus,
  Platform,
  Cellphone,
  Cpu,
  ArrowDown,
} from '@element-plus/icons-vue'

const router = useRouter()

// State
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const osFilter = ref('')
const selectedRows = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const registerDialogVisible = ref(false)

const registerForm = ref({
  name: '',
  os: 'Android',
  serial: '',
  policy: 'Kiosk-Strict-v2',
})

// Mock Device Data
const devices = ref([
  {
    id: '1',
    uuid: 'DEV-8823-PHNOM-PENH',
    name: 'Terminal-PP-Factory-01',
    status: 'ONLINE',
    os: 'Android',
    osVersion: 'v14',
    ipAddress: '192.168.10.104',
    cpuUsage: 28,
    ramUsage: 45,
    location: 'Phnom Penh Factory #2',
    lastSeen: '10s ago',
  },
  {
    id: '2',
    uuid: 'DEV-9011-BAVET',
    name: 'Gate-Scanner-Bavet-03',
    status: 'OFFLINE',
    os: 'Linux',
    osVersion: 'Ubuntu 24.04',
    ipAddress: '10.20.4.12',
    cpuUsage: 0,
    ramUsage: 0,
    location: 'Bavet Border Warehouse',
    lastSeen: '2 hours ago',
  },
  {
    id: '3',
    uuid: 'DEV-3301-SIHANOUKVILLE',
    name: 'Kiosk-Port-Terminal-A',
    status: 'ONLINE',
    os: 'Windows',
    osVersion: '11 IoT',
    ipAddress: '172.16.8.50',
    cpuUsage: 64,
    ramUsage: 78,
    location: 'Sihanoukville Logistics Hub',
    lastSeen: 'Just now',
  },
])

// Computed Counters
const totalDevices = computed(() => devices.value.length)
const onlineDevices = computed(() => devices.value.filter((d) => d.status === 'ONLINE').length)
const offlineDevices = computed(() => devices.value.filter((d) => d.status === 'OFFLINE').length)
const pendingSync = ref(1)

// Filter Logic
const filteredDevices = computed(() => {
  return devices.value.filter((d) => {
    const matchesSearch =
      !searchQuery.value ||
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.uuid.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      d.ipAddress.includes(searchQuery.value)

    const matchesStatus = !statusFilter.value || d.status === statusFilter.value
    const matchesOs = !osFilter.value || d.os === osFilter.value

    return matchesSearch && matchesStatus && matchesOs
  })
})

// Navigation
const openDeviceDetail = (id) => {
  router.push(`/devices/${id}`)
}

// Table Select Actions
const handleSelectionChange = (val) => {
  selectedRows.value = val
}

const handleBulkAction = (action) => {
  ElMessage.success(`Triggered ${action} on ${selectedRows.value.length} devices.`)
}

const handleSingleCommand = (command, row) => {
  if (command === 'delete') {
    ElMessageBox.confirm(`Are you sure you want to unregister ${row.name}?`, 'Warning', {
      type: 'warning',
    }).then(() => {
      devices.value = devices.value.filter((d) => d.id !== row.id)
      ElMessage.success('Device unregistered successfully')
    })
  } else {
    ElMessage.info(`Command '${command}' dispatched to ${row.name}`)
  }
}

const submitRegistration = () => {
  if (!registerForm.value.name || !registerForm.value.serial) {
    ElMessage.error('Please fill required fields')
    return
  }

  devices.value.unshift({
    id: String(Date.now()),
    uuid: `DEV-${Math.floor(1000 + Math.random() * 9000)}-NEW`,
    name: registerForm.value.name,
    status: 'OFFLINE',
    os: registerForm.value.os,
    osVersion: 'v1.0',
    ipAddress: 'Pending...',
    cpuUsage: 0,
    ramUsage: 0,
    location: 'Unassigned',
    lastSeen: 'Never',
  })

  ElMessage.success('Device registered successfully!')
  registerDialogVisible.value = false
}
</script>

<template>
  <div class="device-list-container">
    <!-- Top KPI Cards -->
    <el-row :gutter="16" class="kpi-row">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="kpi-card">
            <div>
              <span class="kpi-label">Total Registered</span>
              <h2 class="kpi-value">{{ totalDevices }}</h2>
            </div>
            <el-icon class="kpi-icon"><Monitor /></el-icon>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never">
          <div class="kpi-card">
            <div>
              <span class="kpi-label">Online Devices</span>
              <h2 class="kpi-value text-success">{{ onlineDevices }}</h2>
            </div>
            <el-icon class="kpi-icon text-success"><SuccessFilled /></el-icon>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never">
          <div class="kpi-card">
            <div>
              <span class="kpi-label">Offline Devices</span>
              <h2 class="kpi-value text-danger">{{ offlineDevices }}</h2>
            </div>
            <el-icon class="kpi-icon text-danger"><WarningFilled /></el-icon>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never">
          <div class="kpi-card">
            <div>
              <span class="kpi-label">Pending Sync</span>
              <h2 class="kpi-value text-warning">{{ pendingSync }}</h2>
            </div>
            <el-icon class="kpi-icon text-warning"><RefreshRight /></el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Filter & Search Toolbar -->
    <el-card shadow="never" class="table-card">
      <el-scrollbar>
        <div class="toolbar">
          <div style="display: flex; align-content: end; margin-bottom: 8px; width: 100%">
            <el-button
              :size="'small'"
              type="primary"
              :icon="Plus"
              @click="registerDialogVisible = true"
            >
              Register Device
            </el-button>
          </div>

          <div class="left-tools">
            <el-input
              :size="'small'"
              v-model="searchQuery"
              placeholder="Search by Name, IP, UUID, or Serial..."
              clearable
              style="width: 280px"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>

            <el-select
              :size="'small'"
              v-model="statusFilter"
              placeholder="Status"
              clearable
              style="width: 130px"
            >
              <el-option label="Online" value="ONLINE" />
              <el-option label="Offline" value="OFFLINE" />
            </el-select>

            <el-select
              :size="'small'"
              v-model="osFilter"
              placeholder="Operating System"
              clearable
              style="width: 160px"
            >
              <el-option label="Android" value="Android" />
              <el-option label="Windows" value="Windows" />
              <el-option label="Linux" value="Linux" />
            </el-select>

            <el-button
              :size="'small'"
              type="warning"
              plain
              :disabled="!selectedRows.length"
              @click="handleBulkAction('Reboot')"
            >
              Reboot Selected ({{ selectedRows.length }})
            </el-button>
          </div>
        </div>

        <!-- Main Devices Table -->
        <el-table
          :data="filteredDevices"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-loading="loading"
        >
          <el-table-column type="selection" width="45" />

          <el-table-column label="Device Name" min-width="200">
            <template #default="{ row }">
              <div class="device-cell">
                <el-icon class="os-avatar">
                  <Monitor v-if="row.os === 'Windows'" />
                  <Cellphone v-else-if="row.os === 'Android'" />
                  <Cpu v-else />
                </el-icon>
                <div>
                  <a class="device-link" @click="openDeviceDetail(row.id)">{{ row.name }}</a>
                  <div class="sub-info">{{ row.uuid }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="Status" width="110">
            <template #default="{ row }">
              <el-tag :type="row.status === 'ONLINE' ? 'success' : 'danger'" size="small">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="os" label="OS / Platform" width="130">
            <template #default="{ row }">
              <span>{{ row.os }} {{ row.osVersion }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="ipAddress" label="IP Address" width="140" />

          <el-table-column label="Resource Metrics" width="200">
            <template #default="{ row }">
              <div v-if="row.status === 'ONLINE'" class="metric-bars">
                <div class="metric-item">
                  <span class="label">CPU</span>
                  <el-progress :percentage="row.cpuUsage" :show-text="false" :stroke-width="6" />
                  <span class="value">{{ row.cpuUsage }}%</span>
                </div>
                <div class="metric-item">
                  <span class="label">RAM</span>
                  <el-progress
                    :percentage="row.ramUsage"
                    :show-text="false"
                    :stroke-width="6"
                    status="warning"
                  />
                  <span class="value">{{ row.ramUsage }}%</span>
                </div>
              </div>
              <span v-else class="text-muted">N/A</span>
            </template>
          </el-table-column>

          <el-table-column prop="location" label="Location" min-width="160" show-overflow-tooltip />

          <el-table-column prop="lastSeen" label="Last Ping" width="150" />

          <el-table-column label="Actions" width="130" fixed="right">
            <template #default="{ row }">
              <div style="display: flex">
                <el-button link type="primary" size="small" @click="openDeviceDetail(row.id)">
                  Details
                </el-button>
                <el-dropdown trigger="click" @command="(cmd) => handleSingleCommand(cmd, row)">
                  <el-button link type="primary" size="small">
                    More <el-icon><ArrowDown /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="sync">Sync Config</el-dropdown-item>
                      <el-dropdown-item command="reboot">Reboot</el-dropdown-item>
                      <el-dropdown-item command="lock" divided>Lock Device</el-dropdown-item>
                      <el-dropdown-item command="delete" style="color: var(--el-color-danger)"
                        >Unregister</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- Pagination Footer -->
        <div class="pagination-footer">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredDevices.length"
          />
        </div>
      </el-scrollbar>
    </el-card>

    <!-- Register Device Dialog -->
    <el-dialog v-model="registerDialogVisible" title="Register New Device Agent" width="500px">
      <el-form :model="registerForm" label-width="120px" label-position="top">
        <el-form-item label="Device Name" required>
          <el-input v-model="registerForm.name" placeholder="e.g. Line-01-Terminal" />
        </el-form-item>
        <el-form-item label="Target Operating System" required>
          <el-select v-model="registerForm.os" style="width: 100%">
            <el-option label="Android" value="Android" />
            <el-option label="Windows" value="Windows" />
            <el-option label="Linux" value="Linux" />
          </el-select>
        </el-form-item>
        <el-form-item label="Serial Number / Unique HW-ID" required>
          <el-input v-model="registerForm.serial" placeholder="e.g. SN-9081237129-X" />
        </el-form-item>
        <el-form-item label="Assign Group Policy">
          <el-select v-model="registerForm.policy" style="width: 100%">
            <el-option label="Kiosk-Strict-v2" value="Kiosk-Strict-v2" />
            <el-option label="Standard-Industrial-v1" value="Standard-Industrial-v1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="registerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitRegistration">Register & Generate Key</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.device-list-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kpi-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kpi-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.kpi-value {
  margin: 4px 0 0 0;
  font-size: 22px;
}

.kpi-icon {
  font-size: 28px;
  color: var(--el-color-info);
}

.text-success {
  color: var(--el-color-success);
}
.text-danger {
  color: var(--el-color-danger);
}
.text-warning {
  color: var(--el-color-warning);
}
.text-muted {
  color: var(--el-text-color-placeholder);
  font-size: 12px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  gap: 10px;
}

.left-tools,
.right-tools {
  display: flex;
  gap: 10px;
  align-items: center;
}

.device-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.os-avatar {
  font-size: 20px;
  color: var(--el-color-primary);
}

.device-link {
  font-weight: 600;
  color: var(--el-color-primary);
  cursor: pointer;
  text-decoration: none;
}

.device-link:hover {
  text-decoration: underline;
}

.sub-info {
  font-size: 11px;
  color: var(--el-text-color-secondary);
}

.metric-bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.metric-item .label {
  width: 28px;
  color: var(--el-text-color-secondary);
}

.metric-item .value {
  width: 30px;
  text-align: right;
  color: var(--el-text-color-regular);
}

.pagination-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
