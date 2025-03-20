<template>
  <div class="bg-white rounded-lg shadow p-6">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        <UsersIcon class="h-5 w-5 text-indigo-600 mr-2" />
        Manage Agency Users
      </h2>
    </div>

    <!-- Add New User Form -->ff
    <form @submit.prevent="addUser" class="mb-8 p-4 bg-gray-50 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="newUser.email"
            type="email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <div v-if="emailError" class="mt-1">
            <span class="text-sm text-red-600">{{ emailError }}</span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            v-model="newUser.role"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
            <option value="moderator">moderator</option>
          </select>
        </div>
        <div class="flex items-end">
          <button 
            type="submit"
            class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add User
          </button>
        </div>
      </div>
    </form>

    <!-- Users List -->
    <div class="space-y-4">
      <div v-if="loading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-2" />
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="!users.length" class="text-center py-6 bg-gray-50 rounded-lg">
        <p class="text-gray-500">No users found in this agency</p>
      </div>

      <div v-else v-for="user in users" :key="user.id" 
           class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
        <div>
          <p class="font-medium text-gray-900">{{ user }}</p>
          <div class="flex items-center mt-1">
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getRoleBadgeClass(user.role)"
            >
              {{ user.role }}
            </span>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="editUser(user)"
            class="p-2 text-gray-400 hover:text-indigo-600"
          >
            <PencilIcon class="h-5 w-5" />
          </button>
          <button 
            @click="removeUser(user.id)"
            class="p-2 text-gray-400 hover:text-red-600"
          >
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="editingUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium mb-4">Edit User Role</h3>
        <select
          v-model="editingUser.role"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-4"
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
          <option value="moderator">moderator</option>
        </select>
        <div class="flex justify-end space-x-3">
          <button 
            @click="editingUser = null"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button 
            @click="updateUser"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { 
  UsersIcon,
  TrashIcon,
  PencilIcon,
  ExclamationCircleIcon 
} from '@heroicons/vue/24/outline'
import { getUserRoles, assignUserRole, removeUserRoles } from '@/utils/database/roles/rolesAPI'
import { supabase } from '@/utils/database/supabase'

export default {
  name: 'AgencyUserManager',
  
  components: {
    UsersIcon,
    TrashIcon,
    PencilIcon,
    ExclamationCircleIcon
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)
    const editingUser = ref(null)
    const newUser = ref({
      email: '',
      role: 'agent'
    })
    const emailError = ref('')

    const getRoleBadgeClass = (role) => {
      const classes = {
        'admin': 'bg-red-100 text-red-800',
        'agent': 'bg-blue-100 text-blue-800',
        'moderator': 'bg-green-100 text-green-800'
      }
      return classes[role] || 'bg-gray-100 text-gray-800'
    }

    const fetchUsers = async () => {
      loading.value = true
      error.value = null
      try {
        const data = await getUserRoles(null, props.id)
        console.log(data);
        users.value = data.map(user => ({
          id: user.user_id,
          email: user.user_email,
          role: user.roles.type,
          roleName: user.roles.name
        }))
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const getUserByEmail = async (email) => {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (error) throw error
      return data
    }

    const addUser = async () => {
      try {
        loading.value = true
        emailError.value = ''

        // First check if user exists
        const userData = await getUserByEmail(newUser.value.email);
        console.log('user is',userData);
        if (!userData) {
          emailError.value = 'No user found with this email address'
          return
        }

        // Proceed with role assignment using user ID
        await assignUserRole(
          userData.id,
          props.id,
          newUser.value.role
        )
        
        await fetchUsers()
        newUser.value = { email: '', role: 'agent' }
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const removeUser = async (userId) => {
      if (!confirm('Are you sure you want to remove this user?')) return
      
      try {
        loading.value = true
        await removeUserRoles(userId, props.id)
        await fetchUsers()
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const editUser = (user) => {
      editingUser.value = { ...user }
    }

    const updateUser = async () => {
      try {
        loading.value = true
        await removeUserRoles(editingUser.value.id, props.id)
        await assignUserRole(
          editingUser.value.id,
          props.id,
          editingUser.value.role
        )
        await fetchUsers()
        editingUser.value = null
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      error,
      newUser,
      editingUser,
      getRoleBadgeClass,
      addUser,
      removeUser,
      editUser,
      updateUser,
      emailError
    }
  }
}
</script>