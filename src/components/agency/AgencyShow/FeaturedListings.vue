<template>
  <section class="bg-gray-50 rounded-lg shadow-md p-6 mb-8 mt-7">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
      <h2 class="text-2xl font-bold">Featured Listings</h2>
      <a href="#" class="text-black font-medium hover:underline">View All</a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(property, index) in listings" :key="index"
           class="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
        <div class="relative">
          <img :src="property.image || '/api/placeholder/300/200'" alt="Property" class="w-full h-48 object-cover" />
          <div class="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">{{ property.status }}</div>
          <div class="absolute bottom-2 left-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">{{ property.type }}</div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg">{{ property.title }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ property.location }}</p>
          <div class="flex justify-between items-center">
            <span class="font-bold text-lg">${{ property.price.toLocaleString() }}</span>
            <div class="flex text-sm text-gray-500 space-x-2">
              <span>{{ property.bedrooms }} bd</span>
              <span>{{ property.bathrooms }} ba</span>
              <span>{{ property.size }} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturedListings',
  props: {
    listings: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>