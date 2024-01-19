<template>
  <main ref="container" id="container" style="width: 100vw;height: calc(100vh - 60px);">
  </main>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {FoamTree} from '@carrotsearch/foamtree'
import {COLOR} from '@/lib/enum'


const container = ref(null);

onMounted(() => {
  const viewer = new FoamTree({
    id: 'container',
      dataObject: {groups: []},
      onGroupSelectionChanged(group) {
        console.log('onGroupSelectionChanged', group)
      }, 
      onGroupExposureChanged(group) {
        console.log('onGroupExposureChanged', group)
      }, 
      onGroupClick(group) {
        console.log('onGroupClick', group)
      },
      groupColorDecorator(opt, props, vars) {
        if (!props.group.color) {
          props.group.color = props.group.changeRatio > 0 ? COLOR.red : COLOR.green;
        }
        vars.groupColor = props.group.color
      },

      layout: 'squarified',
      relaxationVisible: true,         // show relaxation
      relaxationMaxDuration: 6000,     // make relaxation last longer
      relaxationQualityThreshold: 0.1,
      fadeDuration: 2000,              // use a simple fade-in
      rolloutDuration: 0,
      pullbackDuration: 0,
      stacking: 'flattened',
      wireframeLabelDrawing: "always",  // show labels during animation
      
      titleBar: "inscribed",
      titleBarFontFamily: "monospace",
      maxLabelSizeForTitleBar: Number.MAX_VALUE,
      groupLabelFontFamily: "Arial, sans-serif"
  })

  window.addEventListener('resize',  function () {
    console.log('window resize')
    let timer = null;
    return () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        viewer.resize();
      }, 300)
    }
  }());
})
</script>

