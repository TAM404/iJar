<template>
  <div class="flex w-full h-screen">
    <!-- Testimonial Section - exactly 50% width -->
    <div class="w-1/2 bg-gray-50 flex items-center justify-center relative overflow-hidden" style="background: #3e5190;">

      <!-- Testimonial Card -->
      <div class="w-4/5 max-w-lg bg-white rounded-2xl shadow-lg p-8 relative z-10 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl border border-gray-100">
        <!-- Quote Icon -->
        <Quote class="absolute top-6 left-6 text-6xl text-black opacity-10">"</Quote>

        <!-- Quote Content -->
        <div class="relative z-10 pt-4">
          <p class="text-xl font-light leading-relaxed text-gray-800 mb-6">{{ currentOpinion.text }}</p>

          <!-- Author Info -->
          <div class="flex items-center mt-8">
            <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                  :src="currentOpinion.avatar || '/api/placeholder/48/48'"
                  alt="User avatar"
                  class="w-full h-full object-cover"
              />
            </div>
            <div class="ml-4">
              <p class="font-medium text-gray-900">{{ currentOpinion.name }}</p>
              <p class="text-sm text-gray-600">{{ currentOpinion.title }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center mt-8 space-x-3">
          <button
              v-for="(_, index) in opinions"
              :key="index"
              @click="currentIndex = index"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentIndex === index ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'"
              aria-label="Change testimonial"
          ></button>
        </div>
      </div>

    </div>

    <!-- Signup Form Section - exactly 50% width -->
    <div class="w-1/2  flex items-center justify-center">
      <div class="w-4/5 max-w-lg">
        <SignupForm />
      </div>
    </div>
  </div>
</template>

<script>
import { Quote } from "lucide-vue-next";
import SignupForm from "@/components/RealEstate/auth/SignupForm.vue";

export default {
  name: 'UserOpinionQuote',
  components: { SignupForm, Quote },
  data() {
    return {
      currentIndex: 0,
      opinions: [
        {
          id: 1,
          text: "This platform completely transformed how we approach our business strategy. The insights we've gained are invaluable and have led to a 30% increase in customer engagement.",
          name: "Sarah Johnson",
          title: "Marketing Director",
          avatar: "/api/placeholder/48/48"
        },
        {
          id: 2,
          text: "I was skeptical at first, but after using this platform for three months, I can't imagine working without it. The interface is intuitive and the analytics are comprehensive.",
          name: "Michael Chen",
          title: "Product Manager",
          avatar: "/api/placeholder/48/48"
        },
        {
          id: 3,
          text: "The level of customer support is exceptional. Every question was answered promptly and thoroughly. This platform has exceeded all our expectations.",
          name: "Emma Rodriguez",
          title: "Operations Lead",
          avatar: "/api/placeholder/48/48"
        }
      ],
      intervalId: null
    };
  },
  computed: {
    currentOpinion() {
      return this.opinions[this.currentIndex];
    }
  },
  methods: {
    nextOpinion() {
      this.currentIndex = (this.currentIndex + 1) % this.opinions.length;
    }
  },
  mounted() {
    // Auto-rotate quotes every 5 seconds
    this.intervalId = setInterval(this.nextOpinion, 5000);
  },
  beforeUnmount() {
    // Clean up interval when component is destroyed
    clearInterval(this.intervalId);
  }
}
</script>

<style scoped>
.pattern-dots {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E");
}
</style>