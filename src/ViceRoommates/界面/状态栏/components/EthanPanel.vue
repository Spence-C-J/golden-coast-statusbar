<template>
  <div class="ethan-panel">
    <div class="money-item">
      <span class="money-icon">$</span>
      <span class="money-amount">{{ formattedMoney }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const formattedMoney = computed(() => {
  const value = store.data.Ethan.金钱;
  return Number(value).toLocaleString('en-US');
});
</script>

<style lang="scss" scoped>
.ethan-panel {
  padding: 8px 12px;
  border-top: 1px solid var(--c-border);
  background: var(--c-surface-light);
}

.money-item {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
}

.money-icon {
  color: var(--c-warning);
  font-weight: bold;
  font-size: 0.85rem;
}

.money-amount {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--c-warning);
}
</style>
