<template>
  <div class="e" style=" font-family:poppins, sans-serif">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p class="text-gray-600">Join our platform today</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="mb-6">
        <!-- Full Name -->
        <div class="mb-5">
          <label for="fullName" class="block mb-2 text-sm font-medium text-gray-800">Full Name</label>
          <input
              id="fullName"
              v-model="form.fullName"
              type="text"
              placeholder="John Doe"
              :class="{'border-red-500': errors.fullName, 'border-gray-300': !errors.fullName, 'focus:border-indigo-800 focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20': true}"
              class="w-full px-4 py-3 rounded-md border outline-none text-gray-700 transition duration-300"
              @focus="clearError('fullName')"
          >
          <span v-if="errors.fullName" class="text-xs text-red-500 mt-1 block">{{ errors.fullName }}</span>
        </div>

        <!-- Email -->
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-800">Email Address</label>
          <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="john.doe@example.com"
              :class="{'border-red-500': errors.email, 'border-gray-300': !errors.email, 'focus:border-indigo-800 focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20': true}"
              class="w-full px-4 py-3 rounded-md border outline-none text-gray-700 transition duration-300"
              @focus="clearError('email')"
          >
          <span v-if="errors.email" class="text-xs text-red-500 mt-1 block">{{ errors.email }}</span>
        </div>

        <!-- Password -->
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
          <div class="relative">
            <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :class="{'border-red-500': errors.password, 'border-gray-300': !errors.password, 'focus:border-indigo-800 focus:ring-2 focus:ring-indigo-800 focus:ring-opacity-20': true}"
                class="w-full px-4 py-3 rounded-md border outline-none text-gray-700 transition duration-300 pr-20"
                @focus="clearError('password')"
            >
            <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs uppercase font-semibold tracking-wide text-gray-500 hover:text-indigo-800 transition"
                @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <span v-if="errors.password" class="text-xs text-red-500 mt-1 block">{{ errors.password }}</span>

          <!-- Password Strength Meter -->
          <div v-if="form.password" class="mt-2">
            <div class="h-1 w-full bg-gray-200 rounded-sm overflow-hidden">
              <div
                  :class="{
                  'bg-red-500': passwordStrength < 50,
                  'bg-yellow-500': passwordStrength >= 50 && passwordStrength < 75,
                  'bg-green-500': passwordStrength >= 75
                }"
                  class="h-full transition-all duration-300"
                  :style="{ width: passwordStrength + '%' }"
              ></div>
            </div>
            <span class="text-xs text-gray-500 mt-1 block">{{ strengthText }}</span>
          </div>
        </div>  

        <!-- Terms Checkbox -->
        <div class="mb-6 flex items-start">
          <input
              id="terms"
              v-model="form.terms"
              type="checkbox"
              :class="{'border-red-500': errors.terms}"
              class="mt-1 mr-3 text-indigo-800 focus:ring-indigo-800"
              @change="clearError('terms')"
          >
          <div>
            <label for="terms" class="text-sm text-gray-700">
              I agree to the <a href="#" class="text-indigo-800 font-medium hover:underline">Terms of Service</a> and <a href="#" class="text-indigo-800 font-medium hover:underline">Privacy Policy</a>
            </label>
            <span v-if="errors.terms" class="text-xs text-red-500 mt-1 block">{{ errors.terms }}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button
            type="submit"
            class="w-full py-3 px-4 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold rounded-md transition duration-300 flex justify-center items-center"
            style="background-color: rgb(62, 81, 144);"
        >
          <span v-if="!loading">Create Account</span>
          <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <!-- Or Divider -->
      <div class="relative flex py-4 items-center mb-5">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="flex-shrink mx-4 text-sm text-gray-500">or sign up with</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <!-- Google Sign Up -->
      <div class="flex justify-center mb-6">
        <button class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300 w-full max-w-xs text-gray-700 font-medium">
          <img src="https://cdn-icons-png.flaticon.com/512/281/281747.png" alt="google icon" style="width:18px; height:18px">
          Google
        </button>
      </div>

      <!-- Login Link -->
      <p class="text-center text-sm text-gray-600">
        Already have an account? <router-link to="/login" class="text-indigo-800 font-medium hover:underline">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        terms: false
      },
      errors: {
        fullName: '',
        email: '',
        password: '',
        terms: ''
      },
      showPassword: false,
      loading: false
    }
  },
  computed: {
    passwordStrength() {
      if (!this.form.password) return 0;

      let strength = 0;

      // Length check
      if (this.form.password.length >= 8) strength += 25;

      // Contains lowercase
      if (/[a-z]/.test(this.form.password)) strength += 25;

      // Contains uppercase
      if (/[A-Z]/.test(this.form.password)) strength += 25;

      // Contains number or special char
      if (/[0-9!@#$%^&*]/.test(this.form.password)) strength += 25;

      return strength;
    },
    strengthClass() {
      if (this.passwordStrength < 50) return 'weak';
      if (this.passwordStrength < 75) return 'medium';
      return 'strong';
    },
    strengthText() {
      if (this.passwordStrength < 50) return 'Weak';
      if (this.passwordStrength < 75) return 'Medium';
      return 'Strong';
    }
  },
  methods: {
    handleSubmit() {
      // Reset errors
      this.errors = {
        fullName: '',
        email: '',
        password: '',
        terms: ''
      };

      // Validate form
      let isValid = true;

      if (!this.form.fullName.trim()) {
        this.errors.fullName = 'Full name is required';
        isValid = false;
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!this.form.password) {
        this.errors.password = 'Password is required';
        isValid = false;
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters';
        isValid = false;
      }

      if (!this.form.terms) {
        this.errors.terms = 'You must agree to the terms';
        isValid = false;
      }

      if (isValid) {
        // Submit form
        this.loading = true;

        // Simulate API call
        setTimeout(() => {
          this.loading = false;
          alert('Account created successfully!');
          // Reset form after submission
          this.form = {
            fullName: '',
            email: '',
            password: '',
            terms: false
          };
        }, 1500);
      }
    },
    clearError(field) {
      this.errors[field] = '';
    }
  }
}
</script>