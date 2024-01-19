<template>
  <div>

    <main ref="container" id="container" style="width: 100vw;height: calc(100vh - 20px);">
    </main>
    <buttonGroup @button="buttonReceive"></buttonGroup>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {FoamTree} from '@carrotsearch/foamtree'
import {COLOR} from '@/lib/enum'
import {jsonpReceive} from '@/lib/utils'
import {getSubscribeSelf, getSubscribeETF, getAllFund, getIndustryStockBlockInfo, getIndustryStockBlockList} from '@/lib/api'

import subscribe from '@/data/subscribe-fund.json'
import buttonGroup from '../components/button-group.vue'

const container = ref(null);

const groups = []

var viewer = null;
onMounted(() => {
  viewer = new FoamTree({
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
      /**
       * 手动加载【官方文档说明只支持权重修改】
       * @param {*} event 
       */
      async onGroupHover(event) {
        // if (!event.group.groups) {
          // event.preventDefault();

          // const child = await getIndustryStockBlockList({
          //   fs: `b:${event.group.key}+f:!50`,
          //   pz: 15
          // }).then(_res => {
          //   return _res.text().then(_data => {
          //     return jsonpReceive(_data, 'fn').data.diff || []
          //   })
          // })
          // event.group.groups = child.map(item => convert(item))
          // console.log('onGroupHover', event.group)

          // viewer.update()
        // }

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

      // maxGroups: 100,
      // layout: 'relaxed',
      // layout: 'squarified',
      layout: 'ordered',
      relaxationVisible: true,         // show relaxation
      relaxationMaxDuration: 6000,     // make relaxation last longer
      relaxationQualityThreshold: 0.1,
      fadeDuration: 2000,              // use a simple fade-in
      rolloutDuration: 0,
      pullbackDuration: 0,
      stacking: 'flattened',
      // stacking: 'hierarchical',
      descriptionGroupMaxHeight: 1,
      wireframeLabelDrawing: "always",  // show labels during animation
      showZeroWeightGroups: true,
  })
  function convert(item, child) {
    const data = item['f3'];
    return {
          key: item['f12'],
          weight: Math.abs(data),
          data: data,
          groups: child ? child.map(_child => convert(_child)) : null,
          label: `${item['f14']} ${data}%`
        }
  }
  getIndustryStockBlockInfo().then((res) => {
    res.text().then(async (data) => {
      data = jsonpReceive(data, 'fn');
      const _groups = await Promise.all(data.data.diff.map(async (item) => {
        const child = await getIndustryStockBlockList({
          fs: `b:${item['f12']}+f:!50`,
          pz: 150
        }).then(_res => {
          return _res.text().then(_data => {
            return jsonpReceive(_data, 'fn').data.diff || []
          })
        })
        // const child = null;
        const __d = convert(item, child)
        return __d
      }));
      groups.push(..._groups)
      viewer.set({
        dataObject: {
          groups: groups
        }
      })
    })
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

function buttonReceive() {
  const mime = 'image/png'
  const img = viewer.get("imageData", {
    format: mime
  });
  const byteCharacters = atob(img.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i< byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new  Uint8Array(byteNumbers);
  // const blob = new Blob([byteArray], {type: mime});
  // let binaryData = [];
  // binaryData.push(blob)
  // let url = URL.createObjectURL(new Blob(binaryData))
  const url = URL.createObjectURL(new File([byteArray], 'view.png'), {type: mime})
 
  const link = document.createElement('a');
  link.download = 'view.png';
  link.href = url;
  link.click();
}
</script>

