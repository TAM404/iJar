<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

      <!-- Step 1: Email and Password -->
      <form @submit.prevent="nextStep" v-if="currentStep === 1">
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
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
            minlength="6"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.password}"
          />
          <span v-if="errors.password" class="text-red-500 text-xs mt-1">
            {{ errors.password }}
          </span>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.confirmPassword}"
          />
          <span v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
            {{ errors.confirmPassword }}
          </span>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>

        <!-- Next Button -->
        <div class="flex justify-between items-center">
          <button 
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Next' }}
          </button>
        </div>

        <!-- Login Link -->
        <div class="mt-4 text-center text-sm">
          <router-link to="/login" class="text-blue-500 hover:text-blue-700">
            Already have an account? Login
          </router-link>
        </div>
      </form>

      <!-- Step 2: User Information -->
      <form @submit.prevent="onSubmit" v-if="currentStep === 2">
        <!-- Name Field -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            id="name"
            v-model="userData.name"
            required
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.name}"
          />
          <span v-if="errors.name" class="text-red-500 text-xs mt-1">
            {{ errors.name }}
          </span>
        </div>

        <!-- Phone Number Field -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            v-model="userData.phonenumber"
            required
            pattern="[0-9]{10}"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.phone}"
          />
          <span v-if="errors.phone" class="text-red-500 text-xs mt-1">
            {{ errors.phone }}
          </span>
        </div>

        <!-- Birthday Field -->
        <div class="mb-6">
          <label for="birthday" class="block text-sm font-medium text-gray-700">Birthday:</label>
          <input
            type="date"
            id="birthday"
            v-model="userData.birthday"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Submit and Back Buttons -->
        <div class="flex gap-4">
          <button 
            type="button"
            @click="currentStep = 1"
            class="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Back
          </button>
          <button 
            type="submit"
            class="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Loading...' : 'Submit' }}
          </button>
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
const currentStep = ref(1);

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const userData = reactive({
  name: '',
  phonenumber: '',
  birthday: null,
  locations: [],
  favorites: []
});

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: ''
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const nextStep = async () => {
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
  if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    return;
  }

  // Validate confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    return;
  }

  currentStep.value = 2;
};

const onSubmit = async () => {
  try {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '');

    // Validate name
    if (!userData.name) {
      errors.name = 'Full name is required';
      return;
    }

    // Validate phone
    if (!userData.phonenumber) {
      errors.phone = 'Phone number is required';
      return;
    }
    if (!/^[0-9]{10}$/.test(userData.phonenumber)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      return;
    }

    isLoading.value = true;
    error.value = '';
    console.log('Submitting form:', formData, userData);
    const response = await userStore.signUp({
      email: formData.email,
      password: formData.password,
      userData
    });

    if (response?.error) {
      error.value = response.error;
      return;
    }

    await router.push('/dashboard');
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.message || 'Registration failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles if necessary, but Tailwind handles most of it */
</style>
