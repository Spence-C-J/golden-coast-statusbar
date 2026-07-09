<template>
  <div class="jake-panel">
    <div class="panel-header">
      <span class="char-name">🎮 Jake</span>
      <span class="stage-tag" :class="stageClass">{{ store.data.Jake.关系阶段 }}</span>
    </div>

    <div class="tag-row">
      <span class="heat-tag" :class="heatClass">
        <span class="heat-icon">{{ heatIcon }}</span>
        {{ store.data.Jake.冷热状态 }}
      </span>
    </div>

    <div class="stats-area">
      <StatBar label="🔍 觉察度" :value="store.data.Jake.觉察度" :color="awarenessColor" />
      <StatBar label="🪢 依赖度" :value="store.data.Jake.对user的依赖度" :color="'var(--c-primary)'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

const stageClass = computed(() => {
  const stage = store.data.Jake.关系阶段;
  return {
    'stage-reunion': stage === '重逢期',
    'stage-struggle': stage === '挣扎期',
    'stage-face': stage === '面对期',
  };
});

const heatClass = computed(() => {
  const state = store.data.Jake.冷热状态;
  return {
    'heat-hot': state === '热',
    'heat-normal': state === '正常',
    'heat-cold': state === '冷',
  };
});

const heatIcon = computed(() => {
  const icons: Record<string, string> = {
    '热': '🔥',
    '正常': '➖',
    '冷': '🧊',
  };
  return icons[store.data.Jake.冷热状态] ?? '➖';
});

const awarenessColor = computed(() => {
  const v = store.data.Jake.觉察度;
  if (v < 30) return 'var(--c-stage-reunion)';
  if (v < 60) return 'var(--c-stage-struggle)';
  return 'var(--c-stage-face)';
});
</script>

<style lang="scss" scoped>
.jake-panel {
  flex: 1;
  min-width: 180px;
  padding: 12px;
  border-right: 1px solid var(--c-border);
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
  color: var(--c-primary);
  letter-spacing: 0.5px;
}

.stage-tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 1px solid;
  border-radius: 3px;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.stage-reunion {
  color: var(--c-stage-reunion);
  border-color: var(--c-stage-reunion);
  background: rgba(232, 160, 48, 0.1);
}

.stage-struggle {
  color: var(--c-stage-struggle);
  border-color: var(--c-stage-struggle);
  background: rgba(231, 76, 60, 0.1);
}

.stage-face {
  color: var(--c-stage-face);
  border-color: var(--c-stage-face);
  background: rgba(78, 205, 196, 0.1);
}

.tag-row {
  margin-bottom: 10px;
}

.heat-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 1px solid;
  border-radius: 3px;
  font-family: var(--font-mono);
}

.heat-icon {
  font-size: 0.75rem;
}

.heat-hot {
  color: var(--c-heat-hot);
  border-color: var(--c-heat-hot);
  background: rgba(255, 107, 107, 0.1);
}

.heat-normal {
  color: var(--c-heat-normal);
  border-color: var(--c-heat-normal);
  background: rgba(122, 122, 146, 0.1);
}

.heat-cold {
  color: var(--c-heat-cold);
  border-color: var(--c-heat-cold);
  background: rgba(74, 158, 255, 0.1);
}

.stats-area {
  margin-bottom: 4px;
}
</style>
