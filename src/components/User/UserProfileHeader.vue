<template>
  <div>
    <!-- Profile Header - View Mode -->
    <div v-if="!isEditing" class="flex flex-col md:flex-row items-start gap-8 mb-12">
      <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img v-if="user.profileImage" :src="user.profileImage" :alt="user.name" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center bg-black text-white text-2xl font-bold">
          {{ getUserInitials() }}
        </div>
      </div>

      <div class="flex-grow">
        <h1 class="text-3xl font-bold text-black mb-2">{{ user.name }}</h1>
        <p class="text-gray-600 mb-4">Member since {{ formatDate(user.joinDate) }}</p>

        <div class="flex flex-wrap gap-4 mb-6">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{{ user.email }}</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{{ user.phone }}</span>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ user.location }}</span>
          </div>
        </div>

        <div class="flex gap-4">
          <button @click="startEditing" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Edit Profile
          </button>
          <button class="border border-black text-black px-6 py-2 rounded-md hover:bg-gray-100 transition">
            Settings
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Header - Edit Mode -->
    <div v-else class="bg-white p-6 rounded-lg shadow-sm mb-12">
      <h2 class="text-2xl font-bold mb-6">Edit Profile</h2>

      <div class="flex flex-col md:flex-row items-start gap-8 mb-6">
        <div class="w-32 flex-shrink-0">
          <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
            <img v-if="editedUser.profileImage || previewImage"
                 :src="previewImage || editedUser.profileImage"
                 alt="Profile image"
                 class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center bg-black text-white text-2xl font-bold">
              {{ getUserEditedInitials() }}
            </div>
          </div>

          <label class="block cursor-pointer text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition text-sm">
            <input type="file" @change="handleImageUpload" accept="image/*" class="hidden">
            Change Photo
          </label>
        </div>

        <div class="flex-grow w-full md:w-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                  v-model="editedUser.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                  v-model="editedUser.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                  v-model="editedUser.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                  v-model="editedUser.location"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                  v-model="editedUser.bio"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              ></textarea>
            </div>
          </div>

          <h3 class="font-medium text-lg mt-6 mb-3">Your Preferences</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Property Types</label>
              <div class="space-y-2">
                <div v-for="(type, index) in availablePropertyTypes" :key="index" class="flex items-center">
                  <input
                      :id="`property-type-${index}`"
                      type="checkbox"
                      :value="type"
                      v-model="editedUser.preferences.propertyTypes"
                      class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label :for="`property-type-${index}`" class="ml-2 text-sm text-gray-700">{{ type }}</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Min</label>
                  <input
                      v-model.number="editedUser.preferences.priceRangeMin"
                      type="number"
                      min="0"
                      step="10000"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Max</label>
                  <input
                      v-model.number="editedUser.preferences.priceRangeMax"
                      type="number"
                      min="0"
                      step="10000"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Areas</label>
              <div class="relative">
                <input
                    v-model="newArea"
                    @keydown.enter.prevent="addArea"
                    type="text"
                    placeholder="Type and press Enter"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                    @click="addArea"
                    class="absolute right-2 top-2 text-gray-500 hover:text-black"
                    type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                    v-for="(area, index) in editedUser.preferences.areas"
                    :key="index"
                    class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center"
                >
                  {{ area }}
                  <button @click="removeArea(index)" class="ml-1 text-gray-500 hover:text-black" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bedrooms & Bathrooms</label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Bedrooms</label>
                  <select
                      v-model="editedUser.preferences.bedrooms"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option v-for="n in 5" :key="`bed-${n}`" :value="n">{{ n }}+</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Bathrooms</label>
                  <select
                      v-model="editedUser.preferences.bathrooms"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option v-for="n in 5" :key="`bath-${n}`" :value="n">{{ n }}+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-4 mt-8">
            <button @click="saveChanges" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Save Changes
            </button>
            <button @click="cancelEditing" class="border border-black text-black px-6 py-2 rounded-md hover:bg-gray-100 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileHeader',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedUser: null,
      previewImage: null,
      newArea: '',
      availablePropertyTypes: [
        'Apartment',
        'House',
        'Condo',
        'Townhouse',
        'Loft',
        'Studio',
        'Penthouse',
        'Duplex',
        'Villa'
      ]
    };
  },
  methods: {
    getUserInitials() {
      return this.user.name.split(' ').map(n => n[0]).join('');
    },
    getUserEditedInitials() {
      return this.editedUser.name.split(' ').map(n => n[0]).join('');
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    startEditing() {
      // Create a deep copy of the user object to avoid modifying the original
      this.editedUser = JSON.parse(JSON.stringify(this.user));

      // Add bio field if it doesn't exist
      if (!this.editedUser.bio) {
        this.editedUser.bio = '';
      }

      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
      this.previewImage = null;
    },
    saveChanges() {
      // Here you would typically send the updated user data to your backend
      // For now, we'll emit an event with the updated user data
      this.$emit('update-user', this.editedUser);

      // In a real app, you might want to do something like:
      /*
      try {
        await axios.put('/api/user/profile', this.editedUser);
        // Show success message
      } catch (error) {
        // Handle error
      }
      */

      this.isEditing = false;
      this.previewImage = null;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Check file type and size
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size should not exceed 5MB');
        return;
      }

      // Create a preview
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImage = e.target.result;

        // In a real application, you would upload the file to your server
        // and get back a URL, which you would then assign to editedUser.profileImage
        // For now, we'll just use the data URL for demonstration
        this.editedUser.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    addArea() {
      if (!this.newArea.trim()) return;

      // Check if area already exists
      if (!this.editedUser.preferences.areas.includes(this.newArea.trim())) {
        this.editedUser.preferences.areas.push(this.newArea.trim());
      }

      this.newArea = '';
    },
    removeArea(index) {
      this.editedUser.preferences.areas.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Optional - add any necessary styles here */
input[type="file"] {
  display: none;
}
</style>