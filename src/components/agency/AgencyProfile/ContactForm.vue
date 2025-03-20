<template>
  <div class="bg-gray-50 rounded-lg shadow-md p-6 sticky" style="height: 642px; top: 101px;">
    <h2 class="text-xl font-bold mb-4">Contact {{ agencyName }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
              type="text"
              id="name"
              v-model="formData.name"
              class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black transition-all"
              placeholder="John Doe"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
              type="email"
              id="email"
              v-model="formData.email"
              class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black transition-all"
              placeholder="john@example.com"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black transition-all"
              placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label for="interest" class="block text-sm font-medium text-gray-700 mb-1">I'm interested in</label>
          <select
              id="interest"
              v-model="formData.interest"
              class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black bg-white transition-all"
          >
            <option value="" disabled>Select an option</option>
            <option value="buying">Buying a property</option>
            <option value="selling">Selling a property</option>
            <option value="renting">Renting a property</option>
            <option value="investing">Real estate investment</option>
            <option value="other">Other services</option>
          </select>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
              id="message"
              rows="4"
              v-model="formData.message"
              class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black resize-none transition-all"
              placeholder="How can we help you?"
          ></textarea>
        </div>

        <div class="pt-2">
          <button
              type="submit"
              class="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
              :class="{'opacity-75': isSubmitting}"
              :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </div>

        <div v-if="formSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded flex items-start">
          <svg class="h-5 w-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <p>Thank you for your message! We'll get back to you shortly.</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    agencyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      },
      isSubmitting: false,
      formSuccess: false
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmitting = true;

      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.formSuccess = true;

        // Reset form after success
        this.formData = {
          name: '',
          email: '',
          phone: '',
          interest: '',
          message: ''
        };

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      }, 1500);

      // In a real application, you would send the data to your backend
      // Example with axios:
      // axios.post('/api/contact', this.formData)
      //   .then(response => {
      //     this.isSubmitting = false;
      //     this.formSuccess = true;
      //     this.resetForm();
      //   })
      //   .catch(error => {
      //     this.isSubmitting = false;
      //     // Handle error
      //   });
    }
  }
};
</script>

<style scoped>
/* Input focus effects */
input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

/* Custom placeholder color */
::placeholder {
  color: #9ca3af;
  opacity: 0.8;
}

/* Smooth transition on all form elements */
input, select, textarea, button {
  transition: all 0.2s ease;
}

/* Remove default focus outline on all browsers */
button:focus {
  outline: none;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>