<template>
  <div class="bg-white rounded-2xl shadow-md p-6 transform hover:shadow-lg transition-all duration-300 relative border border-gray-200">
    <h2 class="text-2xl font-bold text-black mb-6 flex items-center border-b border-gray-200 pb-3">
      <div class="bg-black p-2 rounded-lg mr-3">
        <MapPinIcon class="h-5 w-5 text-white" />
      </div>
      Location
    </h2>

    <!-- Edit Mode -->
    <div v-if="isEditMode" class="space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Address</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
          <div class="bg-gray-50 p-3 border-r border-gray-300">
            <MapPinIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
              v-model="editedAddress"
              class="w-full p-3 focus:outline-none text-gray-800"
              placeholder="Address"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Opening Hours</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
          <div class="bg-gray-50 p-3 border-r border-gray-300">
            <ClockIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
              v-model="editedHours"
              class="w-full p-3 focus:outline-none text-gray-800"
              placeholder="Opening Hours"
          />
        </div>
      </div>

      <div class="absolute -top-1 right-4 flex space-x-2">
        <button
            @click="saveChanges"
            class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Save
        </button>
        <button
            @click="cancelEdit"
            class="bg-white text-black px-6 py-2 rounded-lg border border-black hover:bg-gray-100 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Display Mode -->
    <div v-else class="space-y-6">
      <div class="space-y-4">
        <div class="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
          <div class="bg-black p-2 rounded-lg mr-3" style="background: transparent;border: 1px solid black">
            <MapPinIcon class="h-5 w-5 text-black" />
          </div>
          <div>
            <p class="text-gray-900 font-medium">Address</p>
            <p class="text-gray-600">{{ agency.address }}</p>
          </div>
        </div>

        <div class="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
          <div class="bg-black p-2 rounded-lg mr-3" style="background: transparent;border: 1px solid black">
            <ClockIcon class="h-5 w-5 text-black" />
          </div>
          <div>
            <p class="text-gray-900 font-medium">Opening Hours</p>
            <p class="text-gray-600">{{ agency.hours }}</p>
          </div>
        </div>
      </div>

      <button
          @click="toggleEditMode"
          class="bg-black text-white px-6 py-2 rounded-lg absolute -top-1 right-4 hover:bg-gray-800 transition-colors duration-200"
      >
        Edit
      </button>
    </div>

    <!-- Map Component -->
    <div class="mt-8 rounded-xl overflow-hidden shadow-md h-64">
      <AgencyMap :latitude="agency.location.lat" :longitude="agency.location.lng" />
    </div>

    <div class="mt-4 flex justify-center">
      <a href="#" class="text-black hover:text-gray-700 flex items-center font-medium group transition-colors duration-200">
        <ArrowTopRightOnSquareIcon class="h-4 w-4 mr-2" />
        <span class="group-hover:underline">Get Directions</span>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import {
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import AgencyMap from './AgencyMap.vue'

export default defineComponent({
  name: 'LocationCard',
  components: {
    MapPinIcon,
    ClockIcon,
    ArrowTopRightOnSquareIcon,
    AgencyMap
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isEditMode = ref(false)
    const editedAddress = ref(props.agency.address || '')
    const editedHours = ref(props.agency.hours || '')

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value
    }

    const saveChanges = () => {
      emit('update:agency', {
        ...props.agency,
        address: editedAddress.value,
        hours: editedHours.value
      })
      isEditMode.value = false
    }

    const cancelEdit = () => {
      editedAddress.value = props.agency.address || ''
      editedHours.value = props.agency.hours || ''
      isEditMode.value = false
    }

    const isFormValid = computed(() => {
      return editedAddress.value.trim() !== '' &&
          editedHours.value.trim() !== ''
    })

    return {
      isEditMode,
      editedAddress,
      editedHours,
      toggleEditMode,
      saveChanges,
      cancelEdit,
      isFormValid
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus styles */
input:focus, select:focus, button:focus {
  outline: none;
}
.font-bold {
  font-weight: 400;
}
</style>