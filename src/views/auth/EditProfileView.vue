<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { validateEmail, validateRequired } from '@/utils/validators'

const { user, updateProfile, isLoading, error: authError } = useAuth()

const profile = ref({
  full_name: '',
  email: '',
  avatar_url: ''
})

const errors = ref({
  full_name: null,
  email: null
})

onMounted(() => {
  if (user.value) {
    profile.value = {
      full_name: user.value.user_metadata.full_name || '',
      email: user.value.email || '',
      avatar_url: user.value.user_metadata.avatar_url || ''
    }
  }
})

const validateForm = () => {
  errors.value.full_name = validateRequired(profile.value.full_name, 'Full Name')
  errors.value.email = validateEmail(profile.value.email)
  return !errors.value.full_name && !errors.value.email
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    await updateProfile({
      data: {
        full_name: profile.value.full_name,
        avatar_url: profile.value.avatar_url
      },
      email: profile.value.email
    })
  } catch (err) {
    console.error('Profile update failed:', err)
  }
}
</script>

<template>
  <div class="auth-page">
    <h1>Edit Profile</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Full Name</label>
        <input
          v-model="profile.full_name"
          type="text"
          :class="{ 'error': errors.full_name }"
        >
        <span class="error-message">{{ errors.full_name }}</span>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          v-model="profile.email"
          type="email"
          :class="{ 'error': errors.email }"
        >
        <span class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Avatar URL</label>
        <input
          v-model="profile.avatar_url"
          type="url"
          placeholder="https://example.com/avatar.jpg"
        >
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Save Changes' }}
      </button>

      <div v-if="authError" class="global-error">
        {{ authError }}
      </div>
    </form>
  </div>
</template>