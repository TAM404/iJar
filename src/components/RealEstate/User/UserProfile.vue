<template>
  <div class="bg-white min-h-screen">
    <!-- Header -->
    <header class="bg-black text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-semibold">Real Estate Profile</h1>
        <button class="px-4 py-2 bg-white text-black rounded">Log Out</button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-4 md:p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- User Profile Card -->
        <div class="md:col-span-1">
          <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <div class="flex flex-col items-center text-center mb-6">
              <div class="w-32 h-32 mb-4 relative">
                <img
                    :src="user.avatar || '/api/placeholder/128/128'"
                    alt="Profile picture"
                    class="w-full h-full rounded-full object-cover border-4 border-gray-200"
                />
                <div class="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h2 class="text-2xl font-bold">{{ user.name }}</h2>
              <p class="text-gray-600">{{ user.job }}</p>
            </div>

            <div class="divide-y divide-gray-200">
              <div class="py-3">
                <h3 class="text-lg font-semibold mb-2">Personal Information</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Age:</span>
                    <span class="font-medium">{{ user.age }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Location:</span>
                    <span class="font-medium">{{ user.location }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Member since:</span>
                    <span class="font-medium">{{ user.memberSince }}</span>
                  </li>
                </ul>
              </div>

              <div class="py-3">
                <h3 class="text-lg font-semibold mb-2">Contact</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Email:</span>
                    <span class="font-medium">{{ user.email }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Phone:</span>
                    <span class="font-medium">{{ user.phone }}</span>
                  </li>
                </ul>
              </div>

              <div class="py-3">
                <h3 class="text-lg font-semibold mb-2">Preferences</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">House type:</span>
                    <span class="font-medium">{{ user.preferences.houseType }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Budget:</span>
                    <span class="font-medium">${{ user.preferences.budget.toLocaleString() }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="w-24 text-gray-500">Location:</span>
                    <span class="font-medium">{{ user.preferences.location }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Favorites and Interests -->
        <div class="md:col-span-2">
          <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Favorite Properties</h2>

            <div v-if="user.favoriteProperties.length === 0" class="text-center py-10">
              <p class="text-gray-500">You haven't added any properties to your favorites yet.</p>
              <button class="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Browse Properties</button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(property, index) in user.favoriteProperties" :key="index" class="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div class="relative">
                  <img :src="property.image || '/api/placeholder/300/200'" alt="Property" class="w-full h-48 object-cover" />
                  <div class="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">{{ property.type }}</div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-lg mb-1">{{ property.title }}</h3>
                  <div class="text-gray-700 mb-2">{{ property.location }}</div>
                  <div class="flex justify-between items-center">
                    <div class="font-bold text-lg">${{ property.price.toLocaleString() }}</div>
                    <div class="flex space-x-2">
                      <button class="p-1 text-gray-600 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button class="p-1 text-gray-600 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Property Views -->
          <div class="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Recently Viewed</h2>

            <div v-if="user.recentlyViewed.length === 0" class="text-center py-6">
              <p class="text-gray-500">No recently viewed properties</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="(property, index) in user.recentlyViewed" :key="index" class="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <img :src="property.image || '/api/placeholder/80/80'" alt="Property" class="w-20 h-20 object-cover rounded mr-4" />
                <div class="flex-1">
                  <h3 class="font-semibold">{{ property.title }}</h3>
                  <p class="text-gray-600 text-sm">{{ property.location }}</p>
                  <div class="flex justify-between items-center mt-1">
                    <span class="font-bold">${{ property.price.toLocaleString() }}</span>
                    <span class="text-xs text-gray-500">Viewed {{ property.viewedAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: 'John Doe',
        avatar: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png', // URL to avatar image
        age: 32,
        location: 'San Francisco, CA',
        job: 'Software Engineer',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        memberSince: 'January 2023',
        preferences: {
          houseType: 'Apartment',
          budget: 850000,
          location: 'Downtown'
        },
        favoriteProperties: [
          {
            id: 1,
            title: 'Modern Downtown Apartment',
            type: 'Apartment',
            price: 750000,
            location: 'Financial District, SF',
            image: "https://a0.muscache.com/im/pictures/f903d5fe-a4fa-4e96-8b10-e15a965dc5b1.jpg?im_w=720&im_format=avif" // URL to property image
          },
          {
            id: 2,
            title: 'Spacious Family Home',
            type: 'House',
            price: 1250000,
            location: 'Richmond District, SF',
            image: "https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x" // URL to property image
          },
          {
            id: 3,
            title: 'Luxury Condo with View',
            type: 'Condo',
            price: 950000,
            location: 'Nob Hill, SF',
            image: 'https://a0.muscache.com/im/pictures/f3dad936-d062-47ce-879e-03ce583dc10a.jpg?im_w=1200&im_format=avif 1x' // URL to property image
          }
        ],
        recentlyViewed: [
          {
            id: 4,
            title: 'Cozy Studio Near Park',
            price: 550000,
            location: 'Hayes Valley, SF',
            viewedAt: '2 hours ago',
            image: "https://a0.muscache.com/im/pictures/f903d5fe-a4fa-4e96-8b10-e15a965dc5b1.jpg?im_w=720&im_format=avif" // URL to property image
          },
          {
            id: 5,
            title: 'Renovated Victorian',
            price: 1850000,
            location: 'Pacific Heights, SF',
            viewedAt: 'Yesterday',
            image: "https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x" // URL to property image
          }
        ]
      }
    }
  }
}
</script>