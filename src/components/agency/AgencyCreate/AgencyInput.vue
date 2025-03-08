<template>

  <div style="
    background: #f2f2f2;
" class="min-h-screen bg-white flex items-center justify-center p-6">
    <h1 style="height: 300px;
    z-index: revert-layer;
    font-size: 94px;
    width: 300px;
    left: 151px;
    position: relative;
    font-family: fantasy;
    line-height: 139px;
    /* padding-top: 114px; */
    top: -284px;
    border: 1px solid rgb(235 235 235);
    border-radius: 10px;
    -webkit-text-fill-color: rgba(0, 0, 0, 0.13);
    background:url(https://github.com/misalagp/imgs/blob/main/noise.png?raw=true), radial-gradient(circle, rgb(255 255 255) 0%, rgb(152 152 152 / 13%) 100%);
    writing-mode: vertical-lr;
    box-sizing: border-box;"></h1>

    <div class="bg-white shadoww-2xl rounded-2xl overflow-hidden w-full max-w-4xl relative" style="border: 1px solid gainsboro;font-family: 'Montserrat',serif;z-index: 1">
      <!-- Progress Indicator -->
      <ProgressIndicator :steps="steps" :currentStep="currentStep" />

      <!-- Form Container -->
      <div class="p-8">
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
      <h1
          style="height: 300px;
    z-index: revert-layer;
    font-size: 94px;
    width: 300px;
    left: -151px;
    position: relative;
    font-family: fantasy;
    line-height: 139px;
    /* padding-top: 114px; */
    top: 284px;
    border: 1px solid rgb(235 235 235);
    border-radius: 10px;
    -webkit-text-fill-color: rgba(0, 0, 0, 0.13);
    background:url(https://github.com/misalagp/imgs/blob/main/noise.png?raw=true), radial-gradient(circle, rgb(255 255 255) 0%, rgb(152 152 152 / 13%) 100%);
    writing-mode: vertical-lr;
    box-sizing: border-box;"
      >
      </h1>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAgencyStore } from '@/stores/agencyStore';
import { useUserStore } from '@/stores/userStore';
import ProgressIndicator from "./ProgressIndicator.vue";
import BasicAgencyInfo from "./BasicAgencyInfo.vue";
import ServicesContactDetails from "./ServicesContactDetail.vue";
import PerformanceAchievements from "./PerformanceAchievements.vue";
import NavigationButtons from "./NavigationButtons.vue";

const router = useRouter();
const agencyStore = useAgencyStore();
const userStore = useUserStore();

const currentStep = ref(0);
const error = ref('');
const isLoading = ref(false);

const steps = ref([
  { label: 'About' },
  { label: 'Contact' },
  { label: 'Awards' }
]);

const serviceOptions = ref([
  'Luxury Residential Sales',
  'Premium Rental Properties',
  'Commercial Real Estate',
  'Property Management',
  'Virtual 3D Tours',
  'Legal Consultation',
  'Market Analysis Reports',
  'Investment Advisory'
]);

const agency = reactive({
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
});

const nextStep = async () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++;
  } else {
    await submitAgencyData();
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const addAward = () => {
  agency.awards.push({ title: '', year: '' });
};

const removeAward = (index) => {
  if (agency.awards.length > 1) {
    agency.awards.splice(index, 1);
  }
};

const submitAgencyData = async () => {
  try {
    isLoading.value = true;
    error.value = '';

    if (!userStore.user) {
      throw new Error('You must be logged in to create an agency');
    }

    const response = await agencyStore.createAgency({
      ...agency,
      adminId: userStore.user.id
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    await router.push(`/agency/${response.id}`);
  } catch (err) {
    console.error('Error creating agency:', err);
    error.value = err.message || 'Failed to create agency';
  } finally {
    isLoading.value = false;
  }
};
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