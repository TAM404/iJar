<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <form @submit.prevent="onSubmit">
        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.email}"
          />
          <span v-if="errors.email" class="text-red-500 text-xs mt-1">
            {{ errors.email }}
          </span>
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.password}"
          />
          <span v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </span>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>

        <!-- Submit Button -->
        <div class="flex justify-between items-center">
          <button 
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Login' }}
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-4 text-center text-sm">
          <router-link to="/signup" class="text-blue-500 hover:text-blue-700">
            Don't have an account? Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const error = ref('');
const isLoading = ref(false);

const formData = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const onSubmit = async () => {
  try {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '');

    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
      return;
    }
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      return;
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
      return;
    }

    isLoading.value = true;
    error.value = '';

    const response = await userStore.signIn(formData.email, formData.password);

    if (response?.error) {
      error.value = response.error;
      return;
    }

    await router.push('/dashboard');
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.message || 'Login failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles if necessary, but Tailwind handles most of it */
</style>
