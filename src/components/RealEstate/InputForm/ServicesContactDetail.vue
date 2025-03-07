<template>
  <div class="space-y-8 animate-fade-in">
    <h2 class="text-2xl font-medium text-gray-900 mb-6 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/512/2600/2600354.png" alt="Icon" class="h-6 w-6 mr-2" />
      Services and Contact Details
    </h2>

    <div class="space-y-4">
      <label class="block text-sm text-gray-700 font-medium">Agency Services</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
            v-for="(service, index) in serviceOptions"
            :key="index"
            class="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          <div class="relative">
            <input
                type="checkbox"
                :id="'service-' + index"
                :value="service"
                v-model="agencyServices"
                class="opacity-0 absolute h-5 w-5 cursor-pointer"
                @change="updateServices"
            />
            <div class="h-5 w-5 border border-gray-300 rounded flex items-center justify-center bg-white">
              <svg
                  v-show="agencyServices.includes(service)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <label :for="'service-' + index" class="text-sm text-gray-700 cursor-pointer">{{ service }}</label>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <label class="block text-sm text-gray-700 font-medium">Location & Hours</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-xs text-gray-500">Address</label>
          <input
              v-model="agency.address"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
              placeholder="Enter full address"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs text-gray-500">Business Hours</label>
          <input
              v-model="agency.hours"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
              placeholder="e.g. Mon-Fri 9AM-5PM, Sat 10AM-2PM"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <label class="block text-sm text-gray-700 font-medium">Contact Information</label>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs text-gray-500">Phone Number</label>
            <span class="text-xs text-gray-400">Required</span>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
                v-model="agency.phone"
                type="tel"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
                placeholder="(123) 456-7890"
            />
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs text-gray-500">Email</label>
            <span class="text-xs text-gray-400">Required</span>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
                v-model="agency.email"
                type="email"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
                placeholder="contact@youragency.com"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-xs text-gray-500">Website</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <input
                v-model="agency.website"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
                placeholder="https://youragency.com"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesContactDetails',
  props: {
    agency: {
      type: Object,
      required: true
    },
    serviceOptions: {
      type: Array,
      default: () => [
        'Residential Sales',
        'Commercial Sales',
        'Property Management',
        'Rentals',
        'Land Sales',
        'Luxury Properties',
        'New Developments',
        'Vacation Homes'
      ]
    }
  },
  data() {
    return {
      agencyServices: []
    };
  },
  created() {
    // Initialize services from the agency object or empty array
    this.agencyServices = this.agency.services || [];

    // Ensure agency.services exists
    if (!this.agency.services) {
      this.$set(this.agency, 'services', []);
    }
  },
  methods: {
    updateServices() {
      // Update the agency object with the selected services
      this.agency.services = [...this.agencyServices];
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

input, button {
  transition: all 0.2s ease;
}

/* Custom checkbox styling */
input[type="checkbox"] + div {
  transition: all 0.2s ease;
}

input[type="checkbox"]:focus + div {
  border-color: black;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"]:checked + div {
  background-color: white;
  border-color: black;
}
</style>