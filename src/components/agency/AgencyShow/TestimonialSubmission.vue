<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mt-12">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <PencilSquareIcon class="h-7 w-7 text-indigo-600 mr-3" />
      <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Share Your Experience
      </span>
    </h3>

    <!-- Success message when form is submitted -->
    <div
        v-if="formSubmitted"
        class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in"
    >
      <div class="flex items-center">
        <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
        <p class="text-green-700">Thank you for your feedback! Your testimonial has been submitted.</p>
      </div>
    </div>

    <!-- Testimonial submission form -->
    <form v-else @submit.prevent="submitTestimonial" class="space-y-6">
      <!-- Personal info row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="John Smith"
          />
        </div>
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
          <input
              id="location"
              v-model="formData.location"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="New York, NY"
          />
        </div>
      </div>

      <!-- Rating section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
        <div class="flex items-center space-x-1">
          <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="formData.rating = star"
              @mouseover="hoverRating = star"
              @mouseleave="hoverRating = 0"
              class="focus:outline-none transition-all duration-200 transform hover:scale-110"
          >
            <StarIcon
                class="h-8 w-8"
                :class="[
                (hoverRating >= star || formData.rating >= star)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              ]"
            />
          </button>

          <span class="ml-2 text-sm text-gray-600" v-if="formData.rating > 0">
            {{ ratingLabels[formData.rating - 1] }}
          </span>
        </div>
      </div>

      <!-- Testimonial text -->
      <div>
        <label for="testimonial" class="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
        <textarea
            id="testimonial"
            v-model="formData.text"
            rows="4"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Tell us about your experience with our agency..."
        ></textarea>
        <p class="text-sm text-gray-500 mt-1">
          {{ 500 - formData.text.length }} characters remaining
        </p>
      </div>

      <!-- Email (optional) -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email (optional - we'll never share your email)
        </label>
        <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="your@email.com"
        />
      </div>

      <!-- Photo upload (simplified) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Profile Photo (optional)</label>
        <div class="flex items-center">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
            <img v-if="formData.photoPreview" :src="formData.photoPreview" class="w-full h-full object-cover" />
            <UserCircleIcon v-else class="w-12 h-12 text-gray-400" />
          </div>
          <label class="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span class="text-sm text-gray-700">Upload Photo</span>
            <input type="file" class="hidden" @change="handlePhotoUpload" accept="image/*" />
          </label>
        </div>
      </div>

      <!-- Submit button -->
      <div class="flex justify-end">
        <button
            type="submit"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-6 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center shadow-md"
            :disabled="isSubmitting"
        >
          <SparklesIcon v-if="!isSubmitting" class="h-5 w-5 mr-2" />
          <svg v-else class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? 'Submitting...' : 'Submit Your Testimonial' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { PencilSquareIcon, StarIcon, CheckCircleIcon, UserCircleIcon, SparklesIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'TestimonialSubmission',
  components: {
    PencilSquareIcon,
    StarIcon,
    CheckCircleIcon,
    UserCircleIcon,
    SparklesIcon
  },
  emits: ['testimonial-submitted'],
  setup(props, { emit }) {
    const hoverRating = ref(0);
    const isSubmitting = ref(false);
    const formSubmitted = ref(false);

    const ratingLabels = [
      'Poor',
      'Fair',
      'Good',
      'Very Good',
      'Excellent'
    ];

    const formData = reactive({
      name: '',
      location: '',
      rating: 0,
      text: '',
      email: '',
      photoPreview: null,
      photoFile: null
    });

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        formData.photoFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.photoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const submitTestimonial = async () => {
      if (formData.rating === 0) {
        alert('Please provide a rating');
        return;
      }

      isSubmitting.value = true;

      // Simulate API call with timeout
      setTimeout(() => {
        // Create testimonial object
        const newTestimonial = {
          name: formData.name,
          location: formData.location,
          rating: formData.rating,
          text: formData.text,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          avatarUrl: formData.photoPreview || '/default-avatar.png',
          email: formData.email
        };

        // Emit event with new testimonial
        emit('testimonial-submitted', newTestimonial);

        // Reset form
        isSubmitting.value = false;
        formSubmitted.value = true;

        // Reset form after 5 seconds
        setTimeout(() => {
          formData.name = '';
          formData.location = '';
          formData.rating = 0;
          formData.text = '';
          formData.email = '';
          formData.photoPreview = null;
          formData.photoFile = null;
          formSubmitted.value = false;
        }, 5000);
      }, 1500);
    };

    return {
      formData,
      hoverRating,
      isSubmitting,
      formSubmitted,
      ratingLabels,
      handlePhotoUpload,
      submitTestimonial
    };
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>