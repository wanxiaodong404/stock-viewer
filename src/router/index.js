import { createRouter, createWebHistory } from 'vue-router'
import Stock from '@/views/Stock.vue'
import Fund from '@/views/fund/index.vue'
import FundBlock from '@/views/fund/block.vue'
import Index from '@/views/Index.vue'
import OverView from '@/views/overview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
	{
		path: '/overview',
		name: 'overview',
		component: OverView
	},
	{
		path: '/stock',
		name: 'stock',
		component: Stock
	},
	{
		path: '/fund',
		name: 'fund',
		component: Fund
	},
	{
		path: '/fundBlock',
		name: 'fundBlock',
		component: FundBlock
	}
  ]
})

export default router
