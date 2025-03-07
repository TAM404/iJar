import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword } from '@/utils/validators'

export const useAuth = () => {
  const router = useRouter()
  const user = ref(null)
  const isLoading = ref(true)
  const error = ref(null)

  // Initialize auth state
  const initAuth = async () => {
    try {
      const { data: { user: sbUser }, error: sbError } = await supabase.auth.getUser()
      user.value = sbUser
      error.value = sbError?.message || null
    } finally {
      isLoading.value = false
    }
  }

  // Auth state listener
  const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      user.value = session?.user ?? null
    }
  )

  // Profile management
  const updateProfile = async ({ data, email }) => {
    try {
      isLoading.value = true
      const updates = {
        ...data,
        updated_at: new Date().toISOString()
      }

      const { error: updateError } = await supabase.auth.updateUser({
        email: email || user.value.email,
        data: updates
      })

      if (updateError) throw updateError
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Password reset
  const resetPassword = async (email) => {
    try {
      isLoading.value = true
      const { error: sbError } = await supabase.auth.resetPasswordForEmail(email)
      if (sbError) throw sbError
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Unsubscribe from auth listener
  const unsubscribe = () => {
    if (authListener) authListener.unsubscribe()
  }

  return {
    user,
    isLoggedIn: computed(() => !!user.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    login,
    signUp,
    logout,
    updateProfile,
    resetPassword,
    unsubscribe
  }
}