<template>
  <div class="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-screen-2xl mx-auto" style="max-width: 105rem">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-black">Submit Your Property</h1>
        <p class="mt-2 text-gray-600">List your property on our platform in just a few steps</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8 mx-auto max-w-3xl">
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
              class="h-full bg-black transition-all duration-300 ease-out rounded-full"
              :style="{ width: `${(currentTabIndex / (tabs.length - 1)) * 100}%` }"
          ></div>
        </div>
        <div class="text-right mt-1 text-sm text-gray-500">
          Step {{ currentTabIndex + 1 }} of {{ tabs.length }}
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Form Section (Left Side) -->
        <div class="flex-1">
          <form @submit.prevent="submitProperty" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <!-- Tab Navigation -->
            <div class="border-b border-gray-200 mb-8">
              <nav class="flex -mb-px overflow-x-auto">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    type="button"
                    @click="activeTab = tab.id"
                    :class="[
                    'py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <div
                        :class="[
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                        isTabCompleted(tab.id)

                          ? 'bg-green-100 text-green-800'
                          : activeTab === tab.id
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-500'
                      ]"
                    >
                      <svg v-if="isTabCompleted(tab.id)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span v-else>{{ tabIndex(tab.id) + 1 }}</span>
                    </div>
                    <span>{{ tab.name }}</span>
                  </div>
                </button>
              </nav>
            </div>

            <!-- Tab Content -->
            <div v-if="activeTab === 'basic-info'" class="space-y-6">
              <BasicInfoSection
                  :propertyType="property.property_details.type"
                  :listingType="property.listing.type"
                  :price="property.listing.price"
                  @update:propertyType="property.property_details.type = $event"
                  @update:listingType="property.listing.type = $event"
                  @update:price="property.listing.price = $event"
              />
            </div>

            <div v-if="activeTab === 'property-details'" class="space-y-6">
              <PropertyDetailsSection
                  :propertyDetails="property.property_details"
                  @update:propertyDetails="property.property_details = $event"
              />
            </div>

            <div v-if="activeTab === 'payment-options'" class="space-y-6">
              <PaymentOptionsSection
                  :paymentOptions="property.listing.payment_options"
                  @update:paymentOptions="property.listing.payment_options = $event"
              />
            </div>

            <div v-if="activeTab === 'amenities'" class="space-y-6">
              <AmenitiesSection
                  :amenities="property.amenities"
                  @update:amenities="property.amenities = $event"
              />
            </div>

            <div v-if="activeTab === 'location'" class="space-y-6">
              <LocationSection
                  :location="property.location"
                  @update:location="property.location = $event"
              />
            </div>

            <div v-if="activeTab === 'media'" class="space-y-6">
              <MediaUploadSection
                  :uploadedImages="uploadedImages"
                  :uploadedVideo="uploadedVideo"
                  @update:images="handleImageUpdate"
                  @update:video="handleVideoUpdate"
                  @remove:image="removeImage"
                  @remove:video="removeVideo"
              />
            </div>

            <div v-if="activeTab === 'agent-info'" class="space-y-6">
              <AgentInfoSection
                  :agent="property.agent"
                  @update:agent="property.agent = $event"
              />
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6">
              <button
                  type="button"
                  @click="goToPreviousTab"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
                  :disabled="isFirstTab"
              >
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
              </button>

              <button
                  v-if="!isLastTab"
                  type="button"
                  @click="goToNextTab"
                  class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
              >
                <span class="flex items-center">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <button
                  v-else
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="flex items-center">
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isSubmitting ? 'Submitting...' : 'Submit Property' }}
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Preview Section (Right Side) -->
        <div class="lg:w-1/2">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium">Property Preview</h2>
              <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Live Preview</div>
            </div>

            <PropertyPreviewCard
                :property="property"
                :previewImage="previewImageUrl"
                :previewVideo="previewVideoUrl"
            />

            <div class="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-200">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  This is how your property will appear to potential buyers/renters.
                  Continue filling out the form to complete your listing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">Property Submitted Successfully!</h3>
          <p class="text-sm text-gray-500 mt-2">
            Your property has been submitted and is pending review. You'll be notified once it's approved and listed on our platform.
          </p>
        </div>
        <div class="bg-gray-50 rounded-md p-4 mb-6">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">Property ID: {{ property.property_id }}</h4>
              <p class="text-xs text-gray-500 mt-1">Keep this ID for your reference. You can use it to track your listing status.</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <button
              @click="viewPropertyDetails"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            View Property Details
          </button>
          <button
              @click="submitAnotherProperty"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Submit Another Property
          </button>
          <button
              @click="goToDashboard"
              class="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
          >
            Go to Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicInfoSection from './components/BasicInfoSection.vue';
