<template>
  <div class="space-y-8 animate-fade-in">
    <h2 class="text-2xl font-medium text-gray-900 mb-6 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/14436/14436095.png" alt="Icon" class="h-6 w-6 mr-2" />
      Performance and Achievements
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Year Founded</label>
        <input
            v-model.number="agency.yearFounded"
            type="number"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Enter founding year"
            min="1800"
            :max="currentYear"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-gray-700 font-medium">Properties Sold</label>
        <input
            v-model.number="agency.propertiesSold"
            type="number"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800 bg-white placeholder-gray-400 shadow-sm"
            placeholder="Enter total properties sold"
            min="0"
        />
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <label class="block text-sm text-gray-700 font-medium">Agency Awards</label>
        <button
            @click="addAward"
            class="group px-5 py-2.5 bg-black text-white rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center space-x-2"
        >
          <span class="tracking-wide text-sm">Add Award</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div v-if="!agency.awards || agency.awards.length === 0" class="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
        <p class="text-gray-500">No awards added yet</p>
      </div>

      <div v-else class="space-y-3">
        <div
            v-for="(award, index) in agency.awards"
            :key="index"
            class="flex space-x-4 items-center bg-gray-50 p-4 rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-200"
        >
          <div class="flex-grow grid grid-cols-1 md:grid-cols-5 gap-4">
            <div class="md:col-span-3">
              <input
                  v-model="award.title"
                  type="text"
                  placeholder="Award Title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div class="md:col-span-2">
              <input
                  v-model="award.year"
                  type="number"
                  placeholder="Year"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  min="1800"
                  :max="currentYear"
              />
            </div>
          </div>
          <button
              @click="removeAward(index)"
              class="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Remove award"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <label class="block text-sm text-gray-700 font-medium">Social Media Links</label>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
            v-for="(social, index) in socialMediaArray"
            :key="index"
            class="flex space-x-3 items-center"
        >
          <div class="w-32">
            <select
                v-model="social.platform"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div class="flex-grow relative">
            <input
                v-model="social.url"
                type="text"
                placeholder="Profile URL"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <!-- Simple icon indicators instead of component -->
              <span v-if="social.platform === 'facebook'" class="text-blue-600">f</span>
              <span v-else-if="social.platform === 'instagram'" class="text-pink-600">ig</span>
              <span v-else-if="social.platform === 'twitter'" class="text-blue-400">tw</span>
              <span v-else-if="social.platform === 'linkedin'" class="text-blue-800">in</span>
              <span v-else-if="social.platform === 'youtube'" class="text-red-600">yt</span>
              <span v-else-if="social.platform === 'tiktok'" class="text-gray-800">tt</span>
              <span v-else class="text-gray-400">@</span>
            </div>
          </div>

          <button
              v-if="index > 0"
              @click="removeSocial(index)"
              class="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Remove social media"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div>
          <button
              @click="addSocial"
              class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <span>Add Social Media</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceAchievements',
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    socialMediaArray() {
      // Ensure we always have an array to work with
      if (!this.agency.socialMedia || !Array.isArray(this.agency.socialMedia)) {
        this.$set(this.agency, 'socialMedia', [{ platform: 'instagram', url: '' }]);
      }
      return this.agency.socialMedia;
    }
  },
  methods: {
    addAward() {
      if (!this.agency.awards) {
        this.$set(this.agency, 'awards', []);
      }
      this.agency.awards.push({ title: '', year: new Date().getFullYear() });
    },
    removeAward(index) {
      this.agency.awards.splice(index, 1);
    },
    addSocial() {
      if (!this.agency.socialMedia) {
        this.$set(this.agency, 'socialMedia', []);
      }
      this.agency.socialMedia.push({ platform: 'instagram', url: '' });
    },
    removeSocial(index) {
      if (this.agency.socialMedia.length > 1) {
        this.agency.socialMedia.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

input, select, button {
  transition: all 0.2s ease;
}
</style>