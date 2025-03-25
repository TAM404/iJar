<template>
  <div class="mb-12">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Favorite Agencies</h2>
      <button @click="showAgencySelector = true" class="bg-black text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-gray-800 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Favorite
      </button>
    </div>

    <!-- Favorite Agencies Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="agency in user.favoriteAgencies"
          :key="agency.id"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition group"
      >
        <div class="flex">
          <div class="relative">
            <img :src="agency.logo" :alt="agency.name" class="w-24 h-28 object-cover" />
            <div class="absolute bottom-0 left-0 w-full p-1 bg-black bg-opacity-60 text-xs text-white text-center">
              {{ agency.propertiesCount }} properties
            </div>
          </div>

          <div class="p-4 flex-grow relative">
            <button @click="removeFromFavorites(agency.id)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="font-semibold text-lg group-hover:text-black transition">{{ agency.name }}</h3>
            <div class="flex items-center text-sm text-gray-600 mt-1">
              <div class="flex items-center">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" :class="[
                  'h-4 w-4',
                  i <= agency.rating ? 'text-black' : 'text-gray-300'
                ]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1">{{ agency.rating }} / 5</span>
              </div>
            </div>

            <button class="mt-2 text-xs font-medium px-3 py-1 bg-black bg-opacity-5 hover:bg-opacity-10 rounded-full text-black transition">
              View Properties
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="user.favoriteAgencies.length === 0" class="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <h3 class="mt-4 font-medium text-gray-800">No Favorite Agencies Yet</h3>
      <p class="mt-1 text-sm text-gray-500">Add agencies you like to your favorites for quick access</p>
      <button @click="showAgencySelector = true" class="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
        Add Your First Favorite
      </button>
    </div>

    <!-- Agency Selector Modal -->
    <div v-if="showAgencySelector" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-lg max-h-[80vh] overflow-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Add Agency to Favorites</h3>
          <button @click="showAgencySelector = false" class="text-gray-500 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search agencies..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>

        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div
              v-for="agency in filteredAgencies"
              :key="agency.id"
              class="flex items-center justify-between p-3 border border-gray-100
            rounded-lg hover:bg-gray-50 cursor-pointer"
              @click="addToFavorites(agency)"
          >
            <div class="flex items-center">
              <img :src="agency.logo" :alt="agency.name" class="w-12 h-12 object-cover rounded" />
              <div class="ml-3">
                <h4 class="font-medium">{{ agency.name }}</h4>
                <div class="flex items-center text-sm text-gray-600">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" :class="[
                    'h-3 w-3',
                    i <= agency.rating ? 'text-black' : 'text-gray-300'
                  ]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-1 text-xs">{{ agency.propertiesCount }} properties</span>
                </div>
              </div>
            </div>

            <button
                :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                isFavorite(agency.id) ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'
              ]"
                :disabled="isFavorite(agency.id)"
            >
              {{ isFavorite(agency.id) ? 'Added' : 'Add' }}
            </button>
          </div>
        </div>

        <div v-if="filteredAgencies.length === 0" class="py-8 text-center text-gray-500">
          No agencies found matching your search.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAgencies',
  props: {
    user: {
      type: Object,
      required: true
    },
    allAgencies: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showAgencySelector: false,
      searchQuery: '',
      // Sample data for demonstration purposes - this would normally come from an API
      availableAgencies: [
        { id: 101, name: "Modern Realty", logo: "/api/placeholder/100/100", rating: 4.8, propertiesCount: 156 },
        { id: 102, name: "City Homes", logo: "/api/placeholder/100/100", rating: 4.5, propertiesCount: 89 },
        { id: 103, name: "Luxury Estates", logo: "/api/placeholder/100/100", rating: 4.9, propertiesCount: 42 },
        { id: 104, name: "Urban Living", logo: "/api/placeholder/100/100", rating: 4.2, propertiesCount: 213 },
        { id: 105, name: "Coastal Properties", logo: "/api/placeholder/100/100", rating: 4.7, propertiesCount: 78 }
      ]
    };
  },
  computed: {
    filteredAgencies() {
      // Filter agencies based on search query and exclude already favorited ones
      const query = this.searchQuery.toLowerCase();
      return (this.allAgencies.length ? this.allAgencies : this.availableAgencies).filter(agency =>
          agency.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addToFavorites(agency) {
      if (this.isFavorite(agency.id)) return;

      // In a real app, you would make an API call here
      this.$emit('add-favorite', agency);

      // For demo purposes - directly update the user object
      // NOTE: In a real app, this would be handled by the parent component
      if (!this.user.favoriteAgencies) {
        this.$set(this.user, 'favoriteAgencies', []);
      }
      this.user.favoriteAgencies.push(agency);

      // Close the modal after adding
      this.showAgencySelector = false;
    },
    removeFromFavorites(agencyId) {
      // In a real app, you would make an API call here
      this.$emit('remove-favorite', agencyId);

      // For demo purposes - directly update the user object
      // NOTE: In a real app, this would be handled by the parent component
      const index = this.user.favoriteAgencies.findIndex(a => a.id === agencyId);
      if (index !== -1) {
        this.user.favoriteAgencies.splice(index, 1);
      }
    },
    isFavorite(agencyId) {
      return this.user.favoriteAgencies.some(agency => agency.id === agencyId);
    }
  }
};
</script>

<style scoped>
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Smooth transitions */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>