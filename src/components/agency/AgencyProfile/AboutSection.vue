<template>
  <div class="lg:col-span-2 bg-white rounded-2xl p-8 transform shadow-sm hover:shadow-md transition-shadow duration-300 relative">
    <h2 class="text-3xl font-bold text-black mb-6 border-b border-gray-200 pb-3">About Us</h2>

    <!-- Description Section -->
    <div v-if="isEditMode" class="mb-8">
      <textarea
          v-model="editedDescription"
          class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          style="height: 180px; font-size: 16px;"
      ></textarea>
    </div>
    <p v-else class="text-gray-800 leading-relaxed text-lg mb-8">{{ agency.description }}</p>

    <!-- Edit Controls -->
    <div v-if="isEditMode" class="absolute top-4 right-4 flex space-x-2">
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
    <button
        v-else
        @click="toggleEditMode"
        class="bg-black text-white px-6 py-2 rounded-lg absolute top-4 right-4 hover:bg-gray-800 transition-colors duration-200"
    >
      Edit
    </button>

    <!-- Services Section -->
    <div class="mt-12">
      <h3 class="text-2xl font-bold text-black mb-6 flex items-center">
        Our Premium Services
      </h3>
      <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
            v-for="(service, index) in allServices"
            :key="index"
            class="bg-gray-50 rounded-lg p-5 flex items-center transform transition-all duration-300 hover:bg-gray-100 border border-transparent hover:border-gray-300"
        >
          <div class="bg-black p-2 rounded-lg mr-4">
            <img :src="service.icon" class="h-8 w-8 invert" />
          </div>
          <input
              v-model="editedServiceNames[index]"
              class="w-full p-2 border-b border-gray-300 bg-transparent focus:border-black focus:outline-none"
              placeholder="Service name"
          />
          <input
              type="checkbox"
              :checked="isServiceSelected(index)"
              @change="toggleService(index)"
              class="h-5 w-5 rounded border-gray-300 text-black focus:ring-black ml-2"
          />
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
            v-for="(service, index) in agency.services"
            :key="index"
            class="bg-gray-50 rounded-lg p-5 flex items-center transform transition-all duration-300 hover:bg-gray-100 border border-transparent hover:border-gray-300"
        >
          <div class="bg-black p-2 rounded-lg mr-4">
            <img :src="getServiceIcon(index)" class="h-8 w-8 invert" />
          </div>
          <span class="text-gray-800 font-medium">{{ service }}</span>
        </div>
      </div>
    </div>

    <!-- Awards Section -->
    <div class="mt-12">
      <h3 class="text-2xl font-bold text-black mb-6 flex items-center">
        <div class="bg-black p-2 rounded-lg mr-3">
          <img src="https://cdn-icons-png.flaticon.com/512/470/470181.png" class="h-6 w-6 invert" />
        </div>
        Awards & Recognition
      </h3>
      <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
            v-for="(award, index) in editedAwards"
            :key="index"
            class="award-card group"
        >
          <input
              v-model="award.title"
              class="award-input font-semibold text-black w-full mb-2 focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Award title"
          />
          <input
              v-model="award.year"
              class="award-input text-sm text-gray-600 w-full focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Year received"
          />
          <button
              @click="deleteAward(index)"
              class="bg-white text-black px-4 py-2 rounded-lg mt-2 border border-black hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
          >
            Remove
          </button>
        </div>
        <button
            @click="addAward"
            class="h-full min-h-24 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-200"
        >
          <span class="text-gray-500 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Award
          </span>
        </button>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
            v-for="award in agency.awards"
            :key="award.year"
            class="award-card group"
        >
          <div class="font-bold text-black">{{ award.title }}</div>
          <div class="text-sm text-gray-600">{{ award.year }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import IntegratedTestimonials from "./IntegratedTestimonials.vue";

export default defineComponent({
  name: 'AboutSection',
  components: {IntegratedTestimonials},
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isEditMode = ref(false);
    const editedDescription = ref(props.agency.description);
    const editedServices = ref([...props.agency.services]);
    const editedServiceNames = ref([...props.agency.services]);
    const editedAwards = ref([...props.agency.awards]);

    const allServices = ref([
      { icon: 'https://cdn-icons-png.flaticon.com/512/1831/1831669.png', name: 'Digital Marketing' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/869/869687.png', name: 'Web Development' },
      { icon: 'https://cdn-icons-png.flaticon.com/512/3137/3137668.png', name: 'Social Media' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/478/478544.png', name: 'SEO' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/2302/2302739.png', name: 'Content Creation' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/11445/11445709.png', name: 'Email Marketing' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/18949/18949071.png', name: 'Analytics' },
      { icon: 'https://cdn-icons-png.flaticon.com/128/14816/14816148.png', name: 'Branding' }
    ]);

    // Initialize service names if they don't exist
    if (editedServiceNames.value.length < allServices.value.length) {
      allServices.value.forEach((service, index) => {
        if (!editedServiceNames.value[index]) {
          editedServiceNames.value[index] = service.name;
        }
      });
    }

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const saveChanges = () => {
      // Filter selected services
      const selectedServices = [];
      editedServices.value.forEach((_, index) => {
        if (isServiceSelected(index)) {
          selectedServices.push(editedServiceNames.value[index]);
        }
      });

      emit('update:agency', {
        ...props.agency,
        description: editedDescription.value,
        services: selectedServices,
        awards: editedAwards.value
      });
      isEditMode.value = false;
    };

    const cancelEdit = () => {
      editedDescription.value = props.agency.description;
      editedServices.value = [...props.agency.services];
      editedServiceNames.value = [...props.agency.services];
      editedAwards.value = [...props.agency.awards];
      isEditMode.value = false;
    };

    const addAward = () => {
      editedAwards.value.push({ title: '', year: '' });
    };

    const deleteAward = (index) => {
      editedAwards.value.splice(index, 1);
    };

    const getServiceIcon = (index) => {
      return allServices.value[index] ? allServices.value[index].icon : '';
    };

    const isServiceSelected = (index) => {
      return editedServices.value.includes(editedServiceNames.value[index]);
    };

    const toggleService = (index) => {
      const serviceName = editedServiceNames.value[index];
      if (isServiceSelected(index)) {
        editedServices.value = editedServices.value.filter(s => s !== serviceName);
      } else {
        editedServices.value.push(serviceName);
      }
    };

    const isFormValid = computed(() => {
      return editedDescription.value.trim() !== '' &&
          editedAwards.value.every(award => award.title.trim() !== '' && award.year !== '');
    });

    return {
      isEditMode,
      editedDescription,
      editedServices,
      editedServiceNames,
      editedAwards,
      allServices,
      toggleEditMode,
      saveChanges,
      cancelEdit,
      addAward,
      deleteAward,
      getServiceIcon,
      isServiceSelected,
      toggleService,
      isFormValid
    };
  }
});
</script>

<style scoped>
.award-card {
  background: white;
  border-left: 4px solid black;
  border-radius: 0.5rem;
  padding: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.award-card:hover {
  transform: translateX(0.25rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.award-input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;
}

/* Custom focus styles */
button:focus, input:focus, textarea:focus {
  outline: 2px solid black;
  outline-offset: 2px;
}

/* Clean animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
.font-bold {
  font-weight: 400;
}
</style>