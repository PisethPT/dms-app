<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  data: { type: Array, required: true }, // Array of numbers (0 - 100)
  currentValue: { type: Number, required: true },
})

const linePoints = computed(() => {
  const step = 500 / (props.data.length - 1 || 1)
  return props.data.map((val, idx) => `${idx * step},${150 - (val / 100) * 130}`).join(' ')
})

const areaPoints = computed(() => {
  const step = 500 / (props.data.length - 1 || 1)
  const pts = props.data.map((val, idx) => `${idx * step},${150 - (val / 100) * 130}`).join(' ')
  return `0,150 ${pts} 500,150`
})

const lastPoint = computed(() => {
  const step = 500 / (props.data.length - 1 || 1)
  const lastIndex = props.data.length - 1
  const lastVal = props.data[lastIndex] || 0
  return {
    x: lastIndex * step,
    y: 150 - (lastVal / 100) * 130,
  }
})
</script>

<template>
  <div class="telemetry-chart">
    <div class="chart-header">
      <div style="display: flex; justify-content: end; width: 100%">
        <el-tag size="small" type="success" effect="plain">Live (5s interval)</el-tag>
      </div>
      <span class="chart-title">{{ title }}</span>
    </div>

    <div class="svg-container">
      <svg viewBox="0 0 500 150" class="chart-svg">
        <!-- Grid Lines -->
        <line
          x1="0"
          y1="30"
          x2="500"
          y2="30"
          stroke="var(--el-border-color-lighter)"
          stroke-dasharray="4"
        />
        <line
          x1="0"
          y1="75"
          x2="500"
          y2="75"
          stroke="var(--el-border-color-lighter)"
          stroke-dasharray="4"
        />
        <line
          x1="0"
          y1="120"
          x2="500"
          y2="120"
          stroke="var(--el-border-color-lighter)"
          stroke-dasharray="4"
        />

        <!-- Area Fill -->
        <polygon :points="areaPoints" fill="var(--el-color-primary-light-9)" />

        <!-- Line Plot -->
        <polyline
          :points="linePoints"
          fill="none"
          stroke="var(--el-color-primary)"
          stroke-width="2.5"
        />

        <!-- Current Value Dot -->
        <circle :cx="lastPoint.x" :cy="lastPoint.y" r="5" fill="var(--el-color-primary)" />
      </svg>
    </div>

    <div class="chart-footer">
      <span>00:00</span>
      <span>Current: {{ currentValue }}%</span>
      <span>00:30</span>
    </div>
  </div>
</template>

<style scoped>
.telemetry-chart {
  width: 100%;
}
.chart-header {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  /* align-items: center; */
  margin-bottom: 12px;
}
.chart-title {
  font-weight: 600;
  font-size: 14px;
}
.svg-container {
  width: 100%;
  height: 150px;
  background-color: var(--el-bg-color-page);
  border-radius: 6px;
  padding: 8px 0;
}
.chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.chart-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 8px;
}
</style>
