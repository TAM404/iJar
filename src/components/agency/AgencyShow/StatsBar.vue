<template>
  <div class="bg-white shadow-md relative z-10" style="font-family: kanit,serif">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="flex flex-col" >
          <span class="text-indigo-600 silver text-4xl font-bold">{{ agency.yearFounded }}</span>
          <span class="text-gray-600 text-sm mt-1">Established</span>
        </div>
        <div class="flex flex-col">
          <span class="text-indigo-600 silver text-4xl font-bold">{{ agency.propertiesSold }}+</span>
          <span class="text-gray-600 text-sm mt-1">Properties Sold</span>
        </div>
        <div class="flex flex-col">
          <span class="text-indigo-600 silver text-4xl font-bold">{{ agency.agentsCount }}</span>
          <span class="text-gray-600 text-sm mt-1">Expert Agents</span>
        </div>
        <div class="flex flex-col">
          <span class="text-indigo-600 silver text-4xl font-bold">{{ agency.clientSatisfaction }}%</span>
          <span class="text-gray-600 text-sm mt-1">Client Satisfaction</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatsBar',
  props: {
    agency: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
.silver {
  color: #94989d;
}
/* Add any additional styles if needed */
</style>