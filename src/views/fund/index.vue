<template>
  <main ref="container" id="container" style="width: 100vw;height: calc(100vh - 60px);">
  </main>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {FoamTree} from '@carrotsearch/foamtree'
import {COLOR} from '@/lib/enum'
import {jsonpReceive} from '@/lib/utils'
import {getSubscribeSelf, getSubscribeETF, getAllFund} from '@/lib/api'

import subscribe from '@/data/subscribe-fund.json'

const container = ref(null);

const groups = []

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
      onGroupClick(group) {
        console.log('onGroupClick', group)
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

  getAllFund({
    secids: subscribe.etf.map(item => item.code).join(',')
  }).then(async (res) => {
    let data = await res.text();

    data = jsonpReceive(data, 'var');
    const _groups = data.datas.map(item => {
      const data = Number(item[17].replace('%', ''));
      return {
        weight: 15,
        data: data,
        label: `${item[1]}
        ${item[17]}`
      }
    });
    groups.push(..._groups)
    viewer.set({
      dataObject: {
        groups: groups
      }
    })
  })

  // getSubscribeETF({
  //   secids: subscribe.etf.map(item => item.code).join(',')
  // }).then(async (res) => {
  //   const data = await res.json()
  //   const _groups = data.data.diff.map(item => {
  //     return {
  //       ...item,
  //       weight: 15,
  //       data: item.f3,
  //       label: `${item.f14}
  //       ${item.f3}%`
  //     }
  //   });
  //   groups.push(..._groups)
  //   viewer.set({
  //     dataObject: {
  //       groups: groups
  //     }
  //   })
  // })

  //   getSubscribeSelf({
  //     Fcodes: subscribe.self.map(item => item.code).join(',')
  //   }).then(async (res) => {
  //     const data = await res.json()
  //     const _groups = data.Datas.map(item => {
  //       return {
  //         ...item,
  //         weight: Number(item.ACCNAV),
  //         data: item.ACCNAV,
  //         label: `${item.SHORTNAME}
  //         ${item.ACCNAV}%`
  //       }
  //     });
  //     groups.push(..._groups)
  //     viewer.set({
  //       dataObject: {
  //         groups: groups
  //       }
  //     })
  //   })

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

