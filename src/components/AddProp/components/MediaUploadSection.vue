<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/3310/3310910.png" alt="Location Icon" class="h-6 w-6 mr-2" />Media</h2>
    <div class="space-y-4">
      <!-- Property Images Section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="mb-1 text-sm text-gray-500">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB each)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" multiple @change="handleImageUpload" />
          </label>
        </div>
        <div v-if="uploadedImages.length > 0" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="(image, index) in uploadedImages" :key="index" class="relative group">
            <img :src="image.preview" class="h-24 w-full object-cover rounded-md" />
            <button
                @click="removeImageHandler(index)"
                class="absolute top-1 right-1 bg-black bg-opacity-70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Property Video Tour Section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Property Video Tour</label>
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <p class="mb-1 text-sm text-gray-500">Click to upload a video tour</p>
              <p class="text-xs text-gray-500">MP4, MOV or WEBM (MAX. 50MB)</p>
            </div>
            <input id="video-file" type="file" class="hidden" accept="video/*" @change="handleVideoUpload" />
          </label>
        </div>
        <div v-if="uploadedVideo" class="mt-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm text-gray-700">{{ uploadedVideo.name }}</span>
            <button
                @click="removeVideoHandler"
                class="text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaUploadSection',
  props: {
    uploadedImages: {
      type: Array,
      default: () => []
    },
    uploadedVideo: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleImageUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      const newImages = [...this.uploadedImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should not exceed 5MB');
          continue;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            file,
            preview: e.target.result,
            name: file.name
          });
          this.$emit('update:images', newImages);
        };
        reader.readAsDataURL(file);
      }
    },

    removeImageHandler(index) {
      this.$emit('remove:image', index);
    },

    handleVideoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 50 * 1024 * 1024) {
        alert('Video size should not exceed 50MB');
        return;
      }

      this.$emit('update:video', file);
    },

    removeVideoHandler() {
      this.$emit('remove:video');
    }
  }
}
</script>