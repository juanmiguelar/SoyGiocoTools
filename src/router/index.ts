import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AgreementTool from '../views/AgreementTool.vue'; // Rename Home to AgreementTool
import AgreementHistory from '../views/AgreementHistory.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'AgreementTool', component: AgreementTool },
  { path: '/agreement-history', name: 'AgreementHistory', component: AgreementHistory },
  // Placeholder for additional tools
  // { path: '/tool2', name: 'Tool2', component: () => import('../views/Tool2.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
