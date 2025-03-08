import AgencyProfile from '../components/agency/AgencyShow/AgencyProfile.vue';
import { supabase } from '@/utils/database/supabase';

export const agencyRoutes = [
  {
    path: '/agency/create',
    name: 'createAgency',
    component: () => import('@/components/agency/AgencyCreate/AgencyInput.vue'),
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
    component: AgencyProfile,
    props: true
  }
];