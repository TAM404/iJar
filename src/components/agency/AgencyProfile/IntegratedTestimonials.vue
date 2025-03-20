<template>
  <section class="py-16 px-4 bg-white rounded-2xl  p-8 transform shadow-sm  transition-shadow duration-300" style="margin-top: 80px">
    <div class="max-w-6xl mx-auto">
      <!-- Section intro -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-medium text-gray-900 mb-4">Client Experiences</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover what our clients have to say about working with us, and share your own experience.
        </p>
      </div>

      <!-- Tabs for switching between viewing and submitting testimonials -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex p-1 bg-gray-100 rounded-lg">
          <button
              @click="activeTab = 'view'"
              class="px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
              :class="activeTab === 'view' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
          >
            <EyeIcon class="w-4 h-4 inline mr-1" />
            View Testimonials
          </button>
          <button
              @click="activeTab = 'submit'"
              class="px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
              :class="activeTab === 'submit' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
          >
            <PencilIcon class="w-4 h-4 inline mr-1" />
            Share Your Experience
          </button>
        </div>
      </div>

      <!-- Conditional display based on active tab -->
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'view'" key="view">
          <TestimonialsSection :agency="agency" />
        </div>
        <div v-else key="submit">
          <TestimonialSubmission @testimonial-submitted="addTestimonial" />
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { EyeIcon, PencilIcon } from '@heroicons/vue/24/outline'
import TestimonialsSection from './TestimonialsSection.vue'
import TestimonialSubmission from './TestimonialSubmission.vue'

export default defineComponent({
  name: 'IntegratedTestimonials',
  components: {
    TestimonialsSection,
    TestimonialSubmission,
    EyeIcon,
    PencilIcon
  },
  setup() {
    const activeTab = ref('view');

    // Sample agency data with testimonials
    const agency = reactive({
      testimonials: [
        {
          name: "Sarah Johnson",
          location: "New York, NY",
          text: "Working with this agency transformed our online presence. Their strategic approach and creative solutions helped us stand out in a crowded market.",
          rating: 5,
          date: "Feb 12, 2025",
          avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147133.png"
        },
        {
          name: "Michael Chen",
          location: "San Francisco, CA",
          text: "The team went above and beyond to understand our business needs. Their attention to detail and proactive communication made the entire process smooth.",
          rating: 5,
          date: "Jan 28, 2025",
          avatarUrl: "https://cdn-icons-png.flaticon.com/512/147/147144.png"
        },
        {
          name: "Emma Rodriguez",
          location: "Chicago, IL",
          text: "I appreciated their data-driven approach and creative thinking. Our campaign results exceeded expectations, and we're already planning our next project together.",
          rating: 4,
          date: "Jan 15, 2025",
          avatarUrl: "https://cdn-icons-png.flaticon.com/512/168/168734.png"
        }
      ]
    });

    // Function to add a new testimonial
    const addTestimonial = (newTestimonial) => {
      // Add the new testimonial to the beginning of the array
      agency.testimonials.unshift(newTestimonial);

      // Switch to view tab after submission
      setTimeout(() => {
        activeTab.value = 'view';
      }, 3000);
    };

    return {
      activeTab,
      agency,
      addTestimonial
    };
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>