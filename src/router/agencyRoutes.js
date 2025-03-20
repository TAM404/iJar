import AgencyProfile from '../components/agency/AgencyProfile/AgencyProfile.vue';
import { supabase } from '@/utils/database/supabase';

export const agencyRoutes = [
  {
    path: '/agency/create',
    name: 'createAgency',
    component: () => import('@/components/agency/InputForm/AgencyInput.vue'),
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      // Get the current session using getSession()
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log(session?.user);
      if (session?.user) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/agency/:id',
    name: 'agencyProfile',
    component: () => import('@/components/agency/AgencyUserManager.vue'),
    props: true
  }
];