<template>
  <div class="flex justify-center items-center min-h-screen p-5 bg-gray-100" style="font-family: Poppins,serif">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="mb-6">
        <!-- Email -->
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-800">Email Address</label>
          <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="john.doe@example.com"
              :class="{'border-red-500': errors.email, 'border-gray-300': !errors.email, 'focus:border-indigo-800 focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20': true}"
              class="w-full px-4 py-3 rounded-md border outline-none text-gray-700 transition duration-300"
              @focus="clearError('email')"
          >
          <span v-if="errors.email" class="text-xs text-red-500 mt-1 block">{{ errors.email }}</span>
        </div>

        <!-- Password -->
        <div class="mb-5">
          <div class="flex justify-between items-center mb-2">
            <label for="password" class="text-sm font-medium text-gray-800">Password</label>
            <a href="#" class="text-xs text-indigo-800 hover:underline font-medium">Forgot password?</a>
          </div>
          <div class="relative">
            <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :class="{'border-red-500': errors.password, 'border-gray-300': !errors.password, 'focus:border-indigo-800 focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20': true}"
                class="w-full px-4 py-3 rounded-md border outline-none text-gray-700 transition duration-300 pr-20"
                @focus="clearError('password')"
            >
            <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs uppercase font-semibold tracking-wide text-gray-500 hover:text-indigo-800 transition"
                @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <span v-if="errors.password" class="text-xs text-red-500 mt-1 block">{{ errors.password }}</span>
        </div>

        <!-- Remember Me -->
        <div class="mb-6 flex items-center">
          <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="mr-3 text-indigo-800 focus:ring-indigo-800"
          >
          <label for="remember" class="text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <span v-if="errors.error" class="text-xs text-red-500 mt-1 block">{{ errors.error }}</span>
        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full py-3 px-4 text-white font-semibold rounded-md transition duration-300 flex justify-center items-center"
            style="background-color: rgb(62, 81, 144);"
        >
          <span v-if="!loading">Sign In</span>
          <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <!-- Or Divider -->
      <div class="relative flex py-4 items-center mb-5">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="flex-shrink mx-4 text-sm text-gray-500">or sign in with</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <!-- Google Sign In -->
      <div class="flex justify-center mb-6">
        <button class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300 w-full max-w-xs text-gray-700 font-medium">
          <img src="https://cdn-icons-png.flaticon.com/512/281/281747.png" alt="google icon" style="width:18px; height:18px">
          Google
        </button>
      </div>

      <!-- Signup Link -->
      <p class="text-center text-sm text-gray-600">
        Don't have an account? <router-link to="/signup" class="text-indigo-800 font-medium hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>

import { useUserStore } from '@/stores/userStore';
import router from '@/router';


export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      errors: {
        email: '',
        password: '',
        error:'',
      },
      showPassword: false,
      loading: false
    }
  },
  methods: {
    handleSubmit() {
      // Reset errors
      this.errors = {
        email: '',
        password: ''
      };

      // Validate form
      let isValid = true;

      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!this.form.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      }

      if (isValid) {
        // Submit form
        this.loading = true;
        this.login();
      }
    },
    async login(){
      const userStore = useUserStore();
        try {
      const response = await userStore.signIn(this.form.email, this.form.password,this.form.remember);

      if (response?.error) {
        this.errors.error = response.error;
        return;
      }
      await router.push('/userProfile');
      this.errors.error=  response;
    } catch (err) {
      console.error('Login error:', err);
      this.errors.error = err.message || 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
    },
    clearError(field) {
      this.errors[field] = '';
    }
  }
}
</script>