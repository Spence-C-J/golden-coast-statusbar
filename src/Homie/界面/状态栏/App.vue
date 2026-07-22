<template>
  <div class="status-card" :class="{ collapsed }">
    <div @click="toggle" class="card-head">
      <SystemBar :collapsed="collapsed" />
    </div>
    <div class="card-body" v-show="!collapsed">
      <div class="panels">
        <JakePanel />
        <UserPanel />
      </div>
      <ScheduleStrip />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SystemBar from './components/SystemBar.vue';
import JakePanel from './components/JakePanel.vue';
import UserPanel from './components/UserPanel.vue';
import ScheduleStrip from './components/ScheduleStrip.vue';

const KEY = 'homie_statusbar_collapsed';
const collapsed = ref(false);
try {
  collapsed.value = localStorage.getItem(KEY) === '1';
} catch { /* iframe 权限兜底 */ }

const toggle = () => {
  collapsed.value = !collapsed.value;
  try {
    localStorage.setItem(KEY, collapsed.value ? '1' : '0');
  } catch { /* iframe 权限兜底 */ }
};
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  max-width: 440px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  font-family: var(--font-sans);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.card-head {
  cursor: pointer;
  user-select: none;
}

.panels {
  display: flex;
  flex-wrap: wrap;
}
</style>
