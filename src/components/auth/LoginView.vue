<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { validateEmail, validatePassword } from '@/utils/validators'

const router = useRouter()
const { login, isLoading, error: authError } = useAuth()

const credentials = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: null,
  password: null
})

const validateForm = () => {
  errors.value.email = validateEmail(credentials.value.email)
  errors.value.password = validatePassword(credentials.value.password)
  return !errors.value.email && !errors.value.password
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  try {
    await login(credentials.value)
    router.push({ name: 'Home' })
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>

<template>
  <div class="auth-page">
    <h1>Login to Your Account</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input 
          v-model="credentials.email" 
          type="email" 
          :class="{ 'error': errors.email }"
          @blur="validateForm"
        >
        <span class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="credentials.password"
          type="password"
          :class="{ 'error': errors.password }"
          @blur="validateForm"
        >
        <span class="error-message">{{ errors.password }}</span>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      
      <p class="auth-link">
        Don't have an account? 
        <router-link :to="{ name: 'Signup' }">Sign up</router-link>
      </p>

      <div v-if="authError" class="global-error">
        {{ authError }}
      </div>
    </form>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-link {
  margin-top: 1rem;
  text-align: center;
}

.global-error {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #ffebee;
  color: #ff4444;
  border-radius: 4px;
}
</style>