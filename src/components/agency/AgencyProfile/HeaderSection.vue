<template>
  <div
      :class="['sticky top-0 z-20 transition-all duration-300 bg-white shadow-sm',
      isScrolled ? 'py-3' : 'py-6']"
  >
    <!-- Edit Controls -->
    <div class="absolute top-2 right-2 z-30" v-if="!isScrolled">
      <button
          v-if="!isEditing"
          @click="startEditing"
          :style="{ backgroundColor: buttonColor }"
          class="text-white px-4 py-2 rounded flex flex-row absolute top-4 right-4"
      >
        <PencilSquareIcon class="h-7 w-7 text-white mr-3" /><span class="mt-1">Edit</span>

      </button>
      <div v-else class="flex space-x-2">
        <button
            @click="saveChanges"
            :style="{ backgroundColor: buttonColor }"
            class="text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
            @click="cancelEdit"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style="font-family: Montserrat,serif">
      <nav class="flex items-center justify-between">
        <!-- Logo and Brand -->
        <div class="flex items-center flex-shrink-0">
          <div class="h-12 w-12 relative overflow-hidden rounded-lg">
            <img
                :src="isEditing ? editedAgency.logoUrl : agency.logoUrl"
                :alt="isEditing ? editedAgency.name : agency.name"
                @load="extractColor" ref="logoImage"
                class="object-cover w-full h-full"
                crossorigin="anonymous"
            />
            <!-- Logo URL edit overlay -->
            <div v-if="isEditing" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <button @click="showLogoUrlEdit = true" class="text-white text-xs">
                Edit Logo
              </button>
            </div>
          </div>
          <!-- Agency name - editable -->
          <div class="ml-3">
            <h1 v-if="!isEditing" class="text-xl font-semibold text-gray-900">
              {{ agency.name }}
            </h1>
            <input
                v-else
                v-model="editedAgency.name"
                class="text-xl font-semibold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                type="text"
            />
          </div>
        </div>

        <!-- Center Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
              v-for="(item, index) in navigationItems"
              :key="index"
              href="#"
              class="text-gray-600 hover:text-gray-900 font-medium"
          >
            {{ item }}
          </a>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <button
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-full
              text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200
              transition-colors duration-200"
          >
            <PhoneIcon class="h-4 w-4 mr-2" />
            Contact
          </button>
          <button
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-full
              text-sm font-medium text-white bg-rose-500 hover:bg-blue-900
              transition-colors duration-200"
              :style="{ backgroundColor: buttonColor }">
            <EnvelopeIcon class="h-4 w-4 mr-2" />
            Email Us
          </button>
        </div>
      </nav>
    </div>

    <!-- Hero Section (only visible when not scrolled) -->
    <div
        v-show="!isScrolled"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
        style="font-family: Montserrat,serif;">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex-1">
          <h2 class="text-4xl font-medium text-gray-900 tracking-tight">
            Find Your Perfect Place
          </h2>
          <div class="mt-4 flex items-center space-x-4">
            <div class="flex items-center">
              <StarRating :rating="agency.rating" />
              <span class="ml-2 text-gray-600">
                {{ agency.rating }}/5
              </span>
            </div>
            <span class="text-gray-400">•</span>
            <span class="text-gray-600">
              {{ agency.reviewCount }} verified reviews
            </span>
          </div>
        </div>

        <!-- Search Bar -->
        <div data-v-1ad45227="" class="mt-6 md:mt-0">
          <div data-v-1ad45227="" class="flex items-center p-2 bg-white rounded-full border border-gray-200">
            <input data-v-1ad45227="" type="text" placeholder="Find Properties..." class="px-4 py-2 w-64 text-gray-900 placeholder-gray-500 focus:outline-none">
            <button data-v-1ad45227="" class="ml-2 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-blue-900 transition-colors duration-200" :style="{ backgroundColor: buttonColor }"> Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logo URL Edit Modal -->
    <div v-if="showLogoUrlEdit" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Logo URL</h3>
        <input
            v-model="editedAgency.logoUrl"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter logo URL"
        />
        <div class="mt-4 flex justify-end space-x-2">
          <button
              @click="showLogoUrlEdit = false"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import ColorThief from 'colorthief'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
import StarRating from './StarRating.vue'
import {PencilSquareIcon} from "@heroicons/vue/24/solid/index.js";

export default defineComponent({
  name: 'HeaderSection',
  components: {
    PencilSquareIcon,
    PhoneIcon,
    EnvelopeIcon,
    StarRating
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  emits: ['update:agency'],
  setup(props, { emit }) {
    const isScrolled = ref(false)
    const navigationItems = ref(['Places to rent', 'Experiences', 'About', 'Help'])
    const isEditing = ref(false)
    const editedAgency = ref({ ...props.agency })
    const showLogoUrlEdit = ref(false)
    const buttonColor = ref('#4f46e5') // Default color
    const logoImage = ref(null)

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
      // Automatically exit edit mode when scrolling
      if (isScrolled.value && isEditing.value) {
        cancelEdit()
      }
    }

    const startEditing = () => {
      isEditing.value = true
      editedAgency.value = { ...props.agency }
    }

    const saveChanges = () => {
      emit('update:agency', editedAgency.value)
      isEditing.value = false
      showLogoUrlEdit.value = false
    }

    const cancelEdit = () => {
      isEditing.value = false
      showLogoUrlEdit.value = false
    }

    const extractColor = () => {
      const colorThief = new ColorThief()
      if (logoImage.value.complete) {
        const color = colorThief.getColor(logoImage.value)
        buttonColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      } else {
        logoImage.value.addEventListener('load', () => {
          const color = colorThief.getColor(logoImage.value)
          buttonColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        })
      }
    }

    watch(() => editedAgency.value.logoUrl, () => {
      extractColor()
    })

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      navigationItems,
      isEditing,
      editedAgency,
      showLogoUrlEdit,
      buttonColor,
      logoImage,
      startEditing,
      saveChanges,
      cancelEdit,
      extractColor
    }
  }
})
</script>

<style scoped>
.max-w-7xl {
  max-width: 98rem;
}
/* Add any custom styles here */
</style>