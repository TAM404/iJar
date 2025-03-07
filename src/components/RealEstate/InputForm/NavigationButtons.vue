<template>
  <div class="flex justify-between mt-8 w-full">
    <button
        v-if="currentStep > 0"
        @click="$emit('prevStep')"
        class="group px-8 py-3 bg-white border-2 border-black rounded-md font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Previous</span>
    </button>

    <div v-else class="w-24"></div>

    <button
        @click="$emit('nextStep')"
        class="group px-8 py-3 bg-black text-white rounded-md font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        :class="{ 'bg-black': !isLastStep, 'bg-gray-900': isLastStep }"
    >
      <span>{{ isLastStep ? 'Finish' : 'Next' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavigationButtons',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    steps: {
      type: Array,
      required: true
    }
  },
  computed: {
    isLastStep() {
      return this.currentStep === this.steps.length - 1;
    }
  }
}
</script>

<style scoped>
button {
  letter-spacing: 0.05em;
}

button:active {
  transform: translateY(1px);
}

@media (max-width: 640px) {
  button {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>