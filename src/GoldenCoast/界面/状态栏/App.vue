<template>
  <div class="gc-statusbar">
    <!-- 系统信息 -->
    <div class="section sys-section">
      <div class="sys-item">
        <span class="sys-label">日期</span>
        <span class="sys-value">{{ stat_data?.系统?.日期 ?? '--' }}</span>
      </div>
      <div class="sys-divider"></div>
      <div class="sys-item">
        <span class="sys-label">时段</span>
        <span class="sys-value">{{ stat_data?.系统?.时间段 ?? '--' }}</span>
      </div>
      <div class="sys-divider"></div>
      <div class="sys-item">
        <span class="sys-label">位置</span>
        <span class="sys-value location">{{ stat_data?.系统?.当前位置 ?? '--' }}</span>
      </div>
    </div>

    <!-- Nathan 状态 -->
    <div class="section char-section">
      <div class="char-header">
        <span class="char-name">Nathan Prescott</span>
        <span class="char-stage" :class="stageClass">{{ stageLabel }}</span>
      </div>
      <div class="stat-bars">
        <div class="stat-bar-wrap">
          <div class="stat-bar-label">
            <span>好感度</span>
            <span class="stat-num">{{ nathanAffection }}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill affection" :style="{ width: nathanAffection + '%' }"></div>
          </div>
        </div>
        <div class="stat-bar-wrap">
          <div class="stat-bar-label">
            <span>信任度</span>
            <span class="stat-num">{{ nathanTrust }}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill trust" :style="{ width: nathanTrust + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 玩家状态 -->
    <div class="section player-section">
      <div class="player-item">
        <span class="player-label">资金</span>
        <span class="player-value">${{ formatMoney(playerMoney) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import { computed } from 'vue';

const store = useDataStore();
const stat_data = computed(() => store.stat_data as any);

const nathanAffection = computed(() => stat_data.value?.Nathan?.好感度 ?? 0);
const nathanTrust = computed(() => stat_data.value?.Nathan?.信任度 ?? 0);
const playerMoney = computed(() => stat_data.value?.玩家?.金钱 ?? 0);

const stageLabel = computed(() => {
  const a = nathanAffection.value;
  if (a < 20) return '初识';
  if (a < 40) return '熟悉';
  if (a < 70) return '暧昧';
  return '恋人';
});

const stageClass = computed(() => {
  const a = nathanAffection.value;
  if (a < 20) return 'stage-1';
  if (a < 40) return 'stage-2';
  if (a < 70) return 'stage-3';
  return 'stage-4';
});

function formatMoney(n: number): string {
  return n.toLocaleString('en-US');
}
</script>

<style lang="scss" scoped>
.gc-statusbar {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  font-family: var(--font-main);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.4;
}

.section {
  padding: 8px 12px;
  border-bottom: 1px solid var(--c-border);
}

.section:last-child {
  border-bottom: none;
}

/* 系统信息 */
.sys-section {
  display: flex;
  align-items: center;
  background: var(--c-surface);
  gap: 8px;
}

.sys-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sys-label {
  color: var(--c-text-muted);
  font-size: 12px;
}

.sys-value {
  font-weight: 600;
}

.sys-value.location {
  color: var(--c-primary);
}

.sys-divider {
  width: 1px;
  height: 12px;
  background: var(--c-border);
}

/* Nathan 状态 */
.char-section {
  background: var(--c-surface);
}

.char-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.char-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--c-primary);
}

.char-stage {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.stage-1 { background: var(--c-surface-alt); color: var(--c-text-muted); }
.stage-2 { background: #e3f2fd; color: #1565c0; }
.stage-3 { background: #fce4ec; color: #c62828; }
.stage-4 { background: #f3e5f5; color: #6a1b9a; }

.stat-bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.stat-num {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.stat-bar-track {
  height: 5px;
  background: var(--c-surface-alt);
  border-radius: 3px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.stat-bar-fill.affection {
  background: linear-gradient(90deg, var(--c-accent), #e9844a);
}

.stat-bar-fill.trust {
  background: linear-gradient(90deg, var(--c-success), #21867a);
}

/* 玩家状态 */
.player-section {
  display: flex;
  justify-content: flex-end;
  background: var(--c-surface);
}

.player-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.player-label {
  color: var(--c-text-muted);
  font-size: 12px;
}

.player-value {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--c-primary);
}
</style>
