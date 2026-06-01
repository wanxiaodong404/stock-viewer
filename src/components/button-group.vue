<template>
  <div class="button-float__container">
    <div class="button-group">
      <button @click="clickHandle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        下载高清图
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['button'])
function clickHandle(event) {
  emit('button', event, 'download')
}
</script>

<style lang="less" scoped>
.button-float__container {
  position: fixed;
  left: 0;
  bottom: 24px;
  padding: 12px;
  padding-right: 48px;
  background: var(--surface-elevated);
  border: 1px solid var(--border-default);
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  box-shadow: var(--shadow-md);
  transform: translateX(-85%);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  z-index: 100;

  &:hover {
    transform: translateX(0);
    box-shadow: var(--shadow-lg);
  }
}

.button-group {
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    color: var(--text-primary);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-sm);
    padding: 8px 16px;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
    transition: all var(--transition-fast);

    &:hover {
      background: var(--color-brand-light);
      border-color: var(--color-brand);
      color: var(--color-brand);
    }
  }
}
</style>
