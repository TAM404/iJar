

// components/PropertyDetailsSection.vue
<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/17616/17616590.png" alt="Location Icon" class="h-6 w-6 mr-2" />Property Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="size" class="block text-sm font-medium text-gray-700 mb-1">Size (sqm)</label>
        <input
            type="number"
            id="size"
            :value="propertyDetails.size.area"
            @input="updateDetails('size', { area: Number($event.target.value), unit: 'sqm' })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
        />
      </div>

      <div>
        <label for="yearBuilt" class="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
        <input
            type="number"
            id="yearBuilt"
            :value="propertyDetails.year_built"
            @input="updateDetails('year_built', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="1900"
            :max="new Date().getFullYear()"
        />
      </div>

      <div>
        <label for="floor" class="block text-sm font-medium text-gray-700 mb-1">Floor</label>
        <input
            type="number"
            id="floor"
            :value="propertyDetails.floor"
            @input="updateDetails('floor', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label for="totalFloors" class="block text-sm font-medium text-gray-700 mb-1">Total Floors</label>
        <input
            type="number"
            id="totalFloors"
            :value="propertyDetails.total_floors"
            @input="updateDetails('total_floors', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label for="bedrooms" class="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
        <input
            type="number"
            id="bedrooms"
            :value="propertyDetails.rooms.bedrooms"
            @input="updateRooms('bedrooms', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
        />
      </div>

      <div>
        <label for="bathrooms" class="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
        <input
            type="number"
            id="bathrooms"
            :value="propertyDetails.rooms.bathrooms"
            @input="updateRooms('bathrooms', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
            min="0"
        />
      </div>

      <div>
        <label for="livingRooms" class="block text-sm font-medium text-gray-700 mb-1">Living Rooms</label>
        <input
            type="number"
            id="livingRooms"
            :value="propertyDetails.rooms.living_rooms"
            @input="updateRooms('living_rooms', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            min="0"
        />
      </div>

      <div class="flex items-center mt-6">
        <input
            type="checkbox"
            id="furnished"
            :checked="propertyDetails.furnished"
            @change="updateDetails('furnished', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="furnished" class="ml-2 block text-sm text-gray-700">Furnished</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyDetailsSection',
  props: {
    propertyDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateDetails(field, value) {
      const updatedDetails = { ...this.propertyDetails };
      updatedDetails[field] = value;
      this.$emit('update:propertyDetails', updatedDetails);
    },
    updateRooms(field, value) {
      const updatedDetails = { ...this.propertyDetails };
      updatedDetails.rooms = { ...updatedDetails.rooms, [field]: value };
      this.$emit('update:propertyDetails', updatedDetails);
    }
  }
};
</script>