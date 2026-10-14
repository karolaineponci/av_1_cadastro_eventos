/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
// @ts-ignore Vue SFC declarations are not available in this project.
import EventConsultation from '@/pages/cards.vue'
import ClientManagement from '@/pages/management.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/consulta',
      component: EventConsultation,
    },
    {
      path: '/management',
      component: ClientManagement,
    }
  ],
})

export default router
