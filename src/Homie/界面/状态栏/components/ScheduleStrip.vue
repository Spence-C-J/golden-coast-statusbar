<template>
  <div class="schedule-strip" v-if="hasContent">
    <div class="strip-row" v-if="commissions.length > 0">
      <span class="strip-label">📋 委托</span>
      <div class="strip-items">
        <span
          v-for="c in commissions"
          :key="c.uid"
          class="strip-chip"
          :class="{ urgent: c.daysLeft <= 1 }"
          :title="`${c.uid} · ${c.内容} · ${c.客户} · 截稿 ${c.截稿日}`"
        >{{ c.内容 }}<span class="chip-ddl">{{ ddlText(c) }}</span></span>
      </div>
    </div>
    <div class="strip-row" v-if="events.length > 0">
      <span class="strip-label">🗓 本周</span>
      <div class="strip-items">
        <span v-for="(e, i) in events" :key="i" class="strip-chip event">{{ e }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const commissions = computed(() => {
  const today = new Date(store.data.系统.日期 ?? '');
  return Object.entries(store.data.user.委托 ?? {})
    .filter(([, c]) => c.状态 === '进行中')
    .map(([uid, c]) => {
      const ddl = new Date(c.截稿日);
      const daysLeft = isNaN(ddl.getTime()) || isNaN(today.getTime())
        ? 99
        : Math.round((ddl.getTime() - today.getTime()) / 86400000);
      return { uid, 内容: c.内容, 客户: c.客户, 截稿日: c.截稿日, daysLeft };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);
});

const events = computed(() => store.data.日程.本周特殊事项 ?? []);

const hasContent = computed(() => commissions.value.length > 0 || events.value.length > 0);

const ddlText = (c: { daysLeft: number }) =>
  c.daysLeft < 0 ? '已逾期' : c.daysLeft === 0 ? '今天截' : c.daysLeft === 1 ? '明天截' : `${c.daysLeft}天`;
</script>

<style lang="scss" scoped>
.schedule-strip {
  border-top: 1px solid var(--c-border);
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.strip-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.strip-label {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.strip-items {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-width: 0;
}

.strip-chip {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  padding: 1px 7px;
  border: 1px solid var(--c-border);
  border-radius: 3px;
  color: var(--c-text);
  background: var(--c-surface-light);
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.strip-chip.urgent {
  color: var(--c-danger);
  border-color: var(--c-danger);
  background: rgba(231, 76, 60, 0.08);
}

.chip-ddl {
  margin-left: 4px;
  color: var(--c-text-muted);
  font-size: 0.66rem;
}

.strip-chip.urgent .chip-ddl {
  color: var(--c-danger);
}

.strip-chip.event {
  color: var(--c-text-muted);
  border-style: dashed;
}
</style>
