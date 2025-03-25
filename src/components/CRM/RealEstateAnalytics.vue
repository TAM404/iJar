<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <header class="border-b border-gray-200 pb-5 mb-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Real Estate Analytics Dashboard</h1>
          <div class="flex items-center space-x-4">
            <div class="relative">
            <button @click="generatePerformanceReport" class="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800">
              Generate Report
            </button>
          </div>
            <div class="relative">

              <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>

            </div>
            <div class="relative">
              <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ currentMonth }} {{ currentYear }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="(kpi, index) in kpis" :key="index" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">{{ kpi.title }}</p>
              <p class="mt-1 text-xl font-semibold text-gray-900">{{ kpi.value }}</p>
            </div>
            <div :class="`p-3 rounded-full ${kpi.iconBg}`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="kpi.iconPath" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span :class="`text-sm ${kpi.trend > 0 ? 'text-green-600' : 'text-red-600'}`">
              <span class="font-medium">{{ Math.abs(kpi.trend) }}%</span>
              {{ kpi.trend > 0 ? 'increase' : 'decrease' }}
            </span>
            <svg v-if="kpi.trend > 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span class="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Sales Trend Chart -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">

            <h2 class="text-lg font-medium text-gray-900">Sales Performance</h2>

            <div class="flex items-center space-x-4">
              <select v-model="salesPeriod" class="text-sm border border-gray-300 focus:outline-none rounded-md py-1 px-2">
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button @click="exportToCSV('sales')" class="text-sm flex text-gray-600 hover:text-black">
                <img src="https://cdn-icons-png.flaticon.com/512/10561/10561522.png "
                                         alt="" title="" class="img-small"><span class="mr-1 mt-1">Export</span>
              </button>
            </div>

          </div>
          <div class="h-80">
            <!-- Vue Chart.js implementation would go here -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              <div class="h-80">
                <apexchart
                    type="line"
                    height="100%"
                    :options="salesChartOptions"
                    :series="salesChartSeries"
                style="width: 500px">
                </apexchart>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <input id="showProjections" type="checkbox" v-model="showProjections" class="h-4 w-4 text-black border-gray-300 rounded">
            <label for="showProjections" class="ml-2 block text-sm text-gray-600">Show Projections</label>
          </div>

          <div v-if="showProjections" class="mt-4">
            <h3 class="text-lg font-medium text-gray-900">Projected Sales</h3>
            <ul class="list-disc list-inside">
              <li v-for="(projection, index) in projectedSales" :key="index">
                Month {{ index + 1 }}: {{ projection }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Property Types -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center mb-6 space-x-16">
          <h2 class="text-lg font-medium text-gray-900 ">Property Distribution</h2>
          <button @click="exportToCSV('properties')" class="text-sm flex text-gray-600 hover:text-black">
            <img src="https://cdn-icons-png.flaticon.com/512/10561/10561522.png "
                                     alt="" title="" class="img-small"><span class="mr-1 mt-1">Export</span>
          </button>
          </div>
          <div class="h-64">
            <!-- Vue Chart.js implementation would go here -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              <div class="h-64">
                <apexchart
                    type="pie"
                    height="100%"
                    :options="propertyTypeOptions"
                    :series="propertyTypeSeries">
                </apexchart>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <div v-for="(item, index) in propertyTypes" :key="index" class="flex items-center justify-between py-2">
              <div class="flex items-center">
                <div :class="`w-3 h-3 rounded-full mr-2 ${item.color}`"></div>
                <span class="text-sm text-gray-600">{{ item.name }}</span>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ item.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Market Comparison -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class=" inline-flex space-x-60 mb-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">Price Comparison by Area</h2>
          <button @click="exportToCSV('property')" class="text-sm flex text-gray-600 hover:text-black">
            <img src="https://cdn-icons-png.flaticon.com/512/10561/10561522.png "
                 alt="" title="" class="img-small"><span class="mr-1 mt-1">Export</span>
          </button>
          </div>
          <div class="h-80">
            <!-- Vue Chart.js implementation would go here -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              <div class="h-80">
                <apexchart
                    type="bar"
                    height="100%"
                    :options="priceComparisonOptions"
                    :series="priceComparisonSeries"
                style="width: 500px">
                </apexchart>
              </div>
            </div>
          </div>
        </div>

        <!-- Agents Performance -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-medium text-gray-900">Top Performing Agents</h2>
            <div class="flex items-center space-x-4 justify-between ">
            <select v-model="agentPeriod" class="text-sm border border-gray-300 rounded-md py-1 px-2">
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
            <button @click="exportToCSV('agents')" class="text-sm flex text-gray-600 hover:text-black">
              <img src="https://cdn-icons-png.flaticon.com/512/10561/10561522.png "
                                       alt="" title="" class="img-small"><span class="mr-1 mt-1">Export</span>
            </button>


            </div></div>
          <div class="h-80">
            <!-- Vue Chart.js implementation would go here -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              <div class="h-80">
                <apexchart
                    type="bar"
                    height="100%"
                    :options="agentsPerformanceOptions"
                    :series="agentsPerformanceSeries"
                style="width: 500px">
                </apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Listings and Lead Conversion -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Latest Listings -->
        <div class="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
            <div class="w-full md:w-auto">
              <h2 class="text-xl font-semibold text-gray-900">Latest Properties</h2>
            </div>

            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <!-- Filter by Status -->
              <div class="relative">
                <select
                    v-model="propertyStatusFilter"
                    @change="filteredProperties = filterPropertiesByStatus(propertyStatusFilter)"
                    class="appearance-none bg-white text-sm border border-gray-300 rounded-lg py-2 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="For Sale">For Sale</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Filter by Type -->
              <div class="relative">
                <select
                    v-model="propertyTypeFilter"
                    @change="filteredProperties = filterPropertiesByType(propertyTypeFilter)"
                    class="appearance-none bg-white text-sm border border-gray-300 rounded-lg py-2 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="all">All Types</option>
                  <option value="Apartment">Apartments</option>
                  <option value="House">Houses</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Sort by Price Dropdown -->
              <div class="relative">
                <select
                    v-model="priceSort"
                    @change="sortByPrice(priceSort)"
                    class="appearance-none bg-white text-sm border border-gray-300 rounded-lg py-2 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option  value="">Sort by Price</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listed</th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(property, index) in filteredProperties" :key="index" class="hover:bg-gray-50">
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 flex-shrink-0 rounded bg-gray-200"></div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ property.name }}</div>
                      <div class="text-sm text-gray-500">{{ property.type }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{{ property.location }}</td>
                <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ property.price.toLocaleString() }}</td>
                <td class="px-3 py-4 whitespace-nowrap">
                    <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.statusClass}`">
                      {{ property.status }}
                    </span>
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{{ property.listedDate }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
            <button class="text-sm font-medium text-gray-900 hover:text-gray-700">View All Properties →</button>
          </div>
        </div>

        <!-- Lead Conversion -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-medium text-gray-900 mb-6">Lead Conversion</h2>
          <div class="h-64">
            <!-- Vue Chart.js implementation would go here -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              <div class="h-64">
                <apexchart
                    type="bar"
                    height="100%"
                    :options="leadConversionOptions"
                    :series="leadConversionSeries">
                </apexchart>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">Conversion Rate</p>
              <p class="text-xl font-bold text-gray-900 mt-1">24.8%</p>
              <p class="text-xs text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                2.1% vs last month
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-500">Avg. Response Time</p>
              <p class="text-xl font-bold text-gray-900 mt-1">2.4 hrs</p>
              <p class="text-xs text-red-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                0.3 hrs vs last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      propertyStatusFilter: 'all',
      propertyTypeFilter: 'all',
      priceSort: '',
      currentMonth: 'March',
      currentYear: 2025,
      salesPeriod: 'monthly',
      agentPeriod: 'monthly',
      propertyFilter: 'all',
      filteredProperties: [],
      showProjections: false,
      kpis: [
        {
          title: 'Total Revenue',
          value: '$1,458,500',
          trend: 12.5,
          iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          iconBg: 'bg-black'
        },
        {
          title: 'Properties Sold',
          value: '42',
          trend: 8.3,
          iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
          iconBg: 'bg-gray-800'
        },
        {
          title: 'Avg. Sale Price',
          value: '$347,250',
          trend: 5.2,
          iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          iconBg: 'bg-black'
        },
        {
          title: 'Days on Market',
          value: '28',
          trend: -15.2,
          iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          iconBg: 'bg-gray-800'
        }
      ],
      propertyTypes: [
        { name: 'Residential', percentage: 45, color: 'bg-black' },
        { name: 'Commercial', percentage: 25, color: 'bg-gray-600' },
        { name: 'Land', percentage: 15, color: 'bg-gray-400' },
        { name: 'Industrial', percentage: 15, color: 'bg-gray-200' }
      ],
      latestProperties: [
        {
          name: 'Modern Apartment',
          type: 'Apartment',
          location: 'Downtown',
          price: 425000,
          status: 'For Sale',
          statusClass: 'bg-green-100 text-green-800',
          listedDate: 'Mar 15, 2025'
        },
        {
          name: 'Luxury Villa',
          type: 'House',
          location: 'North Hills',
          price: 1250000,
          status: 'For Sale',
          statusClass: 'bg-green-100 text-green-800',
          listedDate: 'Mar 12, 2025'
        },
        {
          name: 'Office Space',
          type: 'Commercial',
          location: 'Business District',
          price: 750000,
          status: 'Under Contract',
          statusClass: 'bg-yellow-100 text-yellow-800',
          listedDate: 'Mar 10, 2025'
        },
        {
          name: 'City Apartment',
          type: 'Apartment',
          location: 'Midtown',
          price: 350000,
          status: 'Sold',
          statusClass: 'bg-gray-100 text-gray-800',
          listedDate: 'Mar 8, 2025'
        },
        {
          name: 'Suburban Home',
          type: 'House',
          location: 'East Side',
          price: 585000,
          status: 'For Sale',
          statusClass: 'bg-green-100 text-green-800',
          listedDate: 'Mar 5, 2025'
        }
      ],

      // ApexCharts configuration
      // 1. Sales Performance Line Chart
      salesChartOptions: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        colors: ['#000000'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          labels: {
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        yaxis: {
          title: {
            text: 'Amount ($)',
            style: {
              color: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + val.toLocaleString();
            },
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return '$' + val.toLocaleString();
            }
          }
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 4
        }
      },
      salesChartSeries: [
        {
          name: 'Sales',
          data: [240000, 300000, 280000, 320000, 380000, 420000, 450000, 470000, 440000, 410000, 390000, 420000]
        }
      ],

      // 2. Property Distribution Pie Chart
      propertyTypeOptions: {
        chart: {
          type: 'pie',
          fontFamily: 'Inter, sans-serif',
        },
        labels: ['Residential', 'Commercial', 'Land', 'Industrial'],
        colors: ['#000000', '#4B5563', '#9CA3AF', '#E5E7EB'],
        legend: {
          position: 'bottom',
          fontFamily: 'Inter, sans-serif',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        dataLabels: {
          enabled: false
        }
      },
      propertyTypeSeries: [45, 25, 15, 15],

      // 3. Price Comparison Bar Chart
      priceComparisonOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        colors: ['#000000'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Downtown', 'North Hills', 'East Side', 'West End', 'South Bay'],
          labels: {
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        yaxis: {
          title: {
            text: 'Price per sq ft ($)',
            style: {
              color: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + val.toFixed(0);
            },
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return '$' + val.toFixed(0) + ' per sq ft'
            }
          }
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 4
        }
      },
      priceComparisonSeries: [
        {
          name: 'Price Per Square Foot',
          data: [620, 480, 350, 420, 385]
        }
      ],

      // 4. Agents Performance Horizontal Bar Chart
      agentsPerformanceOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '70%',
          },
        },
        colors: ['#000000'],
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return '$' + val.toLocaleString();
          },
          style: {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          }
        },
        xaxis: {
          categories: ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Thompson'],
          labels: {
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 4
        }
      },
      agentsPerformanceSeries: [
        {
          name: 'Sales Volume',
          data: [1250000, 980000, 890000, 760000, 590000]
        }
      ],

      // 5. Lead Conversion Funnel Chart
      leadConversionOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif',
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            barHeight: '60%',
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#1F2937', '#000000'],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#000000']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: false
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: ['Inquiries', 'Qualified Leads', 'Property Viewings', 'Offers', 'Closed Deals'],
          labels: {
            style: {
              colors: '#6B7280',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
            }
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'light',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        },
        grid: {
          borderColor: '#E5E7EB',
          strokeDashArray: 4
        }
      },
      leadConversionSeries: [
        {
          data: [120, 82, 43, 28, 14]
        }
      ]
    }
  },
  computed: {
    projectedSales() {
      return this.showProjections ? this.calculateProjectedSales() : [];
    }
  },
  methods: {
    // You can add methods here to handle filter changes, period selections, etc.
    updateSalesPeriod() {
      // Example method to update sales data based on selected period
      if (this.salesPeriod === 'quarterly') {
        this.salesChartOptions.xaxis.categories = ['Q1', 'Q2', 'Q3', 'Q4'];
        this.salesChartSeries = [{
          name: 'Sales',
          data: [820000, 1250000, 1360000, 1220000]
        }];
      } else if (this.salesPeriod === 'yearly') {
        this.salesChartOptions.xaxis.categories = ['2022', '2023', '2024', '2025'];
        this.salesChartSeries = [{
          name: 'Sales',
          data: [3200000, 3800000, 4100000, 4520000]
        }];
      } else {
        // monthly (default)
        this.salesChartOptions.xaxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.salesChartSeries = [{
          name: 'Sales',
          data: [240000, 300000, 280000, 320000, 380000, 420000, 450000, 470000, 440000, 410000, 390000, 420000]
        }];
      }
    },
    // Update agent performance data based on selected period
    updateAgentPerformance() {
      if (this.agentPeriod === 'quarterly') {
        this.agentsPerformanceSeries = [{
          name: 'Sales Volume',
          data: [3250000, 2680000, 2190000, 1960000, 1430000]
        }];
      } else if (this.agentPeriod === 'yearly') {
        this.agentsPerformanceSeries = [{
          name: 'Sales Volume',
          data: [9850000, 7980000, 6890000, 5760000, 4590000]
        }];
      } else {
        // monthly (default)
        this.agentsPerformanceSeries = [{
          name: 'Sales Volume',
          data: [1250000, 980000, 890000, 760000, 590000]
        }];
      }
    },
    // Filter properties by status
    filterPropertiesByStatus(status) {
      if (status === 'all') {
        return this.latestProperties;
      }
      return this.latestProperties.filter(property => property.status === status);
    },

    // Filter properties by type
    filterPropertiesByType(type) {
      if (type === 'all') {
        return this.latestProperties;
      }
      return this.latestProperties.filter(property => property.type === type);
    },
    sortByPrice(direction) {
      if (direction === '') {
        this.filteredProperties = this.latestProperties;
      } else {
        this.filteredProperties = [...this.latestProperties].sort((a, b) => {
          return direction === 'asc' ? a.price - b.price : b.price - a.price;
        });
      }
    },

    // Sort properties by price (ascending or descending)
    sortPropertiesByPrice(direction = 'desc') {
      const sortedProperties = [...this.latestProperties];
      return sortedProperties.sort((a, b) => {
        return direction === 'desc' ? b.price - a.price : a.price - b.price;
      });
    },

    // Calculate average price by property type
    calculateAveragePriceByType(type) {
      const filteredProperties = this.filterPropertiesByType(type);
      if (filteredProperties.length === 0) return 0;

      const sum = filteredProperties.reduce((total, property) => total + property.price, 0);
      return sum / filteredProperties.length;
    },

    // Get price trend data for a specific area
    getPriceTrendByArea(area) {
      // Sample data - in a real app this would come from an API or database
      const areaData = {
        'Downtown': [590, 605, 618, 620, 615, 630],
        'North Hills': [450, 460, 468, 480, 485, 490],
        'East Side': [320, 330, 345, 350, 355, 360],
        'West End': [380, 395, 410, 420, 425, 430],
        'South Bay': [365, 370, 375, 385, 390, 395]
      };

      return areaData[area] || [];
    },

    // Export current view data to CSV
    exportToCSV(type) {
      let data = [];
      let filename = '';

      // Determine what data to export
      if (type === 'sales') {
        data = this.salesChartSeries[0].data.map((value, index) => {
          return {
            period: this.salesChartOptions.xaxis.categories[index],
            value: value
          };
        });
        filename = `sales_data_${this.salesPeriod}.csv`;
      } else if (type === 'agents') {
        data = this.agentsPerformanceSeries[0].data.map((value, index) => {
          return {
            agent: this.agentsPerformanceOptions.xaxis.categories[index],
            value: value
          };
        });
        filename = `agent_performance_${this.agentPeriod}.csv`;
      } else if (type === 'properties') {
        data = this.latestProperties;
        filename = 'property_listings.csv';
      }

      // In a real app, you would implement the actual CSV generation and download here
      console.log(`Exporting ${type} data to ${filename}`, data);
      alert(`Export ${filename} requested. In a real app, this would download a CSV file.`);
    },

    // Generate performance report with basic metrics
    generatePerformanceReport() {
      const report = {
        totalRevenue: this.kpis[0].value,
        propertiesSold: this.kpis[1].value,
        avgSalePrice: this.kpis[2].value,
        avgDaysOnMarket: this.kpis[3].value,
        topAgent: this.agentsPerformanceOptions.xaxis.categories[0],
        topAgentSales: this.agentsPerformanceSeries[0].data[0],
        conversionRate: '24.8%',
        period: `${this.currentMonth} ${this.currentYear}`
      };

      console.log('Performance Report Generated:', report);
      return report;
    },

    // Compare current performance with previous periods
    compareWithPreviousPeriod(metric) {
      // This would be connected to an API in a real application
      const comparisons = {
        'revenue': {
          current: 1458500,
          previous: 1296000,
          change: 12.5,
          trend: 'up'
        },
        'units': {
          current: 42,
          previous: 39,
          change: 7.7,
          trend: 'up'
        },
        'avgPrice': {
          current: 347250,
          previous: 330000,
          change: 5.2,
          trend: 'up'
        },
        'daysOnMarket': {
          current: 28,
          previous: 33,
          change: -15.2,
          trend: 'down'
        }
      };

      return comparisons[metric] || null;
    },

    // Calculate projected sales for upcoming months
    calculateProjectedSales() {
      // Using a simple moving average as a projection method
      const salesData = this.salesChartSeries[0].data;
      const lastThreeMonths = salesData.slice(-3);
      const average = lastThreeMonths.reduce((a, b) => a + b, 0) / lastThreeMonths.length;

      // Apply a growth factor (can be adjusted based on market conditions)
      const growthFactor = 1.02;

      // Project next three months
      return [
        Math.round(average * growthFactor),
        Math.round(average * growthFactor * growthFactor),
        Math.round(average * growthFactor * growthFactor * growthFactor)
      ];
    }
  },
  watch: {

    propertyStatusFilter(newFilter) {
      this.filteredProperties = this.filterPropertiesByStatus(newFilter);
    },
    propertyTypeFilter(newFilter) {
      this.filteredProperties = this.filterPropertiesByType(newFilter);
    },

    salesPeriod: {
      handler() {
        this.updateSalesPeriod();
      }
    },
    agentPeriod: {
      handler() {
        this.updateAgentPerformance();
        // Similar function could be added here to update agent performance data


      }
    }
  },
  mounted() {
    // Initialize filteredProperties with all properties
    this.filteredProperties = this.latestProperties;
  }
}
</script>
<style scoped>
.img-small {
  width: 24px;
  height: 24px;
}
</style>