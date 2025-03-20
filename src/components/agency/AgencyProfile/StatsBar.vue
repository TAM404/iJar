<template>
  <div class="bg-white relative z-10 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style="font-family:Poppins,sans-serif;max-width: 98rem">
      <div class="flex justify-end mb-2 absolute top-0 right-4" v-if="!isEditMode" style="top: -18px; right: 37px;">
        <button

            @click="toggleEditMode"
            class="bg-black text-white px-6 py-2 rounded-lg absolute top-0 right-0 hover:bg-gray-800 transition-colors duration-200"
        >
          Edit
        </button>
      </div>
      <div class="flex justify-end mb-2 absolute top-4 right-4" style="top: -18px; right: -38px;" v-else>
        <button
            @click="saveChanges"
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

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style="border-bottom-width: 1px;">
        <!-- Year Founded -->
        <div class="flex items-center p-3 bg-white custom-shadow transition-shadow duration-300 border-b">
          <img src="https://cdn-icons-png.flaticon.com/512/591/591638.png" class="h-8 w-8 flex-shrink-0" alt="calendar icon" style="margin-left: 32%;" />
          <div class="ml-3">
            <span v-if="!isEditMode" class="mytext-2xl font-medium text-gray-800 block">{{ agency.year_founded }}</span>
            <input
                v-else
                type="number"
                v-model="editedAgency.year_founded"
                class="mytext-2xl font-medium text-gray-800 block w-20 border border-gray-300 rounded px-2"
            />
            <span class="text-gray-500 text-xs font-medium">ESTABLISHED</span>
          </div>
        </div>

        <!-- Properties Sold -->
        <div class="flex items-center p-3 bg-white custom-shadow transition-shadow duration-300 border-b">
          <img src="https://cdn-icons-png.flaticon.com/512/5101/5101038.png" class="h-8 w-8 flex-shrink-0" alt="home icon" style="margin-left: 32%;" />
          <div class="ml-3">
            <span v-if="!isEditMode" class="mytext-2xl font-medium text-gray-800 block">{{ agency.properties_sold }}+</span>
            <div v-else class="flex items-center">
              <input
                  type="number"
                  v-model="editedAgency.properties_sold"
                  class="mytext-2xl font-medium text-gray-800 block w-20 border border-gray-300 rounded px-2"
              />
              <span class="font-medium text-gray-800">+</span>
            </div>
            <span class="text-gray-500 text-xs font-medium">PROPERTIES SOLD</span>
          </div>
        </div>

        <!-- Agents Count -->
        <div class="flex items-center p-3 bg-white custom-shadow transition-shadow duration-300 border-b">
          <img src="https://cdn-icons-png.flaticon.com/512/913/913395.png" class="h-8 w-8 flex-shrink-0" alt="agents icon" style="margin-left: 32%;" />
          <div class="ml-3">
            <span v-if="!isEditMode" class="mytext-2xl font-medium text-gray-800 block">{{ agency.agents_count }}</span>
            <input
                v-else
                type="number"
                v-model="editedAgency.agents_count"
                class="mytext-2xl font-medium text-gray-800 block w-20 border border-gray-300 rounded px-2"
            />
            <span class="text-gray-500 text-xs font-medium">EXPERT AGENTS</span>
          </div>
        </div>

        <!-- Client Satisfaction -->
        <div class="flex items-center p-3 bg-white custom-shadow transition-shadow duration-300 border-b">
          <img src="https://cdn-icons-png.flaticon.com/512/6543/6543894.png" class="h-8 w-8 flex-shrink-0" alt="satisfaction icon" style="margin-left: 32%;" />
          <div class="ml-3">
            <span v-if="!isEditMode" class="mytext-2xl font-medium text-gray-800 block">{{ agency.client_satisfaction }}%</span>
            <div v-else class="flex items-center">
              <input
                  type="number"
                  v-model="editedAgency.client_satisfaction"
                  class="mytext-2xl font-medium text-gray-800 block w-20 border border-gray-300 rounded px-2"
                  min="0"
                  max="100"
              />
              <span class="font-medium text-gray-800">%</span>
            </div>
            <span class="text-gray-500 text-xs font-medium">CLIENT SATISFACTION</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'StatsBar',
  props: {
    agency: {
      type: Object,
      required: true
    }
  },
  emits: ['update:agency'],
  setup(props, { emit }) {
    const isEditMode = ref(false);
    const editedAgency = ref({ ...props.agency });

    const toggleEditMode = () => {
      isEditMode.value = true;
      editedAgency.value = { ...props.agency };
    };

    const saveChanges = () => {
      emit('update:agency', editedAgency.value);
      isEditMode.value = false;
    };

    const cancelEdit = () => {
      isEditMode.value = false;
    };

    return {
      isEditMode,
      editedAgency,
      toggleEditMode,
      saveChanges,
      cancelEdit
    };
  }
});
</script>

<style scoped>
.border-b {
  border-bottom: 0 solid #e5e7eb;
}
.mytext-2xl {
  font-size: 1.2rem;
  line-height: 2rem;
}
/*
.custom-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);


/* Hover effect for card items
.custom-shadow:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
*/
/* Smooth transitions */
input {
  transition: all 0.2s ease-in-out;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}
</style>