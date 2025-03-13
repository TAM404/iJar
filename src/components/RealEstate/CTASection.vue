<template>
  <div class="bg-indigo-700 py-12 mt-12" style="    background: rgb(62, 81, 144);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-extrabold text-white mb-6">Ready to find your dream property?</h2>
      <p class="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">Let our team of expert agents guide you through the entire process, from finding the perfect property to closing the deal.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-xl text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300">
          Schedule a Consultation
        </button>
        <button class="inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-lg shadow-xl text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300">
          View Properties
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CTASection'
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>