<template>
  <div class="treemap-page">
    <div class="treemap-page__header">
      <h1 class="treemap-page__title">基金板块热力图</h1>
    </div>
    <div ref="container" id="container" class="treemap-page__canvas"></div>
    <buttonGroup @button="buttonReceive" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FoamTree } from '@carrotsearch/foamtree'
import { jsonpReceive } from '@/lib/utils'
import { getThemeColors, setupThemeListener, setupResize, colorDecorator } from '@/lib/foamtree'
import { getIndustryStockBlockInfo, getIndustryStockBlockList } from '@/lib/api'
import buttonGroup from '@/components/button-group.vue'

const container = ref(null)
let viewer = null

onMounted(() => {
  const colors = getThemeColors()
  const groups = []

  viewer = new FoamTree({
    id: 'container',
    dataObject: { groups },
    backgroundColor: colors.backgroundColor,
    groupColorDecorator: colorDecorator,
    layout: 'ordered',
    relaxationVisible: true,
    relaxationMaxDuration: 6000,
    relaxationQualityThreshold: 0.1,
    fadeDuration: 2000,
    rolloutDuration: 0,
    pullbackDuration: 0,
    stacking: 'flattened',
    descriptionGroupMaxHeight: 1,
    wireframeLabelDrawing: 'always',
    showZeroWeightGroups: true
  })

  setupThemeListener(viewer)
  setupResize(viewer)

  function convert(item, child) {
    const data = item['f3']
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
      data = jsonpReceive(data, 'fn')
      const _groups = await Promise.all(data.data.diff.map(async (item) => {
        const child = await getIndustryStockBlockList({
          fs: `b:${item['f12']}+f:!50`,
          pz: 150
        }).then(_res => {
          return _res.text().then(_data => {
            return jsonpReceive(_data, 'fn').data.diff || []
          })
        })
        return convert(item, child)
      }))
      groups.push(..._groups)
      viewer.set({ dataObject: { groups } })
    })
  })
})

function buttonReceive() {
  const mime = 'image/png'
  const img = viewer.get('imageData', { format: mime, pixelRatio: 10 })
  const byteCharacters = atob(img.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteCharacters)
  const url = URL.createObjectURL(new File([byteArray], 'view.png', { type: mime }))
  const link = document.createElement('a')
  link.download = 'view.png'
  link.href = url
  link.click()
}
</script>

<style lang="less" scoped>
.treemap-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
}

.treemap-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--surface-secondary);
  border-bottom: 1px solid var(--border-default);
  flex-shrink: 0;
  height: 40px;
}

.treemap-page__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.treemap-page__canvas {
  flex: 1;
  min-height: 0;
}
</style>
