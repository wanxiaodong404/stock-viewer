<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<style lang="less">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1;
  margin-top: var(--header-height);
  position: relative;
}
</style>
