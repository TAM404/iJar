<template>
  <div class="flex flex-col  p-6  " style="border-bottom-width: 1px;font-family: 'Poppins',serif;">
    <!-- Progress Bar Container -->
    <div class="flex items-center mb-2">
      <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative flex-1 mx-1"
      >
        <!-- Progress Bar Segments -->
        <div class="h-2 rounded-full overflow-hidden bg-gray-200" style="    margin-top: 2px;">
          <div
              class="h-full rounded-full transition-all duration-500 ease-out"
              :class="{
              'bg-gradient-to-r from-gray-500 to-black': currentStep >= index,
              'bg-gray-300': currentStep < index
            }"
              :style="{
              width: currentStep > index ? '100%' : currentStep === index ? progress + '%' : '0%'
            }"
          ></div>
        </div>

        <!-- Step Indicators -->
        <div
            class="absolute top-0 right-0 -mt-1 -mr-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 transform z-20"
            :class="{
            'bg-black text-white scale-110': currentStep >= index,
            'bg-gray-300 text-gray-600': currentStep < index
          }"
        >
          <span class="text-xs font-bold">{{ index + 1 }}</span>
        </div>
      </div>
    </div>

    <!-- Step Labels -->
    <div class="flex justify-between px-2 mt-3">
      <div
          v-for="(step, index) in steps"
          :key="'label-' + index"
          class="text-xs font-medium transition-all duration-300"
          :class="{
          'text-black font-bold': currentStep === index,
          'text-gray-500': currentStep !== index
        }"
      >
        {{ step.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressIndicator',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => []
    },
    currentStep: {
      type: Number,
      required: true,
      default: 0
    },
    progress: {
      type: Number,
      default: 100,
      validator: (value) => value >= 0 && value <= 100
    }
  },
  mounted() {
    // Add animation when first mounted
    this.$nextTick(() => {
      // You could add initial animation here if needed
    });
  },
  methods: {
    // Helper methods can be added here
    getStepStatus(index) {
      if (this.currentStep > index) return 'completed';
      if (this.currentStep === index) return 'active';
      return 'pending';
    }
  }
}
</script>

<style scoped>
.progress-indicator-enter-active,
.progress-indicator-leave-active {
  transition: all 0.5s;
}
.progress-indicator-enter,
.progress-indicator-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>