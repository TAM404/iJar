<template>
  <div class="min-h-screen bg-white">


    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Profile Header -->
      <!-- In your parent component template -->
      <user-profile-header
          :user="user"
          @update-user="updateUserProfile"
      />
      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="flex -mb-px">
          <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
              'py-4 px-6 text-center border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <UserPreferences v-if="activeTab === 'preferences'" :user="user" />

      <UserFavorites v-if="activeTab === 'favorites'" :user="user" />

      <UserAgencies v-if="activeTab === 'agencies'" :user="user" />

      <UserRecentlyViewed v-if="activeTab === 'recent'" :user="user" />
    </main>

  </div>
</template>

<script>
import UserProfileHeader from "@/components/RealEstate/User/UserProfileHeader.vue";
import TabsNavigation from "@/components/RealEstate/User/TabsNavigation.vue";
import UserPreferences from "@/components/RealEstate/User/UserPreferences.vue";
import UserFavorites from "@/components/RealEstate/User/UserFavorites.vue";
import UserAgencies from "@/components/RealEstate/User/UserAgencies.vue";
import UserRecentlyViewed from "@/components/RealEstate/User/UserRecentlyViewed.vue";

export default {
  name: 'UserProfile',
  components: {UserRecentlyViewed, UserAgencies, UserFavorites, UserPreferences, TabsNavigation, UserProfileHeader},
  data() {
    return {
      activeTab: 'preferences',
      tabs: [
        { id: 'preferences', name: 'Your Preferences' },
        { id: 'favorites', name: 'Favorite Properties' },
        { id: 'agencies', name: 'Favorite Agencies' },
        { id: 'recent', name: 'Recently Viewed' }
      ],
      user: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        profileImage: null,
        joinDate: '2023-06-15',
        preferences: {
          propertyTypes: ['Apartment', 'Condo', 'Townhouse'],
          priceRangeMin: 350000,
          priceRangeMax: 750000,
          bedrooms: 2,
          bathrooms: 2,
          areas: ['Manhattan', 'Brooklyn', 'Queens'],
          amenities: ['Parking', 'Gym', 'Pool', 'Pet Friendly', 'Elevator']
        },
        favoriteProperties: [
          {
            id: 1,
            title: 'Modern Downtown Apartment',
            price: 425000,
            location: 'Manhattan, NY',
            image: 'https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x',
            type: 'Apartment',
            beds: 2,
            baths: 2
          },
          {
            id: 2,
            title: 'Spacious Family Condo',
            price: 650000,
            location: 'Brooklyn, NY',
            image: 'https://a0.muscache.com/im/pictures/f3dad936-d062-47ce-879e-03ce583dc10a.jpg?im_w=1200&im_format=avif 1x',
            type: 'Condo',
            beds: 3,
            baths: 2
          },
          {
            id: 3,
            title: 'Luxury Penthouse with View',
            price: 720000,
            location: 'Manhattan, NY',
            image: 'https://a0.muscache.com/im/pictures/f903d5fe-a4fa-4e96-8b10-e15a965dc5b1.jpg?im_w=720&im_format=avif',
            type: 'Penthouse',
            beds: 3,
            baths: 3
          }
        ],
        favoriteAgencies: [
          {
            id: 1,
            name: 'Elite Properties',
            logo: 'https://placehold.co/200x200/222/fff?text=Elite',
            rating: 4.8,
            propertiesCount: 156
          },
          {
            id: 2,
            name: 'Urban Real Estate',
            logo: 'https://placehold.co/200x200/222/fff?text=Urban',
            rating: 4.5,
            propertiesCount: 89
          },
          {
            id: 3,
            name: 'Metropolitan Homes',
            logo: 'https://placehold.co/200x200/222/fff?text=Metro',
            rating: 4.2,
            propertiesCount: 124
          }
        ],
        recentlyViewed: [
          {
            id: 4,
            title: 'Cozy Studio in Downtown',
            price: 320000,
            location: 'Manhattan, NY',
            image: 'https://placehold.co/600x400/222/fff?text=Studio',
            type: 'Studio',
            beds: 0,
            baths: 1,
            viewedAt: new Date(Date.now() - 3600000) // 1 hour ago
          },
          {
            id: 5,
            title: 'Renovated Brownstone',
            price: 680000,
            location: 'Brooklyn, NY',
            image: 'https://placehold.co/600x400/222/fff?text=Brownstone',
            type: 'Townhouse',
            beds: 3,
            baths: 2.5,
            viewedAt: new Date(Date.now() - 86400000) // 1 day ago
          },
          {
            id: 6,
            title: 'Modern Loft with Terrace',
            price: 550000,
            location: 'Queens, NY',
            image: 'https://placehold.co/600x400/222/fff?text=Loft',
            type: 'Loft',
            beds: 1,
            baths: 2,
            viewedAt: new Date(Date.now() - 172800000) // 2 days ago
          }
        ]
      }
    };
  },
  methods: {
      updateUserProfile(updatedUser) {
        // Update your user data store/state
        this.user = updatedUser;

        // Or make an API call to save the changes
        // axios.put('/api/user/profile', updatedUser)...
      }
    ,
    getUserInitials() {
      return this.user.name
          .split(' ')
          .map(name => name.charAt(0))
          .join('');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value);
    },
    formatTimeAgo(date) {
      const seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + ' years ago';

      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + ' months ago';

      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + ' days ago';

      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + ' hours ago';

      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + ' minutes ago';

      return Math.floor(seconds) + ' seconds ago';
    }
  }
};
</script>

<style>
/* Additional styling can be added here if needed */
.pb-2\/3 {
  padding-bottom: 66.666667%;
}
</style>