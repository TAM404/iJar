
// components/BasicInfoSection.vue
<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/512/5720/5720539.png" alt="Location Icon" class="h-6 w-6 mr-2" />
      Basic Information
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="propertyType" class="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
        <select
            id="propertyType"
            :value="propertyType"
            @input="$emit('update:propertyType', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
        >
          <option value="" disabled>Select property type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div>
        <label for="listingType" class="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
        <select
            id="listingType"
            :value="listingType"
            @input="$emit('update:listingType', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
        >
          <option value="" disabled>Select listing type</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
        <input
            type="number"
            id="price"
            :value="price.amount"
            @input="updatePrice('amount', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
        />
      </div>

      <div class="flex items-center mt-6">
        <input
            type="checkbox"
            id="negotiable"
            :checked="price.negotiable"
            @change="updatePrice('negotiable', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="negotiable" class="ml-2 block text-sm text-gray-700">Price Negotiable</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfoSection',
  props: {
    propertyType: {
      type: String,
      default: ''
    },
    listingType: {
      type: String,
      default: ''
    },
    price: {
      type: Object,
      default: () => ({
        amount: null,
        negotiable: false
      })
    }
  },
  methods: {
    updatePrice(field, value) {
      const updatedPrice = { ...this.price };
      if (field === 'amount') {
        updatedPrice.amount = Number(value);
      } else {
        updatedPrice[field] = value;
      }
      this.$emit('update:price', updatedPrice);
    }
  }
};
</script>