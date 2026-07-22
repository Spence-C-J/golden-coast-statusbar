<template>
  <div class="system-bar">
    <div class="bar-main">
      <div class="sys-item">
        <span class="sys-icon">📅</span>
        <span class="sys-text">{{ store.data.系统.日期 }} {{ store.data.系统.时间段 }}</span>
      </div>
      <div class="sys-divider"></div>
      <div class="sys-item location">
        <span class="sys-icon">📍</span>
        <span class="sys-text">{{ store.data.系统.当前场景 }}</span>
      </div>
      <span class="fold-arrow" :class="{ open: !collapsed }">▾</span>
    </div>
    <div class="bar-today" v-if="store.data.系统.今日安排 && !collapsed" :title="store.data.系统.今日安排">
      <span class="sys-icon">📝</span>
      <span class="today-text">{{ store.data.系统.今日安排 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

defineProps<{ collapsed: boolean }>();

const store = useDataStore();
</script>

<style lang="scss" scoped>
.system-bar {
  background: var(--c-surface-light);
  border-bottom: 1px solid var(--c-border);
}

.bar-main {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
}

.sys-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--c-text);
  min-width: 0;
}

.sys-icon {
  font-size: 0.85rem;
}

.sys-text {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  white-space: nowrap;
}

.sys-divider {
  width: 1px;
  height: 14px;
  background: var(--c-border);
}

.location .sys-text {
  color: var(--c-accent);
}

.fold-arrow {
  margin-left: auto;
  font-size: 0.7rem;
  color: var(--c-text-muted);
  transition: transform 0.25s ease;
}

.fold-arrow.open {
  transform: rotate(180deg);
}

.bar-today {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 12px 7px;
}

.today-text {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
