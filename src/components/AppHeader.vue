<template>
  <header class="app-header">
    <div class="app-header__inner">
      <router-link to="/" class="app-header__brand">
        <svg class="app-header__logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span class="app-header__title">市场热力图</span>
      </router-link>

      <nav class="app-header__nav">
        <router-link to="/overview" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
          股票板块
        </router-link>
        <router-link to="/stock" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 3v18h18" />
            <path d="M7 16l4-4 4 4 5-8" />
          </svg>
          个股
        </router-link>
        <router-link to="/fund" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v9l6 3" />
          </svg>
          基金
        </router-link>
        <router-link to="/fundBlock" class="nav-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <rect x="2" y="2" width="9" height="9" rx="1" />
            <rect x="13" y="2" width="9" height="9" rx="1" />
            <rect x="2" y="13" width="9" height="9" rx="1" />
            <rect x="13" y="13" width="9" height="9" rx="1" />
          </svg>
          基金板块
        </router-link>
      </nav>

      <div class="app-header__actions">
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换浅色模式' : '切换深色模式'">
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { isDark: isDark.value } }))
}
</script>

<style lang="less" scoped>
.app-header {
  height: var(--header-height);
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border-default);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;

  html.dark & {
    background: rgba(15, 23, 42, 0.85);
  }
}

.app-header__inner {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;
}

.app-header__logo {
  width: 24px;
  height: 24px;
  color: var(--color-brand);
}

.app-header__title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
  white-space: nowrap;

  &:hover {
    color: var(--text-primary);
    background: var(--surface-secondary);
  }

  &.router-link-active {
    color: var(--color-brand);
    background: var(--color-brand-light);
  }

  svg {
    flex-shrink: 0;
  }
}

.app-header__actions {
  flex-shrink: 0;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--text-primary);
    border-color: var(--border-strong);
    background: var(--surface-secondary);
  }
}

@media (max-width: 768px) {
  .app-header__title {
    display: none;
  }

  .nav-link {
    padding: 6px 10px;
    font-size: 13px;

    svg {
      display: none;
    }
  }
}

@media (max-width: 520px) {
  .app-header__nav {
    gap: 0;
  }
  .nav-link {
    padding: 6px 8px;
    font-size: 12px;
  }
}
</style>
