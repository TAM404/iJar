<template>
  <div class="bg-gradient-to-br from-indigo-50 to-blue-100 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Testimonials Section -->
        <div class="relative">
          <div class="absolute -top-10 -left-10 text-indigo-500 text-opacity-20 text-9xl font-serif">"</div>

          <!-- Testimonial Carousel -->
          <div class="relative z-10 space-y-8">
            <h2 class="text-3xl font-bold text-indigo-900 mb-6">What People Say About Us</h2>

            <div v-for="(testimonial, index) in testimonials"
                 :key="index"
                 class="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-500 hover:scale-105"
                 :class="{ 'animate-pulse': activeTestimonial === index }">
              <div class="flex items-center mb-4">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover mr-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h3>
                  <p class="text-sm text-indigo-600">{{ testimonial.role }}</p>
                </div>
              </div>
              <p class="text-gray-700 italic">{{ testimonial.text }}</p>
              <div class="mt-4 flex text-yellow-400">
                <span v-for="star in 5" :key="star" class="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
            </div>

            <!-- Navigation Dots -->
            <div class="flex justify-center mt-6 space-x-2">
              <button v-for="(_, index) in testimonials"
                      :key="index"
                      @click="activeTestimonial = index"
                      class="w-3 h-3 rounded-full transition-all duration-300"
                      :class="activeTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'">
              </button>
            </div>
          </div>
        </div>

        <!-- Signup Section -->
        <div class="bg-white rounded-xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-indigo-900">Join Our Community</h2>
            <p class="text-gray-600 mt-2">Experience the difference today.</p>
          </div>

          <!-- Your existing SignupForm component -->
          <SignupForm />

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-sm text-gray-600">No credit card required. Free 14-day trial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialsSignup',
  components: {
    SignupForm: () => import('./SignupForm.vue')
  },
  data() {
    return {
      activeTestimonial: 0,
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Marketing Director",
          avatar: "/api/placeholder/80/80",
          text: "This platform transformed how we engage with our audience. The analytics alone made our conversion rate increase by 40%!"
        },
        {
          name: "Michael Chen",
          role: "Startup Founder",
          avatar: "/api/placeholder/80/80",
          text: "As someone who tried many similar services, this one stands out for its ease of use and powerful features. Worth every penny."
        },
        {
          name: "Emily Rodriguez",
          role: "Product Manager",
          avatar: "/api/placeholder/80/80",
          text: "The customer support is exceptional. Any issue we had was resolved within hours. I highly recommend this service."
        }
      ]
    }
  },
  mounted() {
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }
}
</script>