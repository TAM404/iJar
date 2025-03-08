<template>
  <div>
    <DataBar :ownedProperties="ownedProperties" :propertiesSold="propertiesSold" />
    <PropertyListManagement :properties="properties" :agencyId="agencyId" />
  </div>
</template>

<script>
import DataBar from './DataBar.vue';
import PropertyListManagement from './PropertyListManagement.vue';

export default {
  name: 'ManagementPage',
  components: {
    DataBar,
    PropertyListManagement
  },
  data() {
    return {
      ownedProperties: 10, // Example data, replace with actual data
      propertiesSold: 5, // Example data, replace with actual data
      properties: [
        { id: 1, name: 'Property 1', description: 'Description of Property 1' },
        { id: 2, name: 'Property 2', description: 'Description of Property 2' }
      ],
      agencyId: '123' // Example agency ID, replace with actual ID
    };
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>