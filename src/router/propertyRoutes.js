/*
import CreateProperty from '../components/property/createProperty/CreateProperty.vue'
import EditProperty from '../components/property/editProperty/EditProperty.vue'
import { supabase } from '../supabase'

export const propertyRoutes = [
  {
    path: '/createProperty',
    name: 'createProperty',
    component: CreateProperty,
    beforeEnter: (to, from, next) => {
        const user = supabase.auth.user()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
  },
  {
    path: '/editProperty/:id',
    name: 'editProperty',
    component: EditProperty,
    props: true,
    beforeEnter: (to, from, next) => {
        const user = supabase.auth.user()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
  }
]
*/