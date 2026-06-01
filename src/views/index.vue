<template>
  <div class="home">
    <div class="home__hero">
      <div class="home__hero-icon">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <rect x="28" y="4" width="16" height="16" rx="3" />
          <rect x="4" y="28" width="16" height="16" rx="3" />
          <rect x="28" y="28" width="16" height="16" rx="3" />
        </svg>
      </div>
      <h1 class="home__title">市场热力图</h1>
      <p class="home__subtitle">股票 · 基金 · ETF 全景可视化</p>
    </div>

    <div class="home__cards">
      <router-link to="/overview" class="card card--stock">
        <div class="card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
        </div>
        <h2 class="card__title">股票板块</h2>
        <p class="card__desc">行业板块涨跌热力图</p>
        <span class="card__arrow">&rarr;</span>
      </router-link>

      <router-link to="/fund" class="card card--fund">
        <div class="card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v9l6 3" />
          </svg>
        </div>
        <h2 class="card__title">基金</h2>
        <p class="card__desc">ETF 基金净值热力图</p>
        <span class="card__arrow">&rarr;</span>
      </router-link>

      <router-link to="/fundBlock" class="card card--fund-block">
        <div class="card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <rect x="2" y="2" width="9" height="9" rx="1" />
            <rect x="13" y="2" width="9" height="9" rx="1" />
            <rect x="2" y="13" width="9" height="9" rx="1" />
            <rect x="13" y="13" width="9" height="9" rx="1" />
          </svg>
        </div>
        <h2 class="card__title">基金板块</h2>
        <p class="card__desc">基金行业板块分布</p>
        <span class="card__arrow">&rarr;</span>
      </router-link>
    </div>

    <button class="home__test-btn" @click="test">测试对话框</button>
    <StockDialog v-model="dialogVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StockDialog from '../components/stock-detail.vue'

const dialogVisible = ref(false)

function test() {
  dialogVisible.value = !dialogVisible.value
}
</script>

<style lang="less" scoped>
.home {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: var(--surface-primary);
}

.home__hero {
  text-align: center;
  margin-bottom: 48px;
}

.home__hero-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: var(--color-brand-light);
  color: var(--color-brand);
  margin-bottom: 20px;

  svg {
    width: 36px;
    height: 36px;
  }
}

.home__title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

.home__subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  font-weight: 400;
}

.home__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 780px;
  width: 100%;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  background: var(--surface-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-normal);
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand);
  }

  &:hover .card__arrow {
    opacity: 1;
    transform: translateX(0);
  }
}

.card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.card--stock .card__icon {
  background: rgba(239, 68, 68, 0.08);
  color: var(--color-up);
}

.card--fund .card__icon {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.card--fund-block .card__icon {
  background: rgba(34, 197, 94, 0.08);
  color: var(--color-down);
}

.card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.card__desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.card__arrow {
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 1.2rem;
  color: var(--color-brand);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-normal);
}

.home__test-btn {
  margin-top: 32px;
  padding: 8px 20px;
  font-size: 13px;
  color: var(--text-tertiary);
  background: none;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--text-secondary);
    border-color: var(--border-strong);
  }
}

@media (max-width: 680px) {
  .home__cards {
    grid-template-columns: 1fr;
    max-width: 360px;
  }

  .home__title {
    font-size: 1.75rem;
  }
}
</style>
