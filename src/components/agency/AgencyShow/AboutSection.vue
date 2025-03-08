<template>
  <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
    <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">About Us</h2>
    <p class="text-gray-700 leading-relaxed text-lg mb-8">{{ agency.description }}</p>

    <div class="mt-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <BuildingOfficeIcon class="h-8 w-8 text-indigo-600 mr-3" />
        Our Premium Services
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="service in agency.services" :key="service"
             class="bg-gray-50 rounded-lg p-4 flex items-center transform transition-all duration-300 hover:bg-indigo-50 hover:translate-x-1">
          <CheckCircleIcon class="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
          <span class="text-gray-800 font-medium">{{ service }}</span>
        </div>
      </div>
    </div>

    <!-- Awards Section -->
    <div class="mt-12">
      <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <TrophyIcon class="h-8 w-8 text-amber-500 mr-3" />
        Awards & Recognition
      </h3>
      <div class="flex flex-wrap gap-4">
        <div v-for="award in agency.awards" :key="award.year"
             class="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3 border-l-4 border-amber-500">
          <div class="font-semibold text-gray-900">{{ award.title }}</div>
          <div class="text-sm text-gray-600">{{ award.year }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BuildingOfficeIcon, CheckCircleIcon, TrophyIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'AboutSection',
  components: {
    BuildingOfficeIcon,
    CheckCircleIcon,
    TrophyIcon
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>