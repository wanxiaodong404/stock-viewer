<template>
  <Dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" title="股票详情">
    <p class="stock-detail__placeholder">选择一只股票查看详情</p>
  </Dialog>
</template>

<script setup>
import Dialog from './dialog.vue'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="less" scoped>
.stock-detail__placeholder {
  text-align: center;
  color: var(--text-tertiary);
  padding: 40px 0;
}
</style>
