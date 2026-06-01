import { COLOR } from '@/lib/enum'

export function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    groupLabelColor: isDark ? '#e2e8f0' : '#333333'
  }
}

export function setupThemeListener(viewer) {
  window.addEventListener('theme-changed', (e) => {
    const colors = getThemeColors()
    viewer.set({
      backgroundColor: colors.backgroundColor
    })
  })
}

export function setupResize(viewer) {
  let timer = null
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => viewer.resize(), 300)
  })
}

export function colorDecorator(opt, props, vars) {
  if (props.group.data === undefined) {
    vars.groupColor = COLOR.default
  } else {
    if (!props.group.color) {
      props.group.color = COLOR.setColor(props.group.data)
    }
    vars.groupColor = props.group.color
  }
}
