<template>
  <div class="h-full overflow-y-auto space-y-8  animate-fade-in">
    <h2 class="text-2xl font-medium text-gray-900 mb-6 border-b">
      <img src="https://cdn-icons-png.flaticon.com/512/11554/11554180.png " alt="Location Icon" class="h-6 w-6 mr-2" />
      House Location
    </h2>



    <!-- Search Bar Section -->
    <div class="space-y-2">
      <label class="block text-sm text-gray-700 font-medium">Full Address Search</label>
      <input
          v-model="fullAddress"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
          placeholder="Enter complete address to search"
          @keyup.enter="searchLocation"
      />
      <div class="flex justify-end mt-2">
        <button
            @click="searchLocation"
            class="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>

    <!-- Map Section -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <label class="block text-sm text-gray-700 font-medium">Map Location</label>
        <span class="text-xs text-gray-500">Click on the map to set your location</span>
      </div>
      <div class="h-96 w-full border border-gray-300 rounded-md overflow-hidden" ref="mapContainer"></div>
    </div>

    <!-- Coordinates Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Latitude</label>
        <input
            v-model="geoCoordinates.latitude"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Latitude"
            readonly
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Longitude</label>
        <input
            v-model="geoCoordinates.longitude"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Longitude"
            readonly
        />
      </div>
    </div>
    <!-- Address Fields Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="street" class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
        <input
            type="text"
            id="street"
            v-model="addressFields.street"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white"
            required
        />
      </div>

      <div>
        <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input
            type="text"
            id="city"
            v-model="addressFields.city"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white"
            required
        />
      </div>

      <div>
        <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
        <input
            type="text"
            id="state"
            v-model="addressFields.state"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white"
            required
        />
      </div>

      <div>
        <label for="zipcode" class="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
        <input
            type="text"
            id="zipcode"
            v-model="addressFields.zipcode"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white"
            required
        />
      </div>

      <div>
        <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <input
            type="text"
            id="country"
            v-model="addressFields.country"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white"
            required
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'LocationSection',
  props: {
    location: {
      type: Object,
      required: true,
      default: () => ({
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipcode: ''
        },
        geo: {
          latitude: null,
          longitude: null
        }
      })
    }
  },
  emits: ['update:location'],
  setup(props, { emit }) {
    const mapContainer = ref(null);
    const map = ref(null);
    const marker = ref(null);
    const fullAddress = ref('');
    const isInternalChange = ref(false);

    // Create reactive refs for address fields
    const addressFields = ref({
      street: props.location.address.street || '',
      city: props.location.address.city || '',
      state: props.location.address.state || '',
      country: props.location.address.country || '',
      zipcode: props.location.address.zipcode || ''
    });

    // Create reactive refs for geo coordinates
    const geoCoordinates = ref({
      latitude: props.location.geo.latitude || null,
      longitude: props.location.geo.longitude || null
    });

    // Watch for changes in the props
    watch(() => props.location, (newLocation) => {
      // Skip if the change was triggered internally
      if (isInternalChange.value) {
        isInternalChange.value = false;
        return;
      }

      addressFields.value = {
        street: newLocation.address.street || '',
        city: newLocation.address.city || '',
        state: newLocation.address.state || '',
        country: newLocation.address.country || '',
        zipcode: newLocation.address.zipcode || ''
      };

      geoCoordinates.value = {
        latitude: newLocation.geo.latitude || null,
        longitude: newLocation.geo.longitude || null
      };

      // Update marker position if coordinates exist and map is initialized
      if (map.value && newLocation.geo.latitude && newLocation.geo.longitude) {
        updateMarker(newLocation.geo.latitude, newLocation.geo.longitude);
      }
    }, { deep: true });

    // Helper function to emit updates without triggering infinite loop
    const emitLocationUpdate = () => {
      isInternalChange.value = true;
      emit('update:location', {
        address: { ...addressFields.value },
        geo: { ...geoCoordinates.value }
      });
    };

    // Watch for changes in address fields and emit updates
    watch(addressFields, () => {
      emitLocationUpdate();

      // Update full address search field
      fullAddress.value = buildFullAddress(addressFields.value);
    }, { deep: true });

    // Watch for changes in geo coordinates and emit updates
    watch(geoCoordinates, () => {
      emitLocationUpdate();
    }, { deep: true });

    // Initialize map
    onMounted(() => {
      if (!mapContainer.value) return;

      // Set default view to a central location if no coordinates are provided
      const initialLat = geoCoordinates.value.latitude || 40.7128;
      const initialLng = geoCoordinates.value.longitude || -74.0060;

      map.value = L.map(mapContainer.value).setView([initialLat, initialLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      // Add marker if location exists
      if (geoCoordinates.value.latitude && geoCoordinates.value.longitude) {
        marker.value = L.marker([geoCoordinates.value.latitude, geoCoordinates.value.longitude]).addTo(map.value);
      }

      // Handle map click events
      map.value.on('click', (e) => {
        const { lat, lng } = e.latlng;
        updateCoordinates(lat, lng);
        reverseGeocode(lat, lng);
      });
    });

    // Helper function to build full address from fields
    const buildFullAddress = (fields) => {
      const parts = [
        fields.street,
        fields.city,
        fields.state,
        fields.zipcode,
        fields.country
      ].filter(Boolean);

      return parts.join(', ');
    };

    // Update marker position
    const updateMarker = (lat, lng) => {
      if (!map.value) return;

      if (marker.value) {
        map.value.removeLayer(marker.value);
      }

      marker.value = L.marker([lat, lng]).addTo(map.value);
      map.value.setView([lat, lng], 13);
    };

    // Update coordinates
    const updateCoordinates = (lat, lng) => {
      geoCoordinates.value = {
        latitude: parseFloat(lat).toFixed(6),
        longitude: parseFloat(lng).toFixed(6)
      };

      updateMarker(lat, lng);
    };

    // Search for location based on address
    const searchLocation = async () => {
      if (!fullAddress.value) return;

      try {
        // Using Nominatim OpenStreetMap search API
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress.value)}`);
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          updateCoordinates(lat, lon);

          // Try to parse the address components from the result
          if (data[0].address) {
            const addr = data[0].address;
            addressFields.value = {
              street: [addr.road, addr.house_number].filter(Boolean).join(' ') || addressFields.value.street,
              city: addr.city || addr.town || addr.village || addressFields.value.city,
              state: addr.state || addressFields.value.state,
              country: addr.country || addressFields.value.country,
              zipcode: addr.postcode || addressFields.value.zipcode
            };
          }
        }
      } catch (error) {
        console.error('Error searching for location:', error);
      }
    };

    // Get address from coordinates
    const reverseGeocode = async (lat, lng) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();

        if (data && data.address) {
          const addr = data.address;
          addressFields.value = {
            street: [addr.road, addr.house_number].filter(Boolean).join(' ') || '',
            city: addr.city || addr.town || addr.village || '',
            state: addr.state || '',
            country: addr.country || '',
            zipcode: addr.postcode || ''
          };

          fullAddress.value = data.display_name || '';
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
    };

    return {
      mapContainer,
      addressFields,
      geoCoordinates,
      fullAddress,
      searchLocation
    };
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

input {
  transition: all 0.2s ease;
}

/* Fix for Leaflet default styles */
:deep(.leaflet-control-container .leaflet-control) {
  z-index: 1000;
}

:deep(.leaflet-control-zoom a) {
  color: #000;
}

:deep(.leaflet-container) {
  font: inherit;
}
</style>