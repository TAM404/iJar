<template>
  <div class="bg-white rounded-2xl shadow-md p-6 transform hover:shadow-lg transition-all duration-300 relative border border-gray-200">
    <h2 class="text-2xl font-bold text-black mb-6 flex items-center border-b border-gray-200 pb-3">
      <div class="bg-black p-2 rounded-lg mr-3">
        <img src="https://cdn-icons-png.flaticon.com/512/3095/3095583.png" class="h-5 w-5 invert" alt="contact icon"/>
      </div>
      Contact Us
    </h2>

    <!-- Edit Mode -->
    <div v-if="isEditMode" class="space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Phone Number</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
          <div class="bg-gray-50 p-3 border-r border-gray-300">
            <PhoneIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
              v-model="editedPhone"
              class="w-full p-3 focus:outline-none text-gray-800"
              placeholder="Phone Number"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Email Address</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
          <div class="bg-gray-50 p-3 border-r border-gray-300">
            <EnvelopeIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
              v-model="editedEmail"
              class="w-full p-3 focus:outline-none text-gray-800"
              placeholder="Email Address"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Website</label>
        <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
          <div class="bg-gray-50 p-3 border-r border-gray-300">
            <GlobeAltIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
              v-model="editedWebsite"
              class="w-full p-3 focus:outline-none text-gray-800"
              placeholder="Website"
          />
        </div>
      </div>

      <div class="absolute -top-1 right-4 flex space-x-2">
        <button
            @click="saveChanges"
            :disabled="!isFormValid"
            class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div class="bg-black p-2 rounded-lg mr-3" style="    background: transparent;
    color: black;
    border: 1px solid;">
            <PhoneIcon class="h-5 w-5 text-black" />
          </div>
          <div>
            <p class="text-gray-900 font-medium">Phone</p>
            <p class="text-gray-600">{{ agency.phone }}</p>
          </div>
        </div>

        <div class="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
          <div class="bg-black p-2 rounded-lg mr-3" style="    background: transparent;
    color: black;
    border: 1px solid;" >
            <EnvelopeIcon class="h-5 w-5 text-black"  />
          </div>
          <div>
            <p class="text-gray-900 font-medium">Email</p>
            <p class="text-gray-600">{{ agency.email }}</p>
          </div>
        </div>

        <div class="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
          <div class="bg-black p-2 rounded-lg mr-3" style="    background: transparent;
    color: black;
    border: 1px solid;">
            <GlobeAltIcon class="h-5 w-5 text-black" />
          </div>
          <div>
            <p class="text-gray-900 font-medium">Website</p>
            <p class="text-gray-600">{{ agency.website }}</p>
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

    <!-- Social Media Section -->
    <div class="mt-8 pt-6 border-t border-gray-200">
      <p class="text-lg font-bold text-black mb-4">Follow Us</p>

      <div class="flex items-center justify-between">
        <div class="flex space-x-3">
          <a
              v-for="social in agency.socialMedia"
              :key="social.platform"
              :href="social.url"
              class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <component
                :is="getSocialIcon(social.platform)"
                class="h-5 w-5 text-gray-700 group-hover:text-white transition-colors duration-300"
            />
          </a>
        </div>
        <button
            @click="openSocialMediaPopup"
            class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center"
        >
          <span>Edit Social Media</span>
        </button>
      </div>
    </div>

    <!-- Social Media Popup -->
    <div
        v-if="isSocialMediaPopupOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeSocialMediaPopup"
    style="border-radius: 10px">
      <div class="bg-white p-6 rounded-xl shadow-2xl relative max-w-md w-full max-h-[80vh] overflow-y-auto" style="height: 400px;">
        <h3 class="text-xl font-bold text-black mb-6 border-b border-gray-200 pb-3">Edit Social Media</h3>

        <div class="space-y-4">
          <div v-for="(social, index) in editedSocialMedia" :key="index" class="p-4 border border-gray-200 rounded-lg">
            <div class="flex justify-between mb-2">
              <h4 class="font-medium">Social Platform {{ index + 1 }}</h4>
              <button
                  @click="removeSocialMedia(index)"
                  class="text-gray-500 hover:text-red-600 transition-colors duration-200"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>

            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-sm font-medium text-gray-700">Platform</label>
                <select
                    v-model="social.platform"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium text-gray-700">URL</label>
                <input
                    v-model="social.url"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </div>

        <button
            @click="addSocialMedia"
            class="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Social Media
        </button>

        <div class="flex justify-end mt-6 space-x-2">
          <button
              @click="saveSocialMediaChanges"
              class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Save
          </button>
          <button
              @click="closeSocialMediaPopup"
              class="bg-white text-black px-6 py-2 rounded-lg border border-black hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import {
  PhoneIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon
} from 'lucide-vue-next'

export default defineComponent({
  name: 'ContactCard',
  components: {
    PhoneIcon,
    GlobeAltIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
    EnvelopeIcon,
    XMarkIcon,
    PlusIcon
  },
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isEditMode = ref(false)
    const isSocialMediaPopupOpen = ref(false)
    const editedPhone = ref(props.agency.phone || '')
    const editedEmail = ref(props.agency.email || '')
    const editedWebsite = ref(props.agency.website || '')
    const editedSocialMedia = ref([...(props.agency.socialMedia || [])])

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value
    }

    const saveChanges = () => {
      emit('update:agency', {
        ...props.agency,
        phone: editedPhone.value,
        email: editedEmail.value,
        website: editedWebsite.value
      })
      isEditMode.value = false
    }

    const cancelEdit = () => {
      editedPhone.value = props.agency.phone || ''
      editedEmail.value = props.agency.email || ''
      editedWebsite.value = props.agency.website || ''
      isEditMode.value = false
    }

    const openSocialMediaPopup = () => {
      editedSocialMedia.value = [...(props.agency.socialMedia || [])]
      isSocialMediaPopupOpen.value = true
    }

    const closeSocialMediaPopup = () => {
      isSocialMediaPopupOpen.value = false
    }

    const addSocialMedia = () => {
      editedSocialMedia.value.push({
        platform: 'facebook',
        url: ''
      })
    }

    const removeSocialMedia = (index) => {
      editedSocialMedia.value.splice(index, 1)
    }

    const saveSocialMediaChanges = () => {
      emit('update:agency', {
        ...props.agency,
        socialMedia: [...editedSocialMedia.value]
      })
      isSocialMediaPopupOpen.value = false
    }

    const getSocialIcon = (platform) => {
      switch (platform.toLowerCase()) {
        case 'facebook':
          return 'FacebookIcon'
        case 'twitter':
          return 'TwitterIcon'
        case 'instagram':
          return 'InstagramIcon'
        case 'linkedin':
          return 'LinkedinIcon'
        case 'youtube':
          return 'YoutubeIcon'
        default:
          return 'GlobeAltIcon'
      }
    }

    const isFormValid = computed(() => {
      return editedPhone.value.trim() !== '' &&
          editedEmail.value.trim() !== '' &&
          editedWebsite.value.trim() !== ''
    })

    return {
      isEditMode,
      isSocialMediaPopupOpen,
      editedPhone,
      editedEmail,
      editedWebsite,
      editedSocialMedia,
      toggleEditMode,
      saveChanges,
      cancelEdit,
      openSocialMediaPopup,
      closeSocialMediaPopup,
      addSocialMedia,
      removeSocialMedia,
      saveSocialMediaChanges,
      getSocialIcon,
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

/* Custom scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.font-bold {
  font-weight: 400;
}
</style>