<template>
  <div class="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 overflow-hidden relative">
    <!-- Background decoration elements -->
    <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-100 opacity-50"></div>
    <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 rounded-full bg-purple-100 opacity-50"></div>

    <!-- Section Header with animation -->
    <div class="relative z-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 flex items-center animate-fade-in">
        <span class="relative inline-block mr-4">
          <ChatBubbleLeftRightIcon class="h-8 w-8 text-indigo-600 animate-float" />
          <span class="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse"></span>
        </span>
        <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          What Our Clients Say
        </span>
      </h2>
    </div>

    <!-- Testimonials Grid with staggered animations -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="(testimonial, index) in agency.testimonials"
          :key="index"
          class="bg-white rounded-xl p-6 shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-102"
          :class="`animate-fade-slide-up-${(index % 3) + 1}`"
      >
        <!-- Testimonial header with client info -->
        <div class="flex items-center mb-4">
          <div class="relative mr-4">
            <img
                :src="testimonial.avatarUrl"
                :alt="testimonial.name"
                class="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 p-0.5"
            />
            <div class="absolute -bottom-1 -right-1 bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {{ testimonial.rating }}
            </div>
          </div>
          <div>
            <h4 class="font-bold text-gray-900">{{ testimonial.name }}</h4>
            <p class="text-sm text-gray-600 flex items-center">
              <MapPin class="h-3 w-3 text-indigo-400 mr-1" />
              {{ testimonial.location }}
            </p>
          </div>
        </div>

        <!-- Quote icon and testimonial text -->
        <div class="relative">
          <Quote class="h-8 w-8 text-indigo-100 absolute -top-1 -left-5" />
          <p class="text-gray-700 italic mb-4 relative z-10 pl-4">
            "{{ testimonial.text }}"
          </p>
        </div>

        <!-- Star rating and date with visual separator -->
        <div class="flex items-center pt-3 mt-2 border-t border-gray-100">
          <StarRating :rating="testimonial.rating" />
          <span class="ml-2 text-gray-500 text-sm">{{ testimonial.date }}</span>
        </div>
      </div>
    </div>

    <!-- Navigation dots (optional for multiple pages) -->
    <div class="flex justify-center mt-8">
      <button
          v-for="i in 3"
          :key="i"
          class="mx-1 h-2 w-2 rounded-full transition-all duration-300"
          :class="i === 1 ? 'bg-indigo-500 w-6' : 'bg-gray-300'"
          @click="changePage(i)"
      ></button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import { Quote ,MapPin} from 'lucide-vue-next'
import StarRating from './StarRating.vue'

export default defineComponent({
  name: 'TestimonialsSection',
  components: {
    ChatBubbleLeftRightIcon,
    MapPin,
    Quote,
    StarRating
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  setup() {
    const currentPage = ref(1);

    const changePage = (page) => {
      currentPage.value = page;
      // Logic to change testimonials page if needed
    };

    return {
      currentPage,
      changePage
    }
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

.animate-fade-slide-up-1 {
  animation: fadeSlideUp 0.6s ease-out forwards;
}

.animate-fade-slide-up-2 {
  animation: fadeSlideUp 0.6s 0.2s ease-out forwards;
  opacity: 0;
}

.animate-fade-slide-up-3 {
  animation: fadeSlideUp 0.6s 0.4s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>