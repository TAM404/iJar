<template>
  <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6 mt-7">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
      <h2 class="text-xl font-bold">Our Team</h2>
      <a href="#" class="text-black font-medium hover:underline text-sm">View All</a>
    </div>
    <div class="flex gap-5 justify-center">
      <div
          v-for="(agent, index) in agents"
          :key="index"
          class="flex items-center p-3 border border-gray-200 rounded bg-white hover:shadow-md transition"
      >
        <img :src="agent.photo || '/api/placeholder/64/64'" alt="Agent" class="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h3 class="font-semibold">{{ agent.name }}</h3>
          <p class="text-gray-600 text-sm">{{ agent.position }}</p>
          <div class="flex space-x-2 mt-1">
            <button class="text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button class="text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMembers',
  props: {
    agents: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>