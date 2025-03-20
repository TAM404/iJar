import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from './authRoutes';
import { agencyRoutes } from './agencyRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import NotFound from '@/components/NotFound.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: () => import('@/components/Search/HouseMap.vue') },
  ...authRoutes,
  ...dashboardRoutes,
  ...agencyRoutes,
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
