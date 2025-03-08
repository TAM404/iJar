<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img :src="agency.logoUrl" :alt="agency.name" class="h-12 w-auto mb-4" />
          <p class="text-gray-400 text-sm">{{ agency.footerText }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in agency.quickLinks" :key="link.text">
              <a :href="link.url" class="text-gray-400 hover:text-white transition-colors duration-200">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li v-for="service in agency.services.slice(0, 5)" :key="service">
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">{{ service }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-gray-400 mb-4 text-sm">Subscribe to our newsletter for the latest property updates.</p>
          <div class="flex">
            <input type="email" placeholder="Your email" class="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900" />
            <button class="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-800 text-center">
        <p class="text-gray-400 text-sm">&copy; {{ new Date().getFullYear() }} {{ agency.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterSection',
  props: {
    agency: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style>