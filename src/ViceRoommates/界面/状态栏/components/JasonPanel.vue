<template>
  <div class="jason-panel">
    <div class="panel-header">
      <span class="char-name">Jason Duval</span>
      <span class="stage-tag" :class="stageClass">{{ store.data.Jason.关系阶段 }}</span>
    </div>

    <div class="stats-area">
      <StatBar label="好感度" :value="store.data.Jason.好感度" :color="affectionColor" />
      <StatBar label="信任度" :value="store.data.Jason.信任度" :color="trustColor" />
    </div>

    <div class="stage-hint">{{ stageHint }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import StatBar from './StatBar.vue';

const store = useDataStore();

const stageClass = computed(() => {
  const stage = store.data.Jason.关系阶段;
  return {
    'stage-roommate': stage === '室友',
    'stage-friend': stage === '朋友',
    'stage-ambiguous': stage === '暧昧',
    'stage-lover': stage === '恋人',
  };
});

const stageHint = computed(() => {
  const hints: Record<string, string> = {
    '室友': '陌生室友，保持距离',
    '朋友': '兄弟般的默契',
    '暧昧': '心照不宣的温柔',
    '恋人': '确认关系，深情相伴',
  };
  return hints[store.data.Jason.关系阶段] ?? '';
});

const affectionColor = computed(() => {
  const v = store.data.Jason.好感度;
  if (v < 20) return 'var(--c-stage-roommate)';
  if (v < 40) return 'var(--c-stage-friend)';
  if (v < 60) return 'var(--c-stage-ambiguous)';
  if (v < 80) return 'var(--c-primary)';
  return 'var(--c-stage-lover)';
});

const trustColor = 'var(--c-accent)';
</script>

<style lang="scss" scoped>
.jason-panel {
  padding: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.char-name {
  font-size: 0.95rem;
  font-weight: bold;
  color: var(--c-text);
  letter-spacing: 0.5px;
}

.stage-tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border: 1px solid;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.stage-roommate {
  color: var(--c-stage-roommate);
  border-color: var(--c-stage-roommate);
  background: rgba(136, 136, 170, 0.1);
}

.stage-friend {
  color: var(--c-stage-friend);
  border-color: var(--c-stage-friend);
  background: rgba(78, 205, 196, 0.1);
}

.stage-ambiguous {
  color: var(--c-stage-ambiguous);
  border-color: var(--c-stage-ambiguous);
  background: rgba(255, 107, 157, 0.1);
}

.stage-lover {
  color: var(--c-stage-lover);
  border-color: var(--c-stage-lover);
  background: rgba(255, 77, 109, 0.15);
}

.stats-area {
  margin-bottom: 8px;
}

.stage-hint {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  text-align: center;
  margin-top: 6px;
  letter-spacing: 0.5px;
}
</style>
