<template>
  <div class="button-group">
    <button @click="clickHandle">下载</button>
  </div>
</template>

<script setup>
import {defineEmits} from 'vue'
const emit = defineEmits(['button'])
function clickHandle(event) {
  emit('button', event, 'download')
}
</script>