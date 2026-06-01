<template>
  <div class="treemap-page">
    <div class="treemap-page__header">
      <h1 class="treemap-page__title">股票板块热力图</h1>
    </div>
    <div ref="container" id="container" class="treemap-page__canvas"></div>
    <buttonGroup @button="buttonReceive" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FoamTree } from '@carrotsearch/foamtree'
import { getThemeColors, setupThemeListener, setupResize, colorDecorator } from '@/lib/foamtree'
import buttonGroup from '../components/button-group.vue'

const container = ref(null)
let viewer = null

onMounted(() => {
  const colors = getThemeColors()
  viewer = new FoamTree({
    id: 'container',
    dataObject: { groups: [] },
    backgroundColor: colors.backgroundColor,
    onGroupClick(e) {
      e.preventDefault()
      e.group.weight += 10
      viewer.update()
    },
    groupColorDecorator: colorDecorator,
    layout: 'relaxed',
    relaxationVisible: true,
    relaxationMaxDuration: 6000,
    relaxationQualityThreshold: 0.1,
    fadeDuration: 2000,
    rolloutDuration: 0,
    pullbackDuration: 0,
    stacking: 'flattened',
    wireframeLabelDrawing: 'always'
  })

  setupThemeListener(viewer)
  setupResize(viewer)

  function update() {
    import('@/lib/api').then(({ getIndustryBlockInfo }) => {
      getIndustryBlockInfo({}).then(async (res) => {
        let data = await res.text()
        data = data.match(/(.+?\()(.+)\);$/)
        data = JSON.parse(data[2])
        const groups = data.data.diff.map(item => ({
          ...item,
          weight: 15,
          data: item.f3,
          label: `${item.f14}\n${item.f3}%`
        }))
        viewer.set({ dataObject: { groups } })
      })
    })
  }

  update()
})

function buttonReceive() {
  const mime = 'image/png'
  const img = viewer.get('imageData', { format: mime, pixelRatio: 10 })
  const byteCharacters = atob(img.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
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