import PropertyDetailsSection from './components/PropertyDetailsSection.vue';
import PaymentOptionsSection from './components/PaymentOptionsSection.vue';
import AmenitiesSection from './components/AmenitiesSection.vue';
import LocationSection from './components/LocationSection.vue';
import MediaUploadSection from './components/MediaUploadSection.vue';
import AgentInfoSection from './components/AgentInfoSection.vue';
import PropertyPreviewCard from './PropertyPreviewCard.vue';

export default {
  name: 'PropertySubmissionForm',
  components: {
    BasicInfoSection,
    PropertyDetailsSection,
    PaymentOptionsSection,
    AmenitiesSection,
    LocationSection,
    MediaUploadSection,
    AgentInfoSection,
    PropertyPreviewCard
  },
  data() {
    return {
      activeTab: 'basic-info',
      tabs: [
        { id: 'basic-info', name: 'Basic Info' },
        { id: 'property-details', name: 'Property Details' },
        { id: 'payment-options', name: 'Payment Options' },
        { id: 'amenities', name: 'Amenities' },
        { id: 'location', name: 'Location' },
        { id: 'media', name: 'Media' },
        { id: 'agent-info', name: 'Agent Info' }
      ],
      property: {
        property_id: '',
        owner: {
          type: 'individual',
          user_id: '',
          agency_id: null
        },
        listing: {
          type: '',
          price: {
            amount: null,
            negotiable: false
          },
          payment_options: {
            mortgage_available: false,
            installments: false,
            down_payment: null
          }
        },
        property_details: {
          type: '',
          size: {
            area: null,
            unit: 'sqm'
          },
          year_built: null,
          floor: null,
          total_floors: null,
          rooms: {
            bedrooms: null,
            bathrooms: null,
            living_rooms: null,
            kitchen: 1,
            balcony: 0
          },
          furnished: false
        },
        amenities: {
          elevator: false,
          parking: false,
          pool: false,
          gym: false,
          security: false,
          heating: '',
          cooling: '',
          smart_home: false
        },
        location: {
          address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipcode: ''
          },
          geo: {
            latitude: null,
            longitude: null
          }
        },
        media: {
          images: [],
          videos: []
        },
        status: {
          availability: 'pending',
          listed_on: new Date().toISOString().split('T')[0],
          views: 0,
          favorites: 0
        },
        agent: {
          agent_id: '',
          name: '',
          contact: {
            phone: '',
            email: ''
          }
        }
      },
      uploadedImages: [],
      uploadedVideo: null,
      previewVideoUrl: null,
      showSuccessModal: false,
      isSubmitting: false,
      completedTabs: [] // Track which tabs have been completed
    };
  },
  mounted() {
    // You can initialize form with user data here if needed
    this.property.owner.user_id = 'user_7890'; // Get from auth system
  },
  computed: {
    currentTabIndex() {
      return this.tabs.findIndex(tab => tab.id === this.activeTab);
    },
    isFirstTab() {
      return this.currentTabIndex === 0;
    },
    isLastTab() {
      return this.currentTabIndex === this.tabs.length - 1;
    },
    previewImageUrl() {
      if (this.uploadedImages.length > 0) {
        // In real app, we'd use URL.createObjectURL(this.uploadedImages[0])
        // For now, return first image if it's already a string, or null if it's a File object
        return typeof this.uploadedImages[0] === 'string'
            ? this.uploadedImages[0]
            : this.uploadedImages[0] instanceof File
                ? URL.createObjectURL(this.uploadedImages[0])
                : null;
      }
      return null;
    }
  },
  methods: {
    isTabCompleted(tab) {
      return this.completedTabs.includes(tab);
    },
    tabIndex(tabId) {
      return this.tabs.findIndex(tab => tab.id === tabId);
    },
    goToNextTab() {
      if (!this.isLastTab) {
        // Mark current tab as completed
        if (!this.completedTabs.includes(this.activeTab)) {
          this.completedTabs.push(this.activeTab);
        }

        const nextTabIndex = this.currentTabIndex + 1;
        this.activeTab = this.tabs[nextTabIndex].id;
      }
    },
    goToPreviousTab() {
      if (!this.isFirstTab) {
        const prevTabIndex = this.currentTabIndex - 1;
        this.activeTab = this.tabs[prevTabIndex].id;
      }
    },
    handleImageUpdate(images) {
      this.uploadedImages = images;
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    removeVideo() {
      this.uploadedVideo = null;
      this.previewVideoUrl = null;
    },
    viewPropertyDetails() {
      // Navigate to property details page
      console.log('Navigating to property details page for property ID:', this.property.property_id);
      this.showSuccessModal = false;
      // In a real app, you would use router:
      // this.$router.push(`/properties/${this.property.property_id}`);
    },
    submitAnotherProperty() {
      // Reset form and close modal
      this.resetForm();
      this.showSuccessModal = false;
      this.activeTab = 'basic-info';
    },
    goToDashboard() {
      // Navigate to dashboard
      console.log('Navigating to dashboard');
      this.showSuccessModal = false;
      // In a real app, you would use router:
      // this.$router.push('/dashboard');
    },
    handleVideoUpdate(video) {
      this.uploadedVideo = video;

      // If the video is a File object, create a preview URL
      if (video instanceof File) {
        this.previewVideoUrl = URL.createObjectURL(video);
      } else {
        this.previewVideoUrl = video;
      }
    },
    async submitProperty() {
      try {
        this.isSubmitting = true;

        // Prepare media URLs (in a real app, you would upload files to server/cloud storage)
        this.property.media.images = this.uploadedImages.map((img, index) =>
            typeof img === 'string'
                ? img
                : `https://example.com/images/property_${Date.now()}_${index}.jpg`
        );

        if (this.uploadedVideo) {
          this.property.media.videos = [
            typeof this.uploadedVideo === 'string'
                ? this.uploadedVideo
                : `https://example.com/videos/property_${Date.now()}.mp4`
          ];
        }

        // Assign a property ID (in a real app, this would come from the backend)
        this.property.property_id = `prop_${Date.now()}`;

        // Set agent ID if provided
        if (this.property.agent.name) {
          this.property.agent.agent_id = `agent_${Date.now()}`;
        }

        // In a real app, you would send this data to your backend API
        console.log('Submitting property data:', this.property);

        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success modal instead of alert
        this.showSuccessModal = true;

      } catch (error) {
        console.error('Error submitting property:', error);
        alert('Failed to submit property. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      // Reset all form fields to initial state
      this.property = {
        property_id: '',
        owner: {
          type: 'individual',
          user_id: 'user_7890', // Keep user ID
          agency_id: null
        },
        listing: {
          type: '',
          price: {
            amount: null,
            negotiable: false
          },
          payment_options: {
            mortgage_available: false,
            installments: false,
            down_payment: null
          }
        },
        property_details: {
          type: '',
          size: {
            area: null,
            unit: 'sqm'
          },
          year_built: null,
          floor: null,
          total_floors: null,
          rooms: {
            bedrooms: null,
            bathrooms: null,
            living_rooms: null,
            kitchen: 1,
            balcony: 0
          },
          furnished: false
        },
        amenities: {
          elevator: false,
          parking: false,
          pool: false,
          gym: false,
          security: false,
          heating: '',
          cooling: '',
          smart_home: false
        },
        location: {
          address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipcode: ''
          },
          geo: {
            latitude: null,
            longitude: null
          }
        },
        media: {
          images: [],
          videos: []
        },
        status: {
          availability: 'pending',
          listed_on: new Date().toISOString().split('T')[0],
          views: 0,
          favorites: 0
        },
        agent: {
          agent_id: '',
          name: '',
          contact: {
            phone: '',
            email: ''
          }
        }
      };
      this.uploadedImages = [];
      this.uploadedVideo = null;
      this.previewVideoUrl = null;
      this.completedTabs = [];
    }
  }
};
</script>
