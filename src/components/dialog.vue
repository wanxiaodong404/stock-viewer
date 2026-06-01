<template>
  <Transition name="dialog">
    <div v-if="props.modelValue" class="dialog-container" @keydown.escape="close">
      <div class="dialog-mask" @click="close"></div>
      <div class="dialog-wrapper">
        <div class="dialog-header">
          <span class="dialog-title">{{ props.title }}</span>
          <button class="dialog-close" @click="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <button class="dialog-footer__btn" @click="close">关闭</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  }
})

function close() {
  emit('update:modelValue', false)
}

function handleEscape(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style lang="less" scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;

  .dialog-wrapper {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;

  .dialog-wrapper {
    transform: scale(0.95);
    opacity: 0;
  }
}

.dialog-container {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-mask {
  position: absolute;
  inset: 0;
  background: var(--surface-overlay);
  backdrop-filter: blur(4px);
}

.dialog-wrapper {
  position: relative;
  width: min(800px, 90vw);
  max-height: 85vh;
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.dialog-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--text-primary);
    background: var(--surface-secondary);
  }
}

.dialog-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: 3px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  padding: 16px 20px;
  border-top: 1px solid var(--border-default);
  flex-shrink: 0;
}

.dialog-footer__btn {
  padding: 8px 24px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--surface-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--surface-primary);
    border-color: var(--border-strong);
  }
}
</style>
