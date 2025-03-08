<template>
  <div class="mt-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Property List</h2>
      <router-link :to="`/addProperty/owner/${agencyId}`" class="group px-8 py-3 bg-black text-white rounded-md font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 bg-black">
        Add New Property
      </router-link>
    </div>
    <ul class="space-y-4" style="background: #6f789830; border-radius: 12px; padding: 12px;">
      <li v-for="property in properties" :key="property.id">
        <PropertyCard :property="property" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePropertyStore } from '@/stores/propertyStore';
import PropertyCard from './PropertyCard.vue';

export default {
  name: 'PropertyListManagement',
  components: {
    PropertyCard
  },
  props: {
    agencyId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const propertyStore = usePropertyStore();
    const properties = ref([]);

    onMounted(async () => {
      await propertyStore.fetchPropertiesByAgency(props.agencyId);
      properties.value = propertyStore.properties;
    });

    return {
      properties
    };
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>