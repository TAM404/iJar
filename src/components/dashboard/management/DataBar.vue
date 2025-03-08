<template>
  <div class="bg-white shadow rounded-lg p-4 flex justify-between items-center">
    <div class="flex items-center">
      <i class="fas fa-home text-blue-500 mr-2"></i>
      <div>
        <h3 class="text-lg font-semibold">Owned Properties</h3>
        <p class="text-2xl">{{ ownedProperties }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <i class="fas fa-dollar-sign text-green-500 mr-2"></i>
      <div>
        <h3 class="text-lg font-semibold">Properties Sold</h3>
        <p class="text-2xl">{{ propertiesSold }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataBar',
  props: {
    ownedProperties: {
      type: Number,
      required: true
    },
    propertiesSold: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>