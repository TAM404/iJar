import DashboardLayout from '@/components/dashboard/DashboardLayout.vue';
import CRMPage from '@/components/dashboard/crm/CRMPage.vue';
import ManagementPage from '@/components/dashboard/management/ManagementPage.vue';
import StatisticsPage from '@/components/dashboard/statistics/StatisticsPage.vue';

export const dashboardRoutes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: 'crm', component: CRMPage },
      { path: 'management', component: ManagementPage },
      { path: 'statistics', component: StatisticsPage }
    ]
  }
];