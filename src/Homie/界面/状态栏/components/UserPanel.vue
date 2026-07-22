<template>
  <div class="user-panel">
    <div class="panel-header">
      <span class="char-name">🎨 You</span>
    </div>

    <div class="career-row">
      <span class="career-icon">🎨</span>
      <span class="career-text">{{ followerCount }} 粉</span>
      <span class="career-sep" v-if="activeCommissions > 0">·</span>
      <span class="career-text" v-if="activeCommissions > 0">📋 {{ activeCommissions }}单</span>
    </div>

    <div class="stats-area">
      <StatBar label="😵 疲惫值" :value="store.data.user.疲惫值" :color="fatigueColor" />
      <StatBar label="🚪 离开决心" :value="store.data.user.离开决心" :color="resolveColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

const fatigueColor = computed(() => {
  const v = store.data.user.疲惫值;
  if (v < 30) return 'var(--c-accent)';
  if (v < 60) return 'var(--c-primary)';
  return 'var(--c-danger)';
});

const resolveColor = computed(() => {
  const v = store.data.user.离开决心;
  if (v < 30) return 'var(--c-accent)';
  if (v < 60) return 'var(--c-primary)';
  return 'var(--c-danger)';
});

const followerCount = computed(() => {
  const n = store.data.user.SNS粉丝数;
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, '') + '万';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
});

const activeCommissions = computed(() =>
  Object.values(store.data.user.委托 ?? {}).filter(c => c.状态 === '进行中').length
);
</script>

<style lang="scss" scoped>
.user-panel {
  flex: 1;
  min-width: 180px;
  padding: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.char-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--c-accent);
  letter-spacing: 0.5px;
}

.career-row {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.career-icon {
  font-size: 0.8rem;
}

.career-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-muted);
  white-space: nowrap;
}

.career-sep {
  color: var(--c-border);
}

.stats-area {
  margin-bottom: 4px;
}
</style>
