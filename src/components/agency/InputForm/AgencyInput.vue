<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6">
    <h1 style="height: 500px; font-size: 272px; left: 60px; position: relative; font-family: fantasy; top: -268px; border: 1px solid #7c86b9; border-radius: 20px; -webkit-text-fill-color: #00000021; background: url(https://github.com/misalagp/imgs/blob/main/noise.png?raw=true), radial-gradient(circle, #7076ad61 0%, #2e3763c9 100%);">{{ currentStep + 1 }}</h1>

    <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl relative" style="border: 1px solid gainsboro; font-family: 'Montserrat', serif; z-index: 1">
      <!-- Progress Indicator -->
      <ProgressIndicator :steps="steps" :currentStep="currentStep" />

      <!-- Form Container -->
      <div class="p-8">
        <!-- Error Messages -->
        <div v-if="errors.length" class="mb-4 text-red-500">
          <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
        </div>

        <!-- Basic Info Card -->
        <BasicAgencyInfo v-if="currentStep === 0" :agency="agency" />

        <!-- Services and Contact Card -->
        <ServicesContactDetails v-if="currentStep === 1" :agency="agency" :serviceOptions="serviceOptions" />

        <!-- Performance and Awards Card -->
        <PerformanceAchievements v-if="currentStep === 2" :agency="agency" />

        <!-- Navigation Buttons -->
        <NavigationButtons :currentStep="currentStep" :steps="steps" @prevStep="prevStep" @nextStep="nextStep" />
      </div>
    </div>
    <h1 style="height: 500px; z-index: revert-layer; font-size: 94px; width: 126px; left: -18px; position: relative; font-family: fantasy; line-height: 139px; padding-top: 114px; top: 303px; border: 1px solid rgb(124, 134, 185); border-radius: 20px; -webkit-text-fill-color: rgba(0, 0, 0, 0.13); background: url(https://github.com/misalagp/imgs/blob/main/noise.png?raw=true), radial-gradient(circle, rgba(112, 118, 173, 0.38) 0%, rgba(46, 55, 99, 0.79) 100%); writing-mode: vertical-lr;">
      {{ steps[currentStep].label }}
    </h1>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAgencyStore } from '@/stores/agencyStore';
import ProgressIndicator from "./ProgressIndicator.vue";
import BasicAgencyInfo from "./BasicAgencyInfo.vue";
import ServicesContactDetails from "./ServicesContactDetail.vue";
import PerformanceAchievements from "./PerformanceAchievements.vue";
import NavigationButtons from "./NavigationButtons.vue";

export default {
  components: { NavigationButtons, PerformanceAchievements, ServicesContactDetails, BasicAgencyInfo, ProgressIndicator },
  data() {
    return {
      currentStep: 0,
      steps: [
        { label: 'About' },
        { label: 'Contact' },
        { label: 'Awards' }
      ],
      serviceOptions: [
        'Luxury Residential Sales',
        'Premium Rental Properties',
        'Commercial Real Estate',
        'Property Management',
        'Virtual 3D Tours',
        'Legal Consultation',
        'Market Analysis Reports',
        'Investment Advisory'
      ],
      agency: {
        name: '',
        logoUrl: '',
        description: '',
        services: [],
        address: '',
        hours: '',
        phone: '',
        email: '',
        website: '',
        yearFounded: null,
        propertiesSold: null,
        awards: [{ title: '', year: '' }],
        socialMedia: [
          { platform: 'facebook', url: '' },
          { platform: 'instagram', url: '' },
          { platform: 'twitter', url: '' },
          { platform: 'linkedin', url: '' }
        ]
      },
      errors: []
    }
  },
  methods: {
    validateStep() {
      this.errors = [];
      if (this.currentStep === 0) {
        if (!this.agency.name) this.errors.push('Name is required.');
        if (!this.agency.description) this.errors.push('Description is required.');
      } else if (this.currentStep === 1) {
        if (!this.agency.address) this.errors.push('Address is required.');
        if (!this.agency.phone) this.errors.push('Phone is required.');
        if (!this.agency.email) this.errors.push('Email is required.');
      } else if (this.currentStep === 2) {
        if (this.agency.awards.some(award => !award.title || !award.year)) {
          this.errors.push('All awards must have a title and year.');
        }
      }
      return this.errors.length === 0;
    },
    nextStep() {
      if (this.validateStep()) {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++;
        } else {
          this.submitAgencyData();
        }
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    addAward() {
      this.agency.awards.push({ title: '', year: '' });
    },
    removeAward(index) {
      if (this.agency.awards.length > 1) {
        this.agency.awards.splice(index, 1);
      }
    },
    async submitAgencyData() {
      const agencyStore = useAgencyStore();
      const router = useRouter();
      try {
        await agencyStore.createAgency(this.agency);
        console.log('Complete Agency Data Submitted:', this.agency);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error submitting agency data:', error);
        this.errors = ['Failed to submit agency information.'];
      }
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>