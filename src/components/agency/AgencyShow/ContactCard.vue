<template>
  <div class="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl" >
    <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center border-b border-gray-200 pb-3">
      <PhoneIcon class="h-6 w-6 text-indigo-500 mr-2" />
      Contact Us
    </h2>
    <div class="space-y-4">
      <div class="flex items-start">
        <PhoneIcon class="h-5 w-5 text-gray-500 mr-3 mt-1" />
        <div>
          <p class="text-gray-700 font-medium">Phone</p>
          <p class="text-gray-600">{{ agency.phone }}</p>
        </div>
      </div>
      <div class="flex items-start">
        <EnvelopeIcon class="h-5 w-5 text-gray-500 mr-3 mt-1" />
        <div>
          <p class="text-gray-700 font-medium">Email</p>
          <p class="text-gray-600">{{ agency.email }}</p>
        </div>
      </div>
      <div class="flex items-start">
        <GlobeAltIcon class="h-5 w-5 text-gray-500 mr-3 mt-1" />
        <div>
          <p class="text-gray-700 font-medium">Website</p>
          <p class="text-gray-600">{{ agency.website }}</p>
        </div>
      </div>
    </div>

    <!-- Social Media -->
    <div class="mt-6">
      <p class="text-gray-700 font-medium mb-3">Follow Us</p>
      <div class="flex space-x-3">
        <a v-for="social in agency.socialMedia" :key="social.platform"
           :href="social.url"
           class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-indigo-100 transition-colors duration-300">
          <component :is="getSocialIcon(social.platform)" class="h-5 w-5 text-gray-700" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { PhoneIcon, GlobeAltIcon,EnvelopeIcon } from '@heroicons/vue/24/solid'
import {FacebookIcon, InstagramIcon, TwitterIcon} from "lucide-vue-next";

export default defineComponent({
  name: 'ContactCard',
  components: {
    PhoneIcon,
    GlobeAltIcon,FacebookIcon, TwitterIcon, InstagramIcon,EnvelopeIcon
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSocialIcon(platform) {
      switch (platform) {
        case 'facebook':
          return 'FacebookIcon';
        case 'twitter':
          return 'TwitterIcon';
        case 'instagram':
          return 'InstagramIcon';
        default:
          return 'GlobeAltIcon';
      }
    }
  }
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>