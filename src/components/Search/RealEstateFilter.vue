<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
    <div class="px-6 py-4 bg-black text-white">
      <h2 class="text-xl font-bold">Property Filter</h2>
      <div class="mt-2 flex space-x-4">
        <button
            @click="activeFilter = 'rent'"
            :class="[
            'px-4 py-2 rounded-lg transition-colors',
            activeFilter === 'rent' ? 'bg-white text-black' : 'bg-black text-white border border-white'
          ]"
        >
          For Rent
        </button>
        <button
            @click="activeFilter = 'sold'"
            :class="[
            'px-4 py-2 rounded-lg transition-colors',
            activeFilter === 'sold' ? 'bg-white text-black' : 'bg-black text-white border border-white'
          ]"
        >
          For Sale
        </button>
      </div>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Price Range Slider -->
        <div class="col-span-1 md:col-span-2 space-y-2">
          <label class="block text-sm font-medium text-gray-700">Price Range ({{currencySymbol}})</label>
          <div class="mt-6 px-2">
            <!-- Dual Range Slider Implementation -->
            <div class="relative w-full h-1 bg-gray-200 rounded">
              <!-- Filled area between the two handles -->
              <div
                  class="absolute h-1 bg-black rounded"
                  :style="{
                  left: `${(filters.minPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit) * 100}%`,
                  width: `${((filters.maxPrice - filters.minPrice) / (maxPriceLimit - minPriceLimit)) * 100}%`
                }"
              ></div>

              <!-- Min price handle -->
              <div
                  ref="minPriceHandle"
                  class="absolute w-6 h-6 -mt-2 -ml-3 bg-black rounded-full shadow border-2 border-white cursor-pointer"
                  :style="{left: `${(filters.minPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit) * 100}%`}"
                  @mousedown="startDrag($event, 'min')"
                  @touchstart="startDrag($event, 'min')"
                  style="margin-top: -10px;margin-left: -12px"></div>

              <!-- Max price handle -->
              <div
                  ref="maxPriceHandle"
                  class="absolute w-6 h-6 -mt-2 -ml-3 bg-black rounded-full shadow border-2 border-white cursor-pointer"
                  :style="{left: `${(filters.maxPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit) * 100}%`}"
                  @mousedown="startDrag($event, 'max')"
                  @touchstart="startDrag($event, 'max')"
                  style="margin-top: -10px;margin-left: -12px"></div>
            </div>

            <!-- Price labels -->
            <div class="flex justify-between mt-4">
              <div class="flex flex-col items-center">
                <input
                    type="number"
                    v-model.number="filters.minPrice"
                    @input="validatePriceInput('min')"
                    class="w-24 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <span class="text-xs text-gray-500 mt-1">Min</span>
              </div>
              <div class="flex flex-col items-center">
                <input
                    type="number"
                    v-model.number="filters.maxPrice"
                    @input="validatePriceInput('max')"
                    class="w-24 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <span class="text-xs text-gray-500 mt-1">Max</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Property Size -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Property Size (m²)</label>
          <div class="flex items-center space-x-2">
            <input
                type="number"
                v-model="filters.minSize"
                placeholder="Min"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span class="text-gray-500">to</span>
            <input
                type="number"
                v-model="filters.maxSize"
                placeholder="Max"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <!-- Bedrooms -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Bedrooms</label>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="num in 5"
                :key="`bedroom-${num}`"
                @click="toggleBedroom(num)"
                :class="[
                'px-3 py-1 rounded border transition-colors',
                filters.bedrooms.includes(num) ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
              ]"
            >
              {{ num === 5 ? '5+' : num }}
            </button>
            <button
                @click="filters.bedrooms = []"
                class="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white"
            >
              Any
            </button>
          </div>
        </div>

        <!-- Bathrooms -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Bathrooms</label>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="num in 4"
                :key="`bathroom-${num}`"
                @click="toggleBathroom(num)"
                :class="[
                'px-3 py-1 rounded border transition-colors',
                filters.bathrooms.includes(num) ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
              ]"
            >
              {{ num === 4 ? '4+' : num }}
            </button>
            <button
                @click="filters.bathrooms = []"
                class="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white"
            >
              Any
            </button>
          </div>
        </div>

        <!-- Property Type -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Property Type</label>
          <select
              v-model="filters.propertyType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <!-- Year Built -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Year Built</label>
          <div class="flex items-center space-x-2">
            <input
                type="number"
                v-model="filters.minYear"
                placeholder="From"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span class="text-gray-500">to</span>
            <input
                type="number"
                v-model="filters.maxYear"
                placeholder="To"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <!-- Amenities -->
      <div class="mt-6">
        <h3 class="text-md font-medium text-gray-700 mb-3">Amenities</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <label v-for="amenity in amenities" :key="amenity.id" class="flex items-center space-x-2">
            <input
                type="checkbox"
                v-model="filters.amenities"
                :value="amenity.id"
                class="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
            />
            <span class="text-sm text-gray-700">{{ amenity.name }}</span>
          </label>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="mt-8 flex justify-between">
        <button
            @click="resetFilters"
            class="px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-colors"
        >
          Reset Filters
        </button>
        <button
            @click="applyFilters"
            class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RealEstateFilter',
  data() {
    return {
      activeFilter: 'rent', // 'rent' or 'sold'
      filters: {
        minPrice: 100000,
        maxPrice: 500000,
        minSize: null,
        maxSize: null,
        bedrooms: [],
        bathrooms: [],
        propertyType: '',
        minYear: null,
        maxYear: null,
        amenities: []
      },
      minPriceLimit: 0,
      maxPriceLimit: 1000000,
      isDragging: false,
      currentHandle: null,
      amenities: [
        { id: 'parking', name: 'Parking' },
        { id: 'ac', name: 'Air Conditioning' },
        { id: 'furnished', name: 'Furnished' },
        { id: 'elevator', name: 'Elevator' },
        { id: 'balcony', name: 'Balcony' },
        { id: 'pool', name: 'Swimming Pool' },
        { id: 'gym', name: 'Gym' },
        { id: 'security', name: 'Security' },
        { id: 'garden', name: 'Garden' },
        { id: 'petFriendly', name: 'Pet Friendly' },
        { id: 'storage', name: 'Storage' },
        { id: 'laundry', name: 'Laundry' }
      ]
    };
  },
  computed: {
    currencySymbol() {
      return this.activeFilter === 'rent' ? '$' : '$';
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('touchmove', this.onDrag);
    window.addEventListener('touchend', this.stopDrag);

    // Initialize price limits based on type (rent/sold)
    this.updatePriceLimits();
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('touchmove', this.onDrag);
    window.removeEventListener('touchend', this.stopDrag);
  },
  watch: {
    activeFilter() {
      // Update price limits and reset values when switching between rent/sold
      this.updatePriceLimits();
    }
  },
  methods: {
    updatePriceLimits() {
      // Set different price ranges for rent vs. sold
      if (this.activeFilter === 'rent') {
        this.minPriceLimit = 0;
        this.maxPriceLimit = 10000;
        this.filters.minPrice = 500;
        this.filters.maxPrice = 3000;
      } else {
        this.minPriceLimit = 0;
        this.maxPriceLimit = 2000000;
        this.filters.minPrice = 100000;
        this.filters.maxPrice = 800000;
      }
    },
    startDrag(event, handle) {
      event.preventDefault();
      this.isDragging = true;
      this.currentHandle = handle;
    },
    stopDrag() {
      this.isDragging = false;
      this.currentHandle = null;
    },
    onDrag(event) {
      if (!this.isDragging) return;

      // Get mouse or touch position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // Get slider element and its position
      const slider = this.$refs[this.currentHandle === 'min' ? 'minPriceHandle' : 'maxPriceHandle'].parentNode;
      const rect = slider.getBoundingClientRect();

      // Calculate position percentage (0-100)
      let percentage = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));

      // Calculate price based on percentage and limits
      const price = Math.round(this.minPriceLimit + (percentage / 100) * (this.maxPriceLimit - this.minPriceLimit));

      // Update the appropriate price
      if (this.currentHandle === 'min') {
        this.filters.minPrice = Math.min(price, this.filters.maxPrice - 1);
      } else {
        this.filters.maxPrice = Math.max(price, this.filters.minPrice + 1);
      }
    },
    validatePriceInput(type) {
      // Ensure prices stay within limits and don't cross each other
      if (type === 'min') {
        this.filters.minPrice = Math.max(this.minPriceLimit, Math.min(this.filters.minPrice, this.filters.maxPrice - 1));
      } else {
        this.filters.maxPrice = Math.min(this.maxPriceLimit, Math.max(this.filters.maxPrice, this.filters.minPrice + 1));
      }
    },
    toggleBedroom(num) {
      if (this.filters.bedrooms.includes(num)) {
        this.filters.bedrooms = this.filters.bedrooms.filter(b => b !== num);
      } else {
        this.filters.bedrooms.push(num);
      }
    },
    toggleBathroom(num) {
      if (this.filters.bathrooms.includes(num)) {
        this.filters.bathrooms = this.filters.bathrooms.filter(b => b !== num);
      } else {
        this.filters.bathrooms.push(num);
      }
    },
    resetFilters() {
      // Reset filters but keep price ranges according to current filter type
      this.filters = {
        minPrice: this.activeFilter === 'rent' ? 500 : 100000,
        maxPrice: this.activeFilter === 'rent' ? 3000 : 800000,
        minSize: null,
        maxSize: null,
        bedrooms: [],
        bathrooms: [],
        propertyType: '',
        minYear: null,
        maxYear: null,
        amenities: []
      };
    },
    applyFilters() {
      // Emit an event with the filter data
      const filterData = {
        type: this.activeFilter,
        ...this.filters
      };
      this.$emit('filter-applied', filterData);
      console.log('Filters applied:', filterData);
    }
  }
};
</script>