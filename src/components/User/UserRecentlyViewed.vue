<template>
  <div class="mb-12">
    <h2 class="text-2xl font-bold mb-6">Recently Viewed</h2>
    <div class="space-y-4">
      <div v-for="property in user.recentlyViewed" :key="property.id" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex">
        <div class="w-32 h-28 flex-shrink-0">
          <img :src="property.image" :alt="property.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-4 flex-grow">
          <div class="flex justify-between mb-1">
            <span class="font-semibold text-gray-800">{{ formatCurrency(property.price) }}</span>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-gray-600">{{ property.location }}</span>
            </div>
          </div>
          <h3 class="font-semibold mb-2 truncate">{{ property.title }}</h3>
          <div class="flex text-gray-600 text-sm space-x-4">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{{ property.type }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <span>{{ property.beds }} bd</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <span>{{ property.baths }} ba</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRecentlyViewed',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>