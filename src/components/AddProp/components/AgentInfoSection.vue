<!-- AgentInformation.vue -->
<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/1067/1067566.png" alt="Location Icon" class="h-6 w-6 mr-2" />Agent Information</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="agentName" class="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
        <input
            type="text"
            id="agentName"
            v-model="agent.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label for="agentPhone" class="block text-sm font-medium text-gray-700 mb-1">Agent Phone</label>
        <input
            type="tel"
            id="agentPhone"
            v-model="agent.contact.phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label for="agentEmail" class="block text-sm font-medium text-gray-700 mb-1">Agent Email</label>
        <input
            type="email"
            id="agentEmail"
            v-model="agent.contact.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentInfoSection',
  props: {
    agent: {
      type: Object,
      required: true
    }
  },
  watch: {
    agent: {
      handler(newValue) {
        this.$emit('update:agent', newValue);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>