<template>
  <div class="bg-white shadow rounded-lg p-4">
    <h3 class="text-lg font-semibold">{{ property.name }}</h3>
    <p>{{ property.description }}</p>
    <p><strong>Address:</strong> {{ property.address }}</p>
    <p><strong>Price:</strong> ${{ property.price }}</p>
    <p><strong>Size:</strong> {{ property.size }} sq ft</p>
    <p><strong>Bedrooms:</strong> {{ property.bedrooms }}</p>
    <p><strong>Bathrooms:</strong> {{ property.bathrooms }}</p>
    <p><strong>Year Built:</strong> {{ property.yearBuilt }}</p>
    <p><strong>Status:</strong> {{ property.status }}</p>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>