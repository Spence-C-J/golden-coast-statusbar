<template>
  <div class="user-panel">
    <div class="panel-header">
      <span class="char-name">🎨 You</span>
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

.stats-area {
  margin-bottom: 4px;
  margin-top: 30px;
}
</style>
