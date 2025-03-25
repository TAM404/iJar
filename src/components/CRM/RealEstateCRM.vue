// App.vue - Enhanced Real Estate CRM
<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Header -->
    <header class="bg-black text-white p-4 shadow-md sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Ijar CRM</h1>
        <nav class="hidden md:block">
          <ul class="flex space-x-6">
            <li v-for="item in navItems" :key="item.name">
              <a href="#" class="hover:text-gray-300 transition" :class="{'border-b-2 border-white': item.active}">{{ item.name }}</a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
                type="text"
                placeholder="Search..."
                class="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                v-model="searchQuery"
                @input="filterProperties"
            >
          </div>
          <div class="relative">
            <button @click="notificationsOpen = !notificationsOpen" class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </button>
            <div v-if="notificationsOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 text-gray-900 z-50">
              <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p class="text-sm font-medium">New client inquiry</p>
                <p class="text-xs text-gray-500">5 minutes ago</p>
              </div>
              <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p class="text-sm font-medium">Offer accepted on 789 Pine Lane</p>
                <p class="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <p class="text-sm font-medium">Document approval needed</p>
                <p class="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
          <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer" @click="profileOpen = !profileOpen">
            <span>JD</span>
          </div>
          <div v-if="profileOpen" class="absolute right-4 top-16 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 text-gray-900 z-50">
            <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Profile</div>
            <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Settings</div>
            <div class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer border-t">Logout</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-4">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar -->
        <aside class="w-full md:w-64 bg-gray-100 p-4 rounded-lg shadow-sm sticky top-20 h-screen md:h-auto">
          <nav>
            <ul class="space-y-2">
              <li v-for="item in sidebarItems" :key="item.name"
                  @click="setActiveSidebarItem(item)"
                  class="p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition"
                  :class="{'bg-gray-300': item.active}">
                <div class="flex items-center">
                  <span class="mr-3">{{ item.icon }}</span>
                  <span>{{ item.name }}</span>
                </div>
              </li>
            </ul>
          </nav>

          <div class="mt-8">
            <h3 class="font-semibold mb-2">Quick Stats</h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <p class="text-xs text-gray-500">Listings</p>
                <p class="text-xl font-bold">{{ getTotalProperties() }}</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <p class="text-xs text-gray-500">Clients</p>
                <p class="text-xl font-bold">{{ clients.length }}</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <p class="text-xs text-gray-500">Revenue</p>
                <p class="text-xl font-bold">${{ getProjectedRevenue() }}k</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <p class="text-xs text-gray-500">This Month</p>
                <p class="text-xl font-bold">{{ getMonthlyClosings() }}</p>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <h3 class="font-semibold mb-2">Top Agents</h3>
            <div class="space-y-2">
              <div v-for="agent in topAgents" :key="agent.id" class="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                    {{ agent.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ agent.name }}</p>
                    <p class="text-xs text-gray-500">{{ agent.properties }} properties</p>
                  </div>
                </div>
                <div class="text-xs bg-gray-100 px-2 py-1 rounded-full">${{ agent.sales }}k</div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Content Area -->
        <div class="flex-1">
          <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 class="text-2xl font-bold">Property Pipeline</h2>
              <p class="text-gray-500">Manage and track your properties through the sales process</p>
            </div>
            <div class="flex gap-2">
              <div class="relative">
                <select v-model="filterType" class="bg-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none pr-8">
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartments</option>
                  <option value="House">Houses</option>
                  <option value="Condo">Condos</option>
                  <option value="Townhouse">Townhouses</option>
                </select>
                <div class="absolute right-2 top-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button @click="showAddPropertyModal = true" class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Property
              </button>
            </div>
          </div>

          <!-- Kanban Board -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
            <div
                v-for="stage in filteredPropertyStages"
                :key="stage.id"
                class="bg-gray-100 p-4 rounded-lg min-w-64"
                @dragover.prevent
                @drop="onDrop($event, stage)"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold">{{ stage.name }}</h3>
                  <span class="bg-gray-200 px-2 py-1 rounded-full text-xs">{{ stage.properties.length }}</span>
                </div>
                <div class="flex items-center">
                  <div
                      v-if="stage.id === 4"
                      class="text-xs text-gray-500 mr-2"
                  >
                    ${{ calculateStageValue(stage) }}k
                  </div>
                  <div class="cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Draggable Property Cards -->
              <div class="space-y-3 min-h-64">
                <div
                    v-for="property in stage.properties"
                    :key="property.id"
                    class="bg-white p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition"
                    draggable="true"
                    @dragstart="onDragStart($event, property, stage)"
                    @click="openPropertyDetails(property)"
                >
                  <div class="flex justify-between">
                    <p class="font-medium">{{ property.address }}</p>
                    <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">${{ property.price.toLocaleString() }}</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">{{ property.type }} | {{ property.size }} sqft</p>

                  <div class="mt-2">
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div class="bg-black h-1.5 rounded-full" :style="{ width: getProgressWidth(stage.id) }"></div>
                    </div>
                    <div class="flex justify-between mt-1">
                      <span class="text-xs text-gray-500">Progress</span>
                      <span class="text-xs text-gray-500">{{ getProgressPercentage(stage.id) }}%</span>
                    </div>
                  </div>

                  <div class="mt-3 flex justify-between items-center">
                    <span class="text-xs text-gray-500">{{ formatDate(property.updatedAt) }}</span>
                    <div class="flex items-center gap-1">
                      <span v-if="property.priority === 'high'" class="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span v-if="property.priority === 'medium'" class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span v-if="property.priority === 'low'" class="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {{ property.agent }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Property Details Modal -->
    <div v-if="selectedProperty" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-2xl font-bold">{{ selectedProperty.address }}</h2>
              <p class="text-gray-500">{{ selectedProperty.type }} | {{ selectedProperty.size }} sqft</p>
            </div>
            <button @click="selectedProperty = null" class="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-4">
                <span class="text-gray-500">Property Image</span>
              </div>

              <div class="grid grid-cols-3 gap-2 mb-4">
                <div class="bg-gray-100 p-3 rounded-lg">
                  <p class="text-xs text-gray-500">Price</p>
                  <p class="font-bold">${{ selectedProperty.price.toLocaleString() }}</p>
                </div>
                <div class="bg-gray-100 p-3 rounded-lg">
                  <p class="text-xs text-gray-500">Beds</p>
                  <p class="font-bold">{{ selectedProperty.beds || 3 }}</p>
                </div>
                <div class="bg-gray-100 p-3 rounded-lg">
                  <p class="text-xs text-gray-500">Baths</p>
                  <p class="font-bold">{{ selectedProperty.baths || 2 }}</p>
                </div>
              </div>

              <div class="mb-4">
                <h3 class="font-semibold mb-2">Description</h3>
                <p class="text-sm text-gray-600">{{ selectedProperty.description || 'Beautiful property located in a desirable neighborhood. Features open floor plan, updated kitchen, and spacious backyard. Close to schools, shopping, and transportation.' }}</p>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Activity Timeline</h3>
                <div class="space-y-2">
                  <div class="flex items-start gap-2">
                    <div class="w-1 h-full bg-gray-200 rounded-full relative mt-1">
                      <div class="w-2 h-2 bg-black rounded-full absolute -left-0.5"></div>
                    </div>
                    <div>
                      <p class="text-sm font-medium">Added to system</p>
                      <p class="text-xs text-gray-500">{{ formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-1 h-full bg-gray-200 rounded-full relative mt-1">
                      <div class="w-2 h-2 bg-black rounded-full absolute -left-0.5"></div>
                    </div>
                    <div>
                      <p class="text-sm font-medium">First viewing scheduled</p>
                      <p class="text-xs text-gray-500">{{ formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)) }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <div class="w-1 h-full bg-gray-200 rounded-full relative mt-1">
                      <div class="w-2 h-2 bg-black rounded-full absolute -left-0.5"></div>
                    </div>
                    <div>
                      <p class="text-sm font-medium">Offer received</p>
                      <p class="text-xs text-gray-500">{{ formatDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 class="font-semibold mb-2">Client Information</h3>
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {{ getClientInitials(selectedProperty.client) }}
                  </div>
                  <div>
                    <p class="font-medium">{{ selectedProperty.client }}</p>
                    <p class="text-xs text-gray-500">client@example.com | (555) 123-4567</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2">
                  <button class="bg-gray-200 text-gray-800 p-2 rounded-lg text-sm hover:bg-gray-300 transition flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                  <button class="bg-gray-200 text-gray-800 p-2 rounded-lg text-sm hover:bg-gray-300 transition flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                </div>
              </div>

              <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 class="font-semibold mb-2">Agent Assigned</h3>
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {{ selectedProperty.agent }}
                  </div>
                  <div>
                    <p class="font-medium">{{ getAgentName(selectedProperty.agent) }}</p>
                    <p class="text-xs text-gray-500">agent@example.com | (555) 987-6543</p>
                  </div>
                </div>
              </div>

              <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 class="font-semibold mb-2">Stage</h3>
                <select v-model="selectedProperty.currentStage" class="w-full bg-white border border-gray-300 p-2 rounded-lg" @change="updatePropertyStage">
                  <option v-for="stage in propertyStages" :key="stage.id" :value="stage.id">{{ stage.name }}</option>
                </select>
                <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-black h-2 rounded-full" :style="{ width: getProgressWidth(selectedProperty.currentStage || 1) }"></div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 class="font-semibold mb-2">Notes</h3>
                <textarea
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg p-2 text-sm"
                    placeholder="Add notes about this property..."
                ></textarea>
              </div>

              <div class="flex gap-2">
                <button class="flex-1 bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition">Save Changes</button>
                <button class="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition">Schedule Viewing</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Property Modal -->
    <div v-if="showAddPropertyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold">Add New Property</h2>
            <button @click="showAddPropertyModal = false" class="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Address</label>
              <input type="text" class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.address">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Price ($)</label>
                <input type="number" class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.price">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Size (sq ft)</label>
                <input type="number" class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.size">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Type</label>
                <select class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.type">
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <select class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.stage">
                  <option v-for="stage in propertyStages" :key="stage.id" :value="stage.id">{{ stage.name }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Client</label>
              <select class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.client">
                <option v-for="client in clients" :key="client.id" :value="client.name">{{ client.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Agent</label>
              <select class="w-full border border-gray-300 rounded-lg p-2" v-model="newProperty.agent">
                <option v-for="agent in agents" :key="agent.id" :value="agent.initials">{{ agent.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Priority</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input type="radio" name="priority" value="low" v-model="newProperty.priority" class="mr-1">
                  <span class="text-sm">Low</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="priority" value="medium" v-model="newProperty.priority" class="mr-1">
                  <span class="text-sm">Medium</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="priority" value="high" v-model="newProperty.priority" class="mr-1">
                  <span class="text-sm">High</span>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 flex gap-2">
            <button @click="addNewProperty" class="flex-1 bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition">Add Property</button>
            <button @click="showAddPropertyModal = false" class="flex-1 bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedRealEstateCRM',
  data() {
    return {
      navItems: [
        { name: 'Dashboard', link: '#', active: false },
        { name: 'Properties', link: '#', active: true },
        { name: 'Clients', link: '#', active: false },
        { name: 'Agents', link: '#', active: false },
        { name: 'Reports', link: '#', active: false }
      ],
      sidebarItems: [
        { name: 'Dashboard', icon: '📊', active: false },
        { name: 'Properties', icon: '🏠', active: true },
        { name: 'Clients', icon: '👥', active: false },
        { name: 'Calendar', icon: '📅', active: false },
        { name: 'Documents', icon: '📄', active: false },
        { name: 'Tasks', icon: '✓', active: false },
        { name: 'Analytics', icon: '📈', active: false },
        { name: 'Settings', icon: '⚙️', active: false }
      ],
      propertyStages: [
        { id: 1, name: 'New Listings', properties: [] },
        { id: 2, name: 'In Showing', properties: [] },
        { id: 3, name: 'Under Contract', properties: [] },
        { id: 4, name: 'Closed', properties: [] }
      ],
      properties: [
        { id: 1, address: '123 Main St', price: 450000, size: 2000, type: 'House', currentStage: 1, client: 'John Smith', agent: 'JD', priority: 'medium', updatedAt: new Date() },
        { id: 2, address: '456 Oak Ave', price: 320000, size: 1600, type: 'Townhouse', currentStage: 1, client: 'Sarah Johnson', agent: 'AR', priority: 'high', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
        { id: 3, address: '789 Pine Lane', price: 550000, size: 2400, type: 'House', currentStage: 2, client: 'David Lee', agent: 'MG', priority: 'medium', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) },
        { id: 4, address: '101 Elm Court', price: 275000, size: 1200, type: 'Condo', currentStage: 2, client: 'Emily Chen', agent: 'TC', priority: 'low', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
        { id: 5, address: '222 Maple Drive', price: 620000, size: 2800, type: 'House', currentStage: 3, client: 'Michael Brown', agent: 'JD', priority: 'high', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) },
        { id: 6, address: '333 Cedar Blvd', price: 395000, size: 1800, type: 'Townhouse', currentStage: 3, client: 'Jessica Wilson', agent: 'AR', priority: 'medium', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
        { id: 7, address: '444 Birch Street', price: 510000, size: 2200, type: 'House', currentStage: 4, client: 'Robert Garcia', agent: 'MG', priority: 'medium', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
        { id: 8, address: '555 Willow Way', price: 325000, size: 1400, type: 'Condo', currentStage: 4, client: 'Lisa Taylor', agent: 'TC', priority: 'low', updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) }
      ],
      clients: [
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '555-1234' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-2345' },
        { id: 3, name: 'David Lee', email: 'david@example.com', phone: '555-3456' },
        { id: 4, name: 'Emily Chen', email: 'emily@example.com', phone: '555-4567' },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '555-5678' },
        { id: 6, name: 'Jessica Wilson', email: 'jessica@example.com', phone: '555-6789' },
        { id: 7, name: 'Robert Garcia', email: 'robert@example.com', phone: '555-7890' },
        { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', phone: '555-8901' }
      ],
      agents: [
        { id: 1, name: 'Jane Doe', initials: 'JD', properties: 15, sales: 4200 },
        { id: 2, name: 'Alex Rodriguez', initials: 'AR', properties: 12, sales: 3800 },
        { id: 3, name: 'Maria Garcia', initials: 'MG', properties: 9, sales: 2900 },
        { id: 4, name: 'Tom Chen', initials: 'TC', properties: 7, sales: 2100 }
      ],
      topAgents: [
        { id: 1, name: 'Jane Doe', initials: 'JD', properties: 15, sales: 4200 },
        { id: 2, name: 'Alex Rodriguez', initials: 'AR', properties: 12, sales: 3800 },
        { id: 3, name: 'Maria Garcia', initials: 'MG', properties: 9, sales: 2900 }
      ],
      selectedProperty: null,
      searchQuery: '',
      filterType: 'all',
      notificationsOpen: false,
      profileOpen: false,
      showAddPropertyModal: false,
      newProperty: {
        address: '',
        price: 0,
        size: 0,
        type: 'House',
        stage: 1,
        client: '',
        agent: '',
        priority: 'medium'
      },
      draggedProperty: null,
      sourceStage: null
    }
  },
  computed: {
    filteredPropertyStages() {
      // Distribute properties to their respective stages
      const stagesWithProperties = JSON.parse(JSON.stringify(this.propertyStages));

      // Filter properties based on search and type
      let filteredProperties = this.properties;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredProperties = filteredProperties.filter(property =>
            property.address.toLowerCase().includes(query) ||
            property.type.toLowerCase().includes(query) ||
            property.client.toLowerCase().includes(query)
        );
      }

      if (this.filterType !== 'all') {
        filteredProperties = filteredProperties.filter(property =>
            property.type === this.filterType
        );
      }

      // Distribute filtered properties to stages
      filteredProperties.forEach(property => {
        const stageIndex = stagesWithProperties.findIndex(stage =>
            stage.id === property.currentStage
        );

        if (stageIndex !== -1) {
          stagesWithProperties[stageIndex].properties.push(property);
        }
      });

      return stagesWithProperties;
    }
  },
  methods: {
    setActiveSidebarItem(item) {
      this.sidebarItems.forEach(i => {
        i.active = false;
      });
      item.active = true;
    },
    getTotalProperties() {
      return this.properties.length;
    },
    getProjectedRevenue() {
      const totalValue = this.properties.reduce((sum, property) => sum + property.price, 0);
      // Assuming 3% commission on average
      return Math.round((totalValue * 0.03) / 1000);
    },
    getMonthlyClosings() {
      return this.properties.filter(p => p.currentStage === 4).length;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    },
    getProgressWidth(stageId) {
      const percentage = this.getProgressPercentage(stageId);
      return `${percentage}%`;
    },
    getProgressPercentage(stageId) {
      const stages = this.propertyStages.length;
      return Math.round((stageId / stages) * 100);
    },
    openPropertyDetails(property) {
      this.selectedProperty = { ...property };
    },
    updatePropertyStage() {
      if (!this.selectedProperty) return;

      const propertyIndex = this.properties.findIndex(p => p.id === this.selectedProperty.id);
      if (propertyIndex !== -1) {
        this.properties[propertyIndex].currentStage = this.selectedProperty.currentStage;
      }
    },
    onDragStart(event, property, stage) {
      this.draggedProperty = property;
      this.sourceStage = stage;
      event.dataTransfer.effectAllowed = 'move';
    },
    onDrop(event, targetStage) {
      event.preventDefault();
      if (!this.draggedProperty || !this.sourceStage) return;

      // Find and update the property in the main properties array
      const propertyIndex = this.properties.findIndex(p => p.id === this.draggedProperty.id);
      if (propertyIndex !== -1) {
        this.properties[propertyIndex].currentStage = targetStage.id;
        this.properties[propertyIndex].updatedAt = new Date();
      }

      this.draggedProperty = null;
      this.sourceStage = null;
    },
    calculateStageValue(stage) {
      const totalValue = stage.properties.reduce((sum, property) => sum + property.price, 0);
      return Math.round(totalValue / 1000);
    },
    getClientInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('');
    },
    getAgentName(initials) {
      const agent = this.agents.find(a => a.initials === initials);
      return agent ? agent.name : '';
    },
    addNewProperty() {
      if (!this.newProperty.address) return;

      const newId = this.properties.length > 0
          ? Math.max(...this.properties.map(p => p.id)) + 1
          : 1;

      const property = {
        id: newId,
        address: this.newProperty.address,
        price: Number(this.newProperty.price),
        size: Number(this.newProperty.size),
        type: this.newProperty.type,
        currentStage: Number(this.newProperty.stage),
        client: this.newProperty.client,
        agent: this.newProperty.agent,
        priority: this.newProperty.priority,
        updatedAt: new Date()
      };

      this.properties.push(property);

      // Reset form and close modal
      this.newProperty = {
        address: '',
        price: 0,
        size: 0,
        type: 'House',
        stage: 1,
        client: '',
        agent: '',
        priority: 'medium'
      };

      this.showAddPropertyModal = false;
    },
    filterProperties() {
      // Filtering is handled in the computed property
    }
  },
  mounted() {
    // Initialize the client/agent selection in the new property form
    if (this.clients.length > 0) {
      this.newProperty.client = this.clients[0].name;
    }
    if (this.agents.length > 0) {
      this.newProperty.agent = this.agents[0].initials;
    }
  }
}
</script>

<style>
/* Global styles */
body {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
/* You can add more custom styles here if needed */
</style>