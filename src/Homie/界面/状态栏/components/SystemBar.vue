<template>
  <div class="system-bar">
    <div class="sys-item">
      <span class="sys-icon">📅</span>
      <span class="sys-text">{{ store.data.系统.日期 }}</span>
    </div>
    <div class="sys-divider"></div>
    <div class="sys-item">
      <span class="sys-icon">{{ timeIcon }}</span>
      <span class="sys-text">{{ store.data.系统.时间段 }}</span>
    </div>
    <div class="sys-divider"></div>
    <div class="sys-item location">
      <span class="sys-icon">📍</span>
      <span class="sys-text">{{ store.data.系统.当前场景 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const timeIcon = computed(() => {
  const icons: Record<string, string> = {
    '早晨': '🌅',
    '上午': '☀️',
    '下午': '☀️',
    '傍晚': '🌆',
    '夜晚': '🌙',
    '深夜': '🌃',
  };
  return icons[store.data.系统.时间段] ?? '🕐';
});
</script>

<style lang="scss" scoped>
.system-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--c-surface-light);
  border-bottom: 1px solid var(--c-border);
}

.sys-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--c-text);
}

.sys-icon {
  font-size: 0.85rem;
}

.sys-text {
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.sys-divider {
  width: 1px;
  height: 14px;
  background: var(--c-border);
}

.location .sys-text {
  color: var(--c-accent);
}
</style>
