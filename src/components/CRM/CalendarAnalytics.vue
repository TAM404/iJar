<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Calendar Analytics</h2>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-500">Total Events</h3>
        <p class="text-3xl font-bold text-gray-900">{{ totalEvents }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-500">Properties</h3>
        <p class="text-3xl font-bold text-gray-900">{{ properties.length }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-500">Clients</h3>
        <p class="text-3xl font-bold text-gray-900">{{ clients.length }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-500">Most Common Event</h3>
        <p class="text-xl font-bold text-gray-900">{{ mostCommonEventType }}</p>
      </div>
    </div>

    <!-- Event Type Distribution Chart -->
    <div class="mb-10">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Event Type Distribution</h3>
      <div class="bg-gray-50 p-4 rounded-lg" style="height: 300px">
        <apexchart
            type="donut"
            :options="eventTypeChartOptions"
            :series="eventTypeChartSeries"
            height="100%"
        />
      </div>
    </div>

    <!-- Weekly Activity Chart -->
    <div class="mb-10">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
      <div class="bg-gray-50 p-4 rounded-lg" style="height: 300px">
        <apexchart
            type="bar"
            :options="weeklyActivityChartOptions"
            :series="weeklyActivityChartSeries"
            height="100%"
        />
      </div>
    </div>

    <!-- Properties & Clients -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Property Insights -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Property Insights</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div v-if="topProperty" class="mb-4">
            <p class="text-sm font-medium text-gray-500">Most Scheduled Property</p>
            <p class="font-medium text-gray-900">{{ topProperty.address }}</p>
            <p class="text-sm text-gray-500">{{ propertiesWithEvents[topProperty.id] || 0 }} events</p>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">For Sale</span>
              <span class="font-medium text-gray-900">{{ propertyStatusCount.forSale }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Pending</span>
              <span class="font-medium text-gray-900">{{ propertyStatusCount.pending }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Insights -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Client Insights</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div v-if="topClient" class="mb-4">
            <p class="text-sm font-medium text-gray-500">Most Active Client</p>
            <p class="font-medium text-gray-900">{{ topClient.name }}</p>
            <p class="text-sm text-gray-500">{{ clientsWithEvents[topClient.id] || 0 }} events</p>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Buyers</span>
              <span class="font-medium text-gray-900">{{ clientTypeCount.buyer }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Sellers</span>
              <span class="font-medium text-gray-900">{{ clientTypeCount.seller }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Events -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
      <div v-if="upcomingEvents.length" class="divide-y divide-gray-200">
        <div v-for="event in upcomingEvents" :key="event.id" class="py-3">
          <div class="flex items-center">
            <div :class="`w-3 h-3 rounded-full mr-3 ${getEventClass(event.type)}`"></div>
            <div>
              <p class="font-medium text-gray-900">{{ event.title }}</p>
              <p class="text-sm text-gray-500">{{ formatEventDate(event.date) }} · {{ event.time }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 italic">No upcoming events</div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'CalendarAnalytics',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    properties: {
      type: Array,
      required: true
    },
    clients: {
      type: Array,
      required: true
    },
    eventTypes: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      eventTypeChartOptions: {
        chart: {
          type: 'donut',
          fontFamily: 'inherit',
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%'
            }
          }
        },
        labels: [],
        colors: [
          '#b2d3ff', // bg-blue-500 for showing
          '#22C55E', // bg-green-500 for client
          '#EAB308', // bg-yellow-500 for inspection
          '#A855F7', // bg-purple-500 for closing
          '#6B7280'  // bg-gray-500 for other
        ],
        legend: {
          position: 'bottom',
          fontFamily: 'inherit',
          labels: {
            colors: 'rgb(55, 65, 81)'
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      weeklyActivityChartOptions: {
        chart: {
          type: 'bar',
          fontFamily: 'inherit',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: '60%',
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: 'rgb(55, 65, 81)'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: 'rgb(55, 65, 81)'
            }
          }
        },
        grid: {
          borderColor: 'rgba(0, 0, 0, 0.1)',
          xaxis: {
            lines: {
              show: false
            }
          }
        },
        colors: ['rgba(0, 0, 0, 0.7)']
      }
    }
  },
  computed: {
    totalEvents() {
      return this.events.length;
    },
    eventTypeCount() {
      const counts = {
        showing: 0,
        client: 0,
        inspection: 0,
        closing: 0,
        other: 0
      };

      this.events.forEach(event => {
        if (counts[event.type] !== undefined) {
          counts[event.type]++;
        } else {
          counts.other++;
        }
      });

      return counts;
    },
    mostCommonEventType() {
      const counts = this.eventTypeCount;
      let maxType = 'none';
      let maxCount = 0;

      Object.keys(counts).forEach(type => {
        if (counts[type] > maxCount) {
          maxCount = counts[type];
          maxType = type;
        }
      });

      return maxCount > 0 ? this.formatEventType(maxType) : 'None';
    },
    weekdayCount() {
      const counts = {
        0: 0, // Sunday
        1: 0, // Monday
        2: 0, // Tuesday
        3: 0, // Wednesday
        4: 0, // Thursday
        5: 0, // Friday
        6: 0  // Saturday
      };

      this.events.forEach(event => {
        const date = new Date(event.date);
        const day = date.getDay();
        counts[day]++;
      });

      return counts;
    },
    propertiesWithEvents() {
      const counts = {};

      this.events.forEach(event => {
        if (event.propertyId) {
          if (!counts[event.propertyId]) {
            counts[event.propertyId] = 0;
          }
          counts[event.propertyId]++;
        }
      });

      return counts;
    },
    topProperty() {
      const counts = this.propertiesWithEvents;
      let maxId = null;
      let maxCount = 0;

      Object.keys(counts).forEach(id => {
        if (counts[id] > maxCount) {
          maxCount = counts[id];
          maxId = id;
        }
      });

      if (maxId) {
        return this.properties.find(p => p.id == maxId);
      }

      return this.properties[0] || null;
    },
    propertyStatusCount() {
      const counts = {
        forSale: 0,
        pending: 0,
        other: 0
      };

      this.properties.forEach(property => {
        if (property.status === 'For Sale') {
          counts.forSale++;
        } else if (property.status === 'Pending') {
          counts.pending++;
        } else {
          counts.other++;
        }
      });

      return counts;
    },
    clientsWithEvents() {
      const counts = {};

      this.events.forEach(event => {
        if (event.clientId) {
          if (!counts[event.clientId]) {
            counts[event.clientId] = 0;
          }
          counts[event.clientId]++;
        }
      });

      return counts;
    },
    topClient() {
      const counts = this.clientsWithEvents;
      let maxId = null;
      let maxCount = 0;

      Object.keys(counts).forEach(id => {
        if (counts[id] > maxCount) {
          maxCount = counts[id];
          maxId = id;
        }
      });

      if (maxId) {
        return this.clients.find(c => c.id == maxId);
      }

      return this.clients[0] || null;
    },
    clientTypeCount() {
      const counts = {
        buyer: 0,
        seller: 0,
        other: 0
      };

      this.clients.forEach(client => {
        if (client.type === 'Buyer') {
          counts.buyer++;
        } else if (client.type === 'Seller') {
          counts.seller++;
        } else {
          counts.other++;
        }
      });

      return counts;
    },
    upcomingEvents() {
      const now = new Date();
      return this.events
          .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now;
          })
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          })
          .slice(0, 5);
    },
    eventTypeChartSeries() {
      const counts = this.eventTypeCount;
      return Object.values(counts);
    },
    weeklyActivityChartSeries() {
      return [{
        name: 'Number of Events',
        data: Object.values(this.weekdayCount)
      }];
    }
  },
  watch: {
    eventTypeCount: {
      handler(newVal) {
        this.eventTypeChartOptions = {
          ...this.eventTypeChartOptions,
          labels: Object.keys(newVal).map(this.formatEventType)
        };
      },
      immediate: true
    }
  },
  methods: {
    formatEventType(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
    getEventClass(type) {
      return this.eventTypes[type] || this.eventTypes.other;
    },
    formatEventDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

  },
  mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>