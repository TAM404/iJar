<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <!-- Media Slider -->
    <div class="relative h-60 bg-gray-100">
      <!-- Images/Video Slider -->
      <div v-if="mediaItems.length > 0" class="relative h-full">
        <div class="absolute inset-0">
          <transition-group name="fade" tag="div" class="relative h-full">
            <div v-for="(item, index) in mediaItems" :key="index" v-show="currentSlide === index" class="absolute inset-0">
              <!-- Video -->
              <video v-if="item.type === 'video'" class="w-full h-full object-cover" controls>
                <source :src="item.url" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <!-- Image -->
              <img v-else :src="item.url" class="w-full h-full object-cover" :alt="`Property image ${index + 1}`" />
            </div>
          </transition-group>
        </div>

        <!-- Navigation Arrows -->
        <button
            v-if="mediaItems.length > 1"
            @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
            v-if="mediaItems.length > 1"
            @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Slide Indicators -->
        <div v-if="mediaItems.length > 1" class="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10">
          <button
              v-for="(_, index) in mediaItems"
              :key="index"
              @click="currentSlide = index"
              :class="[
              'w-2 h-2 rounded-full transition-all focus:outline-none',
              currentSlide === index ? 'bg-white w-4' : 'bg-white bg-opacity-50 hover:bg-opacity-70'
            ]"
              :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>

        <!-- Media Type Badge -->
        <div class="absolute top-2 right-2 z-10">
          <span
              v-if="mediaItems[currentSlide]?.type === 'video'"
              class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Video
          </span>
          <span class="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md ml-1">
            {{ currentSlide + 1 }}/{{ mediaItems.length }}
          </span>
        </div>
      </div>

      <!-- Placeholder if no media -->
      <div v-else class="h-full flex items-center justify-center bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-500 mt-2">No images available</span>
      </div>

      <!-- Property Type & Listing Type Badge -->
      <div class="absolute top-2 left-2 z-10 flex space-x-2">
        <span v-if="property.property_details.type" class="bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
          {{ formatPropertyType(property.property_details.type) }}
        </span>
        <span v-if="property.listing.type" class="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
          {{ formatListingType(property.listing.type) }}
        </span>
      </div>
    </div>

    <!-- Property Details -->
    <div class="p-4">
      <!-- Price -->
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold text-gray-900">
          <span v-if="property.listing.price && property.listing.price.amount">
            {{ formatPrice(property.listing.price.amount) }}
          </span>
          <span v-else class="text-gray-500">Price not set</span>
        </h3>
        <div v-if="property.listing.price && property.listing.price.negotiable" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-lg">
          Negotiable
        </div>
      </div>

      <!-- Location -->
      <div v-if="hasLocation" class="flex items-start mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p class="text-sm text-gray-700 line-clamp-2">
          {{ formatAddress(property.location.address) }}
        </p>
      </div>

      <!-- Property Features -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div v-if="property.property_details.rooms.bedrooms !== null" class="text-center border border-gray-200 rounded-md py-2">
          <div class="font-medium text-gray-900">{{ property.property_details.rooms.bedrooms }}</div>
          <div class="text-xs text-gray-500">Bed{{ property.property_details.rooms.bedrooms !== 1 ? 's' : '' }}</div>
        </div>
        <div v-if="property.property_details.rooms.bathrooms !== null" class="text-center border border-gray-200 rounded-md py-2">
          <div class="font-medium text-gray-900">{{ property.property_details.rooms.bathrooms }}</div>
          <div class="text-xs text-gray-500">Bath{{ property.property_details.rooms.bathrooms !== 1 ? 's' : '' }}</div>
        </div>
        <div v-if="property.property_details.size && property.property_details.size.area" class="text-center border border-gray-200 rounded-md py-2">
          <div class="font-medium text-gray-900">{{ property.property_details.size.area }}</div>
          <div class="text-xs text-gray-500">{{ property.property_details.size.unit || 'sqm' }}</div>
        </div>
      </div>

      <!-- Amenities Preview -->
      <div v-if="activeAmenities.length > 0" class="mb-4">
        <h4 class="text-xs uppercase text-gray-500 mb-2">Amenities</h4>
        <div class="flex flex-wrap gap-2">
          <span
              v-for="amenity in activeAmenitiesPreview"
              :key="amenity"
              class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ formatAmenity(amenity) }}
          </span>
          <span
              v-if="activeAmenities.length > activeAmenitiesPreview.length"
              class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs"
          >
            +{{ activeAmenities.length - activeAmenitiesPreview.length }} more
          </span>
        </div>
      </div>

      <!-- Agent Contact -->
      <div v-if="property.agent && property.agent.name" class="pt-3 border-t border-gray-200">
        <div class="flex items-center">
          <div class="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-600 mr-3">
            {{ getAgentInitials(property.agent.name) }}
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium">{{ property.agent.name }}</h4>
            <p v-if="property.agent.contact.phone" class="text-xs text-gray-500">{{ formatPhone(property.agent.contact.phone) }}</p>
          </div>
          <button class="bg-black text-white rounded-full p-2 hover:bg-gray-800 transition-colors" aria-label="Contact agent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyPreviewCard',
  props: {
    property: {
      type: Object,
      required: true
    },
    previewImage: {
      type: String,
      default: null
    },
    previewVideo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      currentSlide: 0
    };
  },
  computed: {
    mediaItems() {
      const items = [];

      // Add all images
      if (this.property.media && this.property.media.images && this.property.media.images.length > 0) {
        this.property.media.images.forEach(imageUrl => {
          items.push({ type: 'image', url: imageUrl });
        });
      } else if (this.previewImage) {
        // Use preview image if available and no images in property
        items.push({ type: 'image', url: this.previewImage });
      }

      // Add video if available
      if (this.property.media && this.property.media.videos && this.property.media.videos.length > 0) {
        items.push({ type: 'video', url: this.property.media.videos[0] });
      } else if (this.previewVideo) {
        items.push({ type: 'video', url: this.previewVideo });
      }

      return items;
    },
    hasLocation() {
      const address = this.property.location.address;
      return address && (address.street || address.city || address.state || address.country);
    },
    activeAmenities() {
      const amenities = this.property.amenities;
      if (!amenities) return [];

      return Object.entries(amenities)
          .filter(([_, value]) => value === true || (typeof value === 'string' && value.trim() !== ''))
          .map(([key, _]) => key);
    },
    activeAmenitiesPreview() {
      // Show only first 3 amenities
      return this.activeAmenities.slice(0, 3);
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.mediaItems.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.mediaItems.length) % this.mediaItems.length;
    },
    formatPrice(price) {
      if (!price) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    },
    formatAddress(address) {
      if (!address) return 'Location not specified';

      const parts = [];
      if (address.street) parts.push(address.street);
      if (address.city) parts.push(address.city);
      if (address.state) parts.push(address.state);
      if (address.country) parts.push(address.country);

      return parts.join(', ') || 'Location not specified';
    },
    formatPropertyType(type) {
      if (!type) return '';

      const types = {
        'apartment': 'Apartment',
        'house': 'House',
        'villa': 'Villa',
        'condo': 'Condo',
        'townhouse': 'Townhouse',
        'land': 'Land',
        'commercial': 'Commercial'
      };

      return types[type.toLowerCase()] || type.charAt(0).toUpperCase() + type.slice(1);
    },
    formatListingType(type) {
      if (!type) return '';

      const types = {
        'rent': 'For Rent',
        'sale': 'For Sale',
        'short_term': 'Short Term'
      };

      return types[type.toLowerCase()] || type.charAt(0).toUpperCase() + type.slice(1);
    },
    formatAmenity(amenity) {
      const amenityNames = {
        'elevator': 'Elevator',
        'parking': 'Parking',
        'pool': 'Swimming Pool',
        'gym': 'Gym',
        'security': 'Security',
        'heating': 'Heating',
        'cooling': 'AC',
        'smart_home': 'Smart Home'
      };

      return amenityNames[amenity] || amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    getAgentInitials(name) {
      if (!name) return '';
      return name.split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('');
    },
    formatPhone(phone) {
      if (!phone) return '';
      // Basic formatting for US numbers
      if (phone.length === 10) {
        return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
      }
      return phone;
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>