<template>
  <main ref="container" id="container" style="width: 100vw;height: calc(100vh - 60px);">
  </main>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {FoamTree} from '@carrotsearch/foamtree'
import {COLOR} from '@/lib/enum'
import {getAreaBlockInfo, getIndustryBlockInfo} from '@/lib/api'

const container = ref(null);

let groups = []

onMounted(() => {
  const viewer = new FoamTree({
      id: 'container',
      dataObject: {groups: groups},
      onGroupSelectionChanged(group) {
        console.log('onGroupSelectionChanged', group)
      }, 
      onGroupExposureChanged(group) {
        console.log('onGroupExposureChanged', group)
      }, 
      onGroupClick(e) {
        e.preventDefault();
        console.log('onGroupClick', e)
        e.group.weight+=10
        viewer.update()
      },
      groupColorDecorator(opt, props, vars) {
        if (!props.group.data) {
          vars.groupColor = COLOR.default
        } else {
          if (!props.group.color) {
            props.group.color = COLOR.setColor(props.group.data);
          }
          vars.groupColor = props.group.color
        }
      },

      layout: 'relaxed',
      relaxationVisible: true,         // show relaxation
      relaxationMaxDuration: 6000,     // make relaxation last longer
      relaxationQualityThreshold: 0.1,
      fadeDuration: 2000,              // use a simple fade-in
      rolloutDuration: 0,
      pullbackDuration: 0,
      stacking: 'flattened',
      wireframeLabelDrawing: "always"  // show labels during animation
  })

  
  function update() {
    getIndustryBlockInfo({}).then(async (res) => {
      let data = await res.text();
  
      data = data.match(/(.+?\()(.+)\);$/)
  
      data = JSON.parse(data[2]);
  
      const _groups = data.data.diff.map(item => {
      // groups = data.data.diff.map(item => {
        return {
          ...item,
          weight: 15,
          data: item.f3,
          label: `${item.f14}
          ${item.f3}%`
        }
      });
      groups.push(..._groups)
      viewer.set({
        dataObject: {
          groups: groups
        }
      })
      // viewer.update()
    })
  }

  // setInterval(update, 5000)
  update()

  // setInterval(() => {
  //   groups[0].weight++

  //   viewer.redraw(0, groups)
  // }, 100)



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

