<template>
  <div class="button-float__container">
    <div class="button-group">
      <button @click="clickHandle">下载高清图</button>
      <!-- <button @click="clickHandle">测试</button> -->
    </div>
  </div>
</template>

<script setup>
import {defineEmits} from 'vue'
const emit = defineEmits(['button'])
function clickHandle(event) {
  emit('button', event, 'download')
}
</script>


<style lang="less">
.button-float__container {
  position: fixed;
  left: 0;
  bottom: 20px;
  padding: 20px;
  padding-right: 50px;
  background-color: rgba(0,0,0,.2);
  border-radius: 0 5px 5px 0;
  transform: translateX(-80%);
  transition: all .2s linear;
  &:hover {
    padding-right: 20px;
    transform: translateX(0%);
  }
}
.button-group {
  
  button {
    display: block;
    background-color: rgba(255,255,255,.7);
    color: #333;
    border-radius: 4px;
    outline: none;
    border: 1px solid #333;
    padding: 5px 20px;
    cursor: pointer;
    margin-bottom: 10px;
    &:last-child {
      margin: 0;
    }
  }
}
</style>