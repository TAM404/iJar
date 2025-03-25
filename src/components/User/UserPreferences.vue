<template>
  <div class="mb-12">
    <h2 class="text-2xl font-bold mb-6">Your Preferences</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold mb-4">Property Preferences</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Property Types</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="type in user.preferences.propertyTypes" :key="type" class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {{ type }}
              </span>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Price Range</h4>
            <p>{{ formatCurrency(user.preferences.priceRangeMin) }} - {{ formatCurrency(user.preferences.priceRangeMax) }}</p>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Bedrooms</h4>
            <p>{{ user.preferences.bedrooms }}+</p>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Bathrooms</h4>
            <p>{{ user.preferences.bathrooms }}+</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold mb-4">Location Preferences</h3>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Preferred Areas</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="area in user.preferences.areas" :key="area" class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {{ area }}
              </span>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Preferred Amenities</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="amenity in user.preferences.amenities" :key="amenity" class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {{ amenity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPreferences',
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