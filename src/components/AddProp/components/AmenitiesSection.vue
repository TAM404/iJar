

// components/AmenitiesSection.vue
<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/5091/5091789.png" alt="Location Icon" class="h-6 w-6 mr-2" />Amenities</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="flex items-center">
        <input
            type="checkbox"
            id="elevator"
            :checked="amenities.elevator"
            @change="updateAmenity('elevator', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="elevator" class="ml-2 block text-sm text-gray-700">Elevator</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="parking"
            :checked="amenities.parking"
            @change="updateAmenity('parking', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="parking" class="ml-2 block text-sm text-gray-700">Parking</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="pool"
            :checked="amenities.pool"
            @change="updateAmenity('pool', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="pool" class="ml-2 block text-sm text-gray-700">Pool</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="gym"
            :checked="amenities.gym"
            @change="updateAmenity('gym', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="gym" class="ml-2 block text-sm text-gray-700">Gym</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="security"
            :checked="amenities.security"
            @change="updateAmenity('security', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="security" class="ml-2 block text-sm text-gray-700">Security</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="smartHome"
            :checked="amenities.smart_home"
            @change="updateAmenity('smart_home', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="smartHome" class="ml-2 block text-sm text-gray-700">Smart Home</label>
      </div>

      <div>
        <label for="heating" class="block text-sm font-medium text-gray-700 mb-1">Heating</label>
        <select
            id="heating"
            :value="amenities.heating"
            @change="updateAmenity('heating', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">None</option>
          <option value="central">Central</option>
          <option value="floor">Floor</option>
          <option value="electric">Electric</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div>
        <label for="cooling" class="block text-sm font-medium text-gray-700 mb-1">Cooling</label>
        <select
            id="cooling"
            :value="amenities.cooling"
            @change="updateAmenity('cooling', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">None</option>
          <option value="air conditioning">Air Conditioning</option>
          <option value="central">Central</option>
          <option value="fans">Fans</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmenitiesSection',
  props: {
    amenities: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateAmenity(field, value) {
      const updatedAmenities = { ...this.amenities, [field]: value };
      this.$emit('update:amenities', updatedAmenities);
    }
  }
};
</script>
