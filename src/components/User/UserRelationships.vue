<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 flex items-center">
        <UsersIcon class="h-6 w-6 text-indigo-600 mr-2" />
        Your Agency Relationships
      </h2>
      <p class="text-gray-600 mt-1">View and manage your roles across different agencies</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <div class="flex">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>

    <!-- No Relationships -->
    <div v-else-if="!relationships.length" class="text-center py-12 bg-gray-50 rounded-lg">
      <UserIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Agency Relationships</h3>
      <p class="text-gray-600 mb-4">You currently don't have any roles in any agencies.</p>
      <button 
        @click="refreshRelationships"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <RefreshIcon class="h-4 w-4 mr-2" />
        Refresh
      </button>
    </div>

    <!-- Relationships List -->
    <div v-else class="space-y-6">
      <div 
        v-for="relationship in relationships" 
        :key="`${relationship.agency_id}-${relationship.role_id}`"
        class="bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ relationship.agencies.name }}
            </h3>
            <div class="mt-2 flex items-center">
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="getRoleBadgeClass(relationship.roles.type)"
              >
                {{ relationship.roles.name }}
              </span>
            </div>
          </div>
          
          <button 
            @click="removeRole(relationship.user_id, relationship.agency_id)"
            class="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getUserRoles, removeUserRoles } from '@/utils/database/roles/rolesAPI'
import { useUserStore } from '@/stores/userStore'
import { 
  UserIcon, 
  UsersIcon, 
  ExclamationCircleIcon,
  ArrowPathIcon, // Change this line
  TrashIcon 
} from '@heroicons/vue/24/outline'
import { getAgency } from '@/utils/database/agencies/agenciesAuth'

export default {
  name: 'UserRelationships',
  
  components: {
    UserIcon,
    UsersIcon,
    ExclamationCircleIcon,
    ArrowPathIcon, // Change this line
    TrashIcon
  },

  setup() {
    const userStore = useUserStore()
    const relationships = ref([])
    const loading = ref(true)
    const error = ref(null)

    const getRoleBadgeClass = (roleType) => {
      const classes = {
        'admin': 'bg-red-100 text-red-800',
        'agent': 'bg-blue-100 text-blue-800',
        'manager': 'bg-green-100 text-green-800',
        'default': 'bg-gray-100 text-gray-800'
      }
      return classes[roleType] || classes.default
    }

    const fetchRelationships = async () => {
      try {
        loading.value = true
        error.value = null
        await userStore.initializeSession();
        const data = await getUserRoles(userStore.user?.id)
        console.log('data',data)
        relationships.value = data.filter( async e=>{ e.agencies = await getAgency(e.agency_id);return e;} );
      } catch (err) {
        error.value = err.message
        console.error('Error fetching relationships:', err)
      } finally {
        loading.value = false
      }
    }

    const removeRole = async (userId, agencyId) => {
      try {
        loading.value = true
        await removeUserRoles(userId, agencyId)
        await fetchRelationships()
      } catch (err) {
        error.value = err.message
        console.error('Error removing role:', err)
      } finally {
        loading.value = false
      }
    }

    const refreshRelationships = () => {
      fetchRelationships()
    }

    onMounted(() => {
      fetchRelationships()
    })

    return {
      relationships,
      loading,
      error,
      getRoleBadgeClass,
      removeRole,
      refreshRelationships
    }
  }
}
</script>