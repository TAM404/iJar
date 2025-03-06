<template>
  <div class="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl" >
    <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center border-b border-gray-200 pb-3" style="margin-top: 12px;">
      <MapPinIcon class="h-6 w-6 text-red-500 mr-2" />
      Location
    </h2>
    <div class="mb-6">
      <p class="text-gray-700 mb-2">
        {{ agency.address }}
      </p>
      <p class="text-gray-600 flex items-center">
        <ClockIcon class="h-5 w-5 text-gray-500 mr-2" />
        Open: {{ agency.hours }}
      </p>
    </div>
    <!-- Map Component -->
    <div class="h-64 rounded-xl overflow-hidden shadow-md">
      <AgencyMap
          :latitude="agency.location.lat"
          :longitude="agency.location.lng"
      />
    </div>
    <a href="#" class="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center justify-center font-medium">
      <ArrowTopRightOnSquareIcon class="h-4 w-4 mr-1" />
      Get Directions
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { MapPinIcon, ClockIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import AgencyMap from './AgencyMap.vue'

export default defineComponent({
  name: 'LocationCard',
  components: {
    MapPinIcon,
    ClockIcon,
    ArrowTopRightOnSquareIcon,
    AgencyMap
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