<template>
  <div class="space-y-8 animate-fade-in">
    <h2 class="text-2xl font-medium text-gray-900 mb-6 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/512/5720/5720539.png" alt="Icon" class="h-6 w-6 mr-2" />
      Basic Agency Information
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Agency Name</label>
        <input
            v-model="agency.name"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Enter agency name"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Logo URL</label>
        <input
            v-model="agency.logoUrl"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Enter logo URL"
        />
        <div v-if="agency.logoUrl" class="mt-2">
          <p class="text-xs text-gray-500 mb-1">Logo Preview:</p>
          <img :src="agency.logoUrl" class="h-10 object-contain" alt="Agency logo" @error="handleImageError" />
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-sm text-gray-700 font-medium">Agency Description</label>
      <textarea
          v-model="agency.description"
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm resize-none"
          placeholder="Provide a comprehensive description of your agency"
      ></textarea>
      <p class="text-xs text-gray-500">{{ characterCount }}/500 characters</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BasicAgencyInfo',
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  computed: {
    characterCount() {
      return this.agency.description ? this.agency.description.length : 0;
    }
  },
  methods: {
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/150x50?text=Invalid+URL';
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

input, textarea {
  transition: all 0.2s ease;
}
</style>