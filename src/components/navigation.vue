<template>
  <div class="navigation__container">
    <h1>涨幅</h1>
    <h1>成交量</h1>
    <h1>涨停</h1>
    <h1>跌停</h1>
    <h1>指数ETF</h1>
  </div>
</template>

<script setup>
import {ref} from 'vue'
</script>

<style lang="less">
.navigation__container {
  display: grid;
  grid-template-columns: repeat(6, 150px);
  height: 60px;
  background-color: #e0e0e0;
}
</style>