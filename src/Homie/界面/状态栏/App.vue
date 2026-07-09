<template>
  <div class="status-card">
    <SystemBar />
    <div class="panels">
      <JakePanel />
      <UserPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemBar from './components/SystemBar.vue';
import JakePanel from './components/JakePanel.vue';
import UserPanel from './components/UserPanel.vue';
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

.panels {
  display: flex;
  flex-wrap: wrap;
}
</style>
