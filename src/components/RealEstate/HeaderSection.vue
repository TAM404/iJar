<template>
  <div :class="headerClass" class=" bg-gradient-to-r combined-gradient shadow-xl sticky top-0 z-20 transition-all duration-300" style="font-family: kanit,serif">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-6">
      <div class="md:flex md:items-center md:justify-between">
        <!-- Logo and Name Section with Enhanced Styling -->
        <div class="flex-1 min-w-0 flex items-center space-x-6">
          <div class="w-28 h-28 relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
                :src="agency.logoUrl"
                :alt="agency.name"
                class="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 class="text-4xl font-extrabold text-white truncate tracking-tight">
              {{ agency.name }}
            </h1>
            <div class="flex items-center mt-3">
              <div class="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <StarRating :rating="agency.rating" />
                <span class="ml-2 text-white font-medium">
                  {{ agency.rating }}/5 ({{ agency.reviewCount }} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Contact Buttons -->
        <div class="mt-6 md:mt-0 flex space-x-3">
          <button class="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300">
            <PhoneIcon class="h-5 w-5 mr-2" />
            Call Now
          </button>
          <button class="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300">
            <EnvelopeIcon class="h-5 w-5 mr-2" />
            Email Us
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted, onUnmounted, computed} from 'vue'
import { PhoneIcon,EnvelopeIcon } from '@heroicons/vue/24/solid'
import StarRating from './StarRating.vue'

export default defineComponent({
  name: 'HeaderSection',
  components: {
    PhoneIcon,
    StarRating,EnvelopeIcon
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const headerClass = computed(() => ({
      'py-0.5': isScrolled.value,
      'py-12': !isScrolled.value
    }));

    return {
      isScrolled,
      headerClass
    };
  }
})
</script>

<style scoped>
.combined-gradient {
  background: linear-gradient(to right, #25314d, rgba(37, 99, 235, 0)), linear-gradient(to bottom, #0c2440, #0c2440);
}
</style>