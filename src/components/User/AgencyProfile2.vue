<template>
  <div class="bg-white min-h-screen">
    <!-- Header -->
    <header class="bg-black text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img v-if="agency.logo" :src="agency.logo" alt="Agency Logo" class="h-10 mr-3" />
          <h1 class="text-xl font-semibold">{{ agency.name }}</h1>
        </div>
        <div class="flex space-x-4">
          <button class="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition">Contact</button>
          <button class="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Login</button>
        </div>
      </div>
    </header>

    <!-- Agency Overview Banner -->
    <section class="relative bg-gray-900 text-white">
      <div class="absolute inset-0 opacity-60">
        <img v-if="agency.coverImage" :src="agency.coverImage" alt="Agency Office" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900"></div>
      </div>
      <div class="container mx-auto relative z-10 py-16 px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ agency.name }}</h1>
          <p class="text-xl mb-6">{{ agency.tagline }}</p>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ agency.headquarters }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{{ agency.phone }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ agency.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mx-auto p-4 md:p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Agency Details -->
        <div class="lg:col-span-2">
          <!-- About Section -->
          <section class="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">About {{ agency.name }}</h2>
            <div class="space-y-4">
              <p>{{ agency.description }}</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 class="font-semibold text-lg mb-2">Agency Details</h3>
                  <ul class="space-y-2">
                    <li class="flex justify-between">
                      <span class="text-gray-600">Established:</span>
                      <span class="font-medium">{{ agency.established }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-gray-600">License Number:</span>
                      <span class="font-medium">{{ agency.licenseNumber }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-gray-600">Agents:</span>
                      <span class="font-medium">{{ agency.agentCount }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-gray-600">Properties Sold:</span>
                      <span class="font-medium">{{ agency.propertiesSold }}+</span>
                    </li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 class="font-semibold text-lg mb-2">Specializations</h3>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(spec, index) in agency.specializations" :key="index"
                          class="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                      {{ spec }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Services Section -->
          <section class="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">Our Services</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(service, index) in agency.services" :key="index" class="bg-white p-4 rounded-lg border border-gray-200">
                <div class="flex items-start">
                  <div class="bg-black p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg mb-1">{{ service.title }}</h3>
                    <p class="text-gray-600">{{ service.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Featured Listings Section -->
          <section class="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
            <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 class="text-2xl font-bold">Featured Listings</h2>
              <a href="#" class="text-black font-medium hover:underline">View All</a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(property, index) in agency.featuredListings" :key="index"
                   class="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div class="relative">
                  <img :src="property.image || '/api/placeholder/300/200'" alt="Property" class="w-full h-48 object-cover" />
                  <div class="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">{{ property.status }}</div>
                  <div class="absolute bottom-2 left-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">{{ property.type }}</div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-lg">{{ property.title }}</h3>
                  <p class="text-gray-600 text-sm mb-2">{{ property.location }}</p>
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-lg">${{ property.price.toLocaleString() }}</span>
                    <div class="flex text-sm text-gray-500 space-x-2">
                      <span>{{ property.bedrooms }} bd</span>
                      <span>{{ property.bathrooms }} ba</span>
                      <span>{{ property.size }} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Testimonials Section -->
          <section class="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">Client Testimonials</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(testimonial, index) in agency.testimonials" :key="index" class="bg-white p-6 rounded-lg border border-gray-200">
                <div class="flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" v-for="i in 5" :key="i">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p class="text-gray-600 italic mb-4">"{{ testimonial.quote }}"</p>
                <div class="flex items-center">
                  <img :src="testimonial.avatar || '/api/placeholder/40/40'" alt="Client" class="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p class="font-semibold">{{ testimonial.name }}</p>
                    <p class="text-gray-500 text-sm">{{ testimonial.type }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Team Members -->
          <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <h2 class="text-xl font-bold">Our Team</h2>
              <a href="#" class="text-black font-medium hover:underline text-sm">View All</a>
            </div>
            <div class="space-y-4">
              <div v-for="(agent, index) in agency.topAgents" :key="index"
                   class="flex items-center p-3 border border-gray-200 rounded bg-white hover:shadow-md transition">
                <img :src="agent.photo || '/api/placeholder/64/64'" alt="Agent" class="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h3 class="font-semibold">{{ agent.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ agent.position }}</p>
                  <div class="flex space-x-2 mt-1">
                    <button class="text-gray-500 hover:text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button class="text-gray-500 hover:text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Office Locations -->
          <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Our Offices</h2>
            <div class="space-y-6">
              <div v-for="(office, index) in agency.offices" :key="index" class="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <h3 class="font-semibold text-lg">{{ office.name }}</h3>
                <p class="text-gray-600 mb-2">{{ office.address }}</p>
                <div class="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span class="text-sm">{{ office.phone }}</span>
                </div>
                <div class="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm">{{ office.email }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm">{{ office.hours }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Additional Info -->
        <div class="lg:col-span-1">
          <!-- Contact Form -->
          <div class="bg-gray-50 rounded-lg shadow-md p-6 mb-6 sticky top-6">
            <h2 class="text-xl font-bold mb-4">Contact {{ agency.name }}</h2>
            <form>
              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black" placeholder="John Doe" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black" placeholder="john@example.com" />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label for="interest" class="block text-sm font-medium text-gray-700 mb-1">I'm interested in</label>
                  <select id="interest" class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black">
                    <option value="">Select an option</option>
                    <option value="buying">Buying a property</option>
                    <option value="selling">Selling a property</option>
                    <option value="renting">Renting a property</option>
                    <option value="investing">Real estate investment</option>
                    <option value="other">Other services</option>
                  </select>
                </div>
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows="4" class="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" class="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <!-- Accreditations -->
          <div class="bg-gray-50 rounded-lg shadow-md p-6" style="    position: sticky;
    top: 661px;">
            <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Accreditations</h2>
            <div class="flex flex-wrap justify-center gap-4">
              <div v-for="(accreditation, index) in agency.accreditations" :key="index" class="text-center">
                <img :src="accreditation.logo || '/api/placeholder/64/64'" alt="Accreditation" class="h-16 mx-auto mb-2" />
                <p class="text-sm text-gray-600">{{ accreditation.name }}</p>
              </div>
            </div>
          </div>





        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white mt-12">
      <div class="container mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ agency.name }}</h3>
            <p class="mb-4 text-gray-300">{{ agency.footerDescription }}</p>
            <div class="flex space-x-4">
              <a href="#" class="text-white hover:text-gray-300">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-white hover:text-gray-300">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                </svg>
              </a>
              <a href="#" class="text-white hover:text-gray-300">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a href="#" class="text-white hover:text-gray-300">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Properties</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Agents</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">News & Blog</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Property Types</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">Apartments</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Houses</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Condos</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Townhouses</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Villas</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Commercial</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Subscribe</h3>
            <p class="mb-4 text-gray-300">Get the latest properties and news</p>
            <form class="space-y-2">
              <input type="email" placeholder="Your email address" class="w-full p-2 rounded border-0 focus:ring-2 focus:ring-white text-black" />
              <button type="submit" class="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} {{ agency.name }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AgencyProfile2',
  data() {
    return {
      agency: {
        name: 'Elite Real Estate Group',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQEzr8qXBdRLgA/company-logo_200_200/company-logo_200_200/0/1715902987353/sothebysrealty_logo?e=2147483647&v=beta&t=VgNn94g57aU-m5oilNRaAtW312BNKXRgAAqUb1QcsjM', // URL to agency logo
        coverImage: "https://a1f470aa44cee10aaf60-79b9c6980828f750887af5d44364cd17.ssl.cf3.rackcdn.com/x/780cm360/images/Projects/balgores_hornchurch/balgores-estate-agents-hornchurch-estate-agents-office-interior-design_thubmnail.jpg", // URL to cover image
        tagline: 'Your Trusted Partner in Real Estate',
        headquarters: 'New York, NY',
        phone: '(555) 123-4567',
        email: 'realestate@ijar.tn',
        description: 'Elite Real Estate Group is a full-service real estate agency specializing in luxury properties and investment opportunities. Our team of experienced agents are dedicated to providing exceptional service to our clients.',
        established: 2010,
        licenseNumber: '123456789',
        agentCount: 25,
        propertiesSold: 500,
        specializations: ['Luxury Homes', 'Investment Properties', 'Commercial Real Estate'],
        services: [
          { title: 'Property Sales', description: 'Buy or sell your property with confidence' },
          { title: 'Property Management', description: 'Let us handle the details of managing your property' },
          { title: 'Investment Consultation', description: 'Expert advice on real estate investment opportunities' },
          { title: 'Legal Services', description: 'Access to top real estate attorneys for your transactions' }
        ],
        featuredListings: [
          {
            title: 'Luxury Villa in Miami',
            image: "https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x",
            status: 'For Sale',
            type: 'Villa',
            location: 'Miami, FL',
            price: 1250000,
            bedrooms: 4,
            bathrooms: 3,
            size: 3200
          },
          {
            title: 'Modern Condo in Los Angeles',
            image: "https://a0.muscache.com/im/pictures/f3dad936-d062-47ce-879e-03ce583dc10a.jpg?im_w=1200&im_format=avif 1x",
            status: 'For Sale',
            type: 'Condo',
            location: 'Los Angeles, CA',
            price: 850000,
            bedrooms: 2,
            bathrooms: 2,
            size: 1800
          },
          {
            title: 'Luxury Penthouse in New York',
            image: "https://a0.muscache.com/im/pictures/f903d5fe-a4fa-4e96-8b10-e15a965dc5b1.jpg?im_w=720&im_format=avif",
            status: 'For Sale',
            type: 'Penthouse',
            location: 'New York, NY',
            price: 2100000,
            bedrooms: 3,
            bathrooms: 3,
            size: 4000
          }
        ],
        testimonials: [
          {
            quote: 'Elite Real Estate Group helped me find the perfect home for my family. Their agents are professional and knowledgeable.',
            name: 'John Doe',
            type: 'Home Buyer',
            avatar: '/images/avatar-1.jpg'
          },
          {
            quote: 'I sold my property through Elite Real Estate Group and was impressed with the level of service they provided.',
            name: 'Jane Smith',
            type: 'Home Seller',
            avatar: '/images/avatar-2.jpg'
          }
        ],
        offices: [
          {
            name: 'Main Office',
            address: '123 Main Street, New York, NY 10001',
            phone: '(555) 123-4567',
            email: 'hellokitty@fsb.com',
            hours: 'Mon-Fri: 9am-5pm',
          },
          {
            name: 'Downtown Office',
            address: '456 Elm Street, New York, NY 10002',
            phone: '(555) 234-5678',
            email: 'hellokitty@fsb.com',
            hours: 'Mon-Fri: 9am-5pm',
          }
        ],
        topAgents: [
          {
            name: 'Alice Johnson',
            position: 'Real Estate Agent',
            photo: '/images/agent-1.jpg'
          },
          {
            name: 'Bob Smith',
            position: 'Real Estate Agent',
            photo: '/images/agent-2.jpg'
          },
          {
            name: 'Eve Williams',
            position: 'Real Estate Agent',
            photo: '/images/agent-3.jpg'
          }
        ],
        accreditations: [
          {
            name: 'National Association of Realtors',
            logo: '/images/nar-logo.png'
          },
          {
            name: 'Better Business Bureau',
            logo: '/images/bbb-logo.png'
          },
          {
            name: 'Real Estate Staging Association',
            logo: '/images/resa-logo.png'
          }
        ],
        footerDescription: 'Elite Realesate Group is a full-service real estate agency specializing in luxury properties and investment opportunities. Our team of experienced agents are dedicated to providing exceptional service to our clients.'
      }
    }
  }
}
</script>