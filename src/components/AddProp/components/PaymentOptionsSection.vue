
// components/PaymentOptionsSection.vue
<template>
  <div>
    <h2 class="text-xl font-semibold text-black border-b border-gray-200 pb-2 mb-4 flex items-center">
      <img src="https://cdn-icons-png.flaticon.com/128/10218/10218972.png" alt="Location Icon" class="h-6 w-6 mr-2" />Payment Options</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex items-center">
        <input
            type="checkbox"
            id="mortgageAvailable"
            :checked="paymentOptions.mortgage_available"
            @change="updatePaymentOption('mortgage_available', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="mortgageAvailable" class="ml-2 block text-sm text-gray-700">Mortgage Available</label>
      </div>

      <div class="flex items-center">
        <input
            type="checkbox"
            id="installments"
            :checked="paymentOptions.installments"
            @change="updatePaymentOption('installments', $event.target.checked)"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label for="installments" class="ml-2 block text-sm text-gray-700">Installments</label>
      </div>

      <div v-if="paymentOptions.installments">
        <label for="downPayment" class="block text-sm font-medium text-gray-700 mb-1">Down Payment (USD)</label>
        <input
            type="number"
            id="downPayment"
            :value="paymentOptions.down_payment"
            @input="updatePaymentOption('down_payment', Number($event.target.value))"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptionsSection',
  props: {
    paymentOptions: {
      type: Object,
      required: true
    }
  },
  methods: {
    updatePaymentOption(field, value) {
      const updatedOptions = { ...this.paymentOptions, [field]: value };
      this.$emit('update:paymentOptions', updatedOptions);
    }
  }
};
</script>