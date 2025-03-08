import Login from '../components/auth/login/Login.vue'
import SignUp from '../components/auth/signup/SignUp.vue'
//import CreateProfile from '../components/auth/createProfile/CreateProfile.vue'
//import EditProfile from '../components/auth/editProfile/EditProfile.vue'
import { supabase } from '../utils/database/supabase'

export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  /*
  {
    path: '/createProfile',
    name: 'createProfile',
    component: CreateProfile
  },
  {
    path: '/editProfile/:id',
    name: 'editProfile',
    component: EditProfile,
    props: true,
    beforeEnter: (to, from, next) => {
        const user = supabase.auth.user()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
  }*/
]
