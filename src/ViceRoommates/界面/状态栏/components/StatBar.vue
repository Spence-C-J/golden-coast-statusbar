<template>
  <div class="stat-bar">
    <div class="stat-header">
      <span class="stat-label">{{ label }}</span>
      <span class="stat-value">{{ value }}<span class="stat-max">/100</span></span>
    </div>
    <div class="stat-track">
      <div class="stat-fill" :style="{ width: value + '%', '--bar-color': color }"></div>
      <div class="stat-segments">
        <div v-for="n in 4" :key="n" class="segment-divider" :style="{ left: n * 20 + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: number;
  color: string;
}>();
</script>

<style lang="scss" scoped>
.stat-bar {
  margin-bottom: 10px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  letter-spacing: 0.5px;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--c-text);
}

.stat-max {
  font-size: 0.7rem;
  color: var(--c-text-muted);
  font-weight: normal;
}

.stat-track {
  position: relative;
  height: 8px;
  background: var(--c-background);
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.stat-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--bar-color, var(--c-primary));
  transition: width 0.3s ease;
  box-shadow: 0 0 8px var(--bar-color, var(--c-primary));
}

.stat-segments {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.segment-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
