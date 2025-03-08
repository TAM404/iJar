<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-4xl font-bold text-red-600">404</h1>
    <p class="text-lg text-gray-700">Oops! The page you're looking for doesn't exist.</p>
    
    <!-- User Information Section -->
    <div v-if="userStore.user" class="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Currently Logged In As:</h2>
      <div class="text-left space-y-2">
        <p><span class="font-medium">Email:</span> {{ userStore.user.email }}</p>
        <p><span class="font-medium">Name:</span> {{ userStore.user.name || 'Not set' }}</p>
        <p><span class="font-medium">Phone:</span> {{ userStore.user.phonenumber || 'Not set' }}</p>
        <p><span class="font-medium">Birthday:</span> {{ formatDate(userStore.user.birthday) }}</p>
      </div>
    </div>

    <router-link to="/" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
      Go Home
    </router-link>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

// Helper function to format the date
const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>
