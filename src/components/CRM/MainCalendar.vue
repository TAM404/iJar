// EnhancedRealEstateCalendar.vue
<template>
  <div class="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
    <!-- Calendar Header with improved design -->
    <div class="bg-black text-white px-6 py-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold tracking-tight">Ijar Calendar</h2>
        <div class="flex items-center space-x-2">
          <span class="text-sm bg-white text-black px-3 py-1 rounded-full">{{ agentName }}</span>
          <button @click="toggleView" class="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm">
            {{ currentView === 'month' ? 'Week View' : 'Month View' }}
          </button>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <h3 class="text-xl font-medium">{{ formatMonthYear }}</h3>
          <span v-if="currentView === 'week'" class="ml-2 text-sm bg-gray-800 px-2 py-1 rounded">
            Week {{ currentWeek }}
          </span>
        </div>
        <div class="flex space-x-2">
          <button @click="previousPeriod" class="p-2 hover:bg-gray-800 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="currentPeriod" class="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition-colors" style="background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 20px;
}">
            Today
          </button>
          <button @click="nextPeriod" class="p-2 hover:bg-gray-800 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar Controls & Filters -->
    <div class="bg-white px-6 py-3 flex flex-wrap justify-between items-center border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
              type="text"
              placeholder="Search events..."
              v-model="searchTerm"
              class="pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-2 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Filter:</span>
          <div class="flex space-x-1">
            <button
                v-for="(_, type) in eventTypes"
                :key="type"
                @click="toggleFilter(type)"
                class="px-2 py-1 text-xs rounded-full border"
                :class="activeFilters.includes(type) ? getEventTypeClasses(type) : 'border-gray-300 bg-white text-gray-600'"
            >
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-end  gap-2.5">
      <button
          @click="openNewEventModal(new Date())"
          class="flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>New Event</span>
      </button>
      <!-- Toggle Button for Event Summary Section -->
      <div class="flex justify-end ">
        <button
            @click="showEventSummary = !showEventSummary"
            class="flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            style="background: transparent;
    color: black;
    border: 1px solid;"
        >
          <span v-if="showEventSummary">Hide Events</span>
          <span v-else>Show Events</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="showEventSummary" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      </div>
    </div>
    <div class="flex flex-col transition-all duration-300 ease-in-out md:flex-row w-full">
      <!-- Calendar section (70%) -->
      <div
          class="w-full md:w-full transition-all duration-300 ease-in-out scrollbar-thin overfloww-auto"
          :style="{'width:60.6%': showEventSummary}"
          style="margin-left: 20px; max-height: 85vh;"
      >
        <!-- Weekdays Header - Keep fixed while scrolling -->
        <div class="grid grid-cols-7 bg-white border-b border-gray-200 sticky top-0 z-10" style="grid-template-columns: repeat(7, minmax(0, 1fr));">
          <div v-for="day in weekdays" :key="day.short" class="text-center py-3">
            <span class="font-semibold text-gray-800">{{ day.short }}</span>
            <span class="block text-xs text-gray-500">{{ currentView === 'week' ? day.date : '' }}</span>
          </div>
        </div>

        <!-- Month View Calendar Grid -->
        <div v-if="currentView === 'month'" class="grid grid-cols-7 bg-white overflow-y-auto" style="grid-template-columns: repeat(7, minmax(0, 1fr));">
          <div
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="[
        'border border-gray-200 min-h-32 p-1 transition-colors duration-150',
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
        day.isToday ? 'rinng-2 rinng-black' : '',
        day.date.getDay() === 0 || day.date.getDay() === 6 ? 'bg-gray-50' : '',
        hoveredDate && isSameDay(day.date, hoveredDate) ? 'bg-gray-100' : '',
      ]"
              @mouseenter="hoveredDate = day.date"
              @mouseleave="hoveredDate = null"
              @dragover="allowDrop($event)"
              @drop="onDrop($event, day.date)"

          >
            <!-- Day Header -->
            <div class="flex justify-between items-center mb-1">
          <span
              class="inline-flex items-center justify-center w-6 h-6 text-sm"
              :class="{'bg-black text-white rounded-full font-bold': day.isToday}"

          >
            {{ day.date.getDate() }}
          </span>

              <button
                  v-if="day.isCurrentMonth"
                  @click="openNewEventModal(day.date)"
                  class="text-gray-400 hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <!-- Events -->
            <div class="space-y-1 overflow-y-auto max-h-28 scrollbar-thin">
              <div
                  v-for="event in getEventsForDay(day.date)"
                  :key="event.id"
                  @click="editEvent(event)"
                  :class="[
            'px-2 py-1 rounded cursor-pointer text-xs truncate transition-transform hover:scale-105 hover:shadow',
            getEventTypeClasses(event.type)
          ]"
                  draggable="true"
                  @dragstart="onDragStart($event, event)"
              >
                <div class="flex items-center">
                  <span class="w-2 h-2 rounded-full mr-1" :class="getEventTypeDot(event.type)"></span>
                  <span>{{ event.time }} - {{ event.title }}</span>
                </div>
              </div>


              <!-- More events indicator remains the same -->
              <div
                  v-if="getEventsForDay(day.date).length > 3 && !expandedDays.includes(formatDate(day.date))"
                  @click="toggleExpandDay(day.date)"
                  class="text-xs text-center py-1 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                + {{ getEventsForDay(day.date).length - 3 }} more
              </div>
            </div>
          </div>
        </div>

        <!-- Week View with fixed height and scrollable content -->
        <div v-else class="grid grid-cols-7 bg-white overflow-y-auto" style="grid-template-columns: repeat(7, minmax(0, 1fr)); height: calc(85vh - 40px);">
          <div
              v-for="(day, colIndex) in weekDays"
              :key="colIndex"
              class="border border-gray-200 relative"
              style="height:720px;"
          :class="[
          day.isToday ? 'ring-2 ring-black' : '',
          day.date.getDay() === 0 || day.date.getDay() === 6 ? 'bg-gray-50' : 'bg-white',
          ]"
          @dragover="allowDrop($event)"
          @drop="onWeekViewDrop($event, day, $event.clientY)"
          >
          <!-- Time slots -->
          <div class="relative h-full pt-2">
            <div
                v-for="hour in 12"
                :key="hour"
                class="absolute w-full border-t border-gray-100 text-xs text-gray-400"
                :style="{ top: (hour * (100 / 12)) + '%' }"
            >
              <span class="absolute -top-2 left-1">{{ hour + 7 }}:00</span>
            </div>

            <!-- Current time indicator -->
            <div
                v-if="day.isToday"
                class="absolute w-full border-t-2 border-red-500 z-10"
                :style="{ top: calculateCurrentTimePosition() + '%' }"
            >
              <div class="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-red-500"></div>
            </div>

            <!-- Events -->
            <div
                v-for="event in getEventsForDay(day.date)"
                :key="event.id"
                @click="editEvent(event)"
                class="absolute mx-1 rounded shadow px-2 py-1 cursor-pointer text-xs overflow-hidden transition-all hover:z-30 hover:shadow-md"
                :class="getEventTypeClasses(event.type)"
                :style="calculateEventPosition(event)"
                draggable="true"
                @dragstart="onDragStart($event, event)"
            >
              <div class="font-semibold">{{ event.title }}</div>
              <div>{{ event.time }}</div>
            </div>
          </div>

          <!-- Add event button -->
          <button
              @click="openNewEventModal(day.date)"
              class="absolute top-1 right-1 text-gray-400 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Event Summary Section with transition for showing/hiding -->
    <transition name="slide">
      <div v-if="showEventSummary" class="space-y-2 overflow-y-auto pr-2 scrollbar-thin w-full md:w-1/2 flex flex-col p-4 border-t md:border-t-0 md:border-l border-gray-200 overflow-auto" style="max-height: 85vh;">
        <div class="px-6 py-4 mb-4" style="border: 1px solid #0000004d; border-radius: 20px; background: white;">

          <h3 class="text-lg font-semibold text-gray-800 mb-3">Upcoming Events</h3>
            <div
                v-for="event in upcomingEvents"
                :key="event.id"
                @click="editEvent(event)"
                class="flex items-center p-2 rounded-lg hover:bg-white cursor-pointer border border-gray-200 transition-colors"
            >
              <div class="w-2 h-10 rounded-full mr-3" :class="getEventTypeDot(event.type)"></div>
              <div class="flex-1">
                <div class="font-medium">{{ event.title }}</div>
                <div class="text-sm text-gray-500">
                  {{ formatEventDate(event.date) }} at {{ event.time }}
                  <span v-if="event.propertyId" class="ml-2 text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                  {{ getPropertyAddress(event.propertyId) }}
                </span>
                </div>
              </div>
              <div class="text-xs px-2 py-1 rounded-full" :class="getEventTypeBadge(event.type)">
                {{ event.type.charAt(0).toUpperCase() + event.type.slice(1) }}
              </div>
            </div>

        </div>
        <div >
          <EventHeatmap
              :events="events"
              :current-date="currentDate"
              :weekdays="weekdays"
              :event-types="eventTypes"
              :active-filters="activeFilters"
              @day-selected="handleDaySelected"
              @toggle-filter="toggleFilter"
          />
        </div>
        <CalendarAnalytics
            :events="events"
            :properties="properties"
            :clients="clients"
            :eventTypes="eventTypes"
        />
      </div>
    </transition>
  </div>
  </div>

    <!-- Event Modal with improved design -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div class="bg-black text-white px-6 py-4 flex justify-between items-center">
          <h3 class="text-lg font-semibold">
            {{ editingEvent.id ? 'Edit Event' : 'New Event' }}
          </h3>
          <button @click="closeEventModal" class="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
                type="text"
                v-model="editingEvent.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Event title"
            >
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                  type="date"
                  v-model="editingEvent.date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                  type="time"
                  v-model="editingEvent.time"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <div class="flex items-center space-x-3">
              <select
                  v-model="editingEvent.duration"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
                <option value="custom">Custom</option>
              </select>

              <input
                  v-if="editingEvent.duration === 'custom'"
                  type="number"
                  v-model="editingEvent.customDuration"
                  min="15"
                  step="15"
                  class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Minutes"
              >
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                  v-for="(classes, type) in eventTypes"
                  :key="type"
                  @click="editingEvent.type = type"
                  :class="[
                  'py-2 px-2 rounded-lg text-center text-xs font-medium border transition-colors',
                  editingEvent.type === type ?
                    getEventTypeClasses(type) :
                    'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ type.charAt(0).toUpperCase() + type.slice(1) }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Property</label>
              <select
                  v-model="editingEvent.propertyId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select property</option>
                <option v-for="property in properties" :key="property.id" :value="property.id">
                  {{ property.address }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <select
                  v-model="editingEvent.clientId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select client</option>
                <option v-for="client in clients" :key="client.id" :value="client.id">
                  {{ client.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
                v-model="editingEvent.notes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Additional details about this event..."
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Reminders</label>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="reminder in reminderOptions"
                  :key="reminder.value"
                  @click="toggleReminder(reminder.value)"
                  :class="[
                  'px-3 py-1 rounded-full text-xs transition-colors',
                  editingEvent.reminders.includes(reminder.value) ?
                    'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                ]"
              >
                {{ reminder.label }}
              </button>
            </div>
          </div>

          <div class="mt-6 flex justify-between">
            <div>
              <button
                  v-if="editingEvent.id"
                  @click="deleteEvent"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Event
              </button>
            </div>

            <div class="flex space-x-3">
              <button
                  @click="closeEventModal"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                  @click="saveEvent"
                  class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { ref, computed, onMounted } from 'vue';
import draggable from 'vuedraggable';
import EventHeatmap from "@/components/RealEstate/CRM/EventHeatmap.vue";
import CalendarAnalytics from "@/components/RealEstate/CRM/CalendarAnalytics.vue";
export default {
  name: 'CalendarClone',
  components: {
    CalendarAnalytics,
    EventHeatmap,
    draggable
  },

  data() {
    return {
      agentName: 'Sarah Johnson',
      currentDate: new Date(),
      currentView: 'month', // 'month' or 'week'
      currentWeek: 0,
      showEventSummary: true,
      weekdays: [
        { short: 'Sun', full: 'Sunday' },
        { short: 'Mon', full: 'Monday' },
        { short: 'Tue', full: 'Tuesday' },
        { short: 'Wed', full: 'Wednesday' },
        { short: 'Thu', full: 'Thursday' },
        { short: 'Fri', full: 'Friday' },
        { short: 'Sat', full: 'Saturday' }
      ],
      events: [],
      showEventModal: false,
      editingEvent: {
        id: null,
        title: '',
        date: '',
        time: '',
        duration: '60',
        customDuration: 30,
        type: 'showing',
        propertyId: '',
        clientId: '',
        notes: '',
        reminders: ['1hour']
      },
      // Sample data
      properties: [
        { id: 1, address: '123 Main St, Anytown, USA', price: '$450,000', status: 'For Sale' },
        { id: 2, address: '456 Oak Ave, Somewhere, USA', price: '$675,000', status: 'For Sale' },
        { id: 3, address: '789 Pine Rd, Elsewhere, USA', price: '$320,000', status: 'Pending' },
        { id: 4, address: '101 Beach Blvd, Coastal City, USA', price: '$890,000', status: 'For Sale' },
        { id: 5, address: '222 Mountain View, Highland, USA', price: '$525,000', status: 'For Sale' }
      ],
      clients: [
        { id: 1, name: 'John Smith', type: 'Buyer', phone: '555-123-4567' },
        { id: 2, name: 'Jane Doe', type: 'Seller', phone: '555-987-6543' },
        { id: 3, name: 'Robert Johnson', type: 'Buyer', phone: '555-456-7890' },
        { id: 4, name: 'Emma Wilson', type: 'Buyer', phone: '555-222-3333' },
        { id: 5, name: 'Michael Brown', type: 'Seller', phone: '555-444-5555' }
      ],
      reminderOptions: [
        { value: '10min', label: '10 minutes before' },
        { value: '30min', label: '30 minutes before' },
        { value: '1hour', label: '1 hour before' },
        { value: '1day', label: '1 day before' }
      ],
      eventTypes: {
        showing: 'bg-blue-100 text-blue-800',
        client: 'bg-green-100 text-green-800',
        inspection: 'bg-yellow-100 text-yellow-800',
        closing: 'bg-purple-100 text-purple-800',
        other: 'bg-gray-100 text-gray-800'
      },
      expandedDays: [],
      hoveredDate: null,
      searchTerm: '',
      activeFilters: ['showing', 'client', 'inspection', 'closing', 'other']
    };
  },
  computed: {
    formatMonthYear() {
      return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      // First day of the month
      const firstDay = new Date(year, month, 1);

      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);

      // Number of days in the month
      const daysInMonth = lastDay.getDate();

      // Get the day of the week of the first day (0-6, Sunday-Saturday)
      let firstDayOfWeek = firstDay.getDay();

      // Generate days from previous month to fill the first row
      const prevMonthDays = [];
      if (firstDayOfWeek > 0) {
        const prevMonth = new Date(year, month, 0);
        const daysInPrevMonth = prevMonth.getDate();

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
          const day = daysInPrevMonth - i;
          const date = new Date(year, month - 1, day);
          prevMonthDays.push({
            date,
            isCurrentMonth: false,
            isToday: this.isToday(date)
          });
        }
      }

      // Generate days for the current month
      const currentMonthDays = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        currentMonthDays.push({
          date,
          isCurrentMonth: true,
          isToday: this.isToday(date)
        });
      }

      // Generate days from the next month to fill the last row
      const nextMonthDays = [];
      const totalDays = prevMonthDays.length + currentMonthDays.length;
      const daysNeeded = Math.ceil(totalDays / 7) * 7;

      if (totalDays < daysNeeded) {
        const daysToAdd = daysNeeded - totalDays;
        for (let day = 1; day <= daysToAdd; day++) {
          const date = new Date(year, month + 1, day);
          nextMonthDays.push({
            date,
            isCurrentMonth: false,
            isToday: this.isToday(date)
          });
        }
      }

      // Combine all days
      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
    weekDays() {
      const result = [];
      const currentDay = new Date(this.currentDate);

      // Set to the first day of the current week (Sunday)
      const firstDayOfWeek = currentDay.getDate() - currentDay.getDay();

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDay.getFullYear(), currentDay.getMonth(), firstDayOfWeek + i);

        // Update weekday header with dates for week view
        this.weekdays[i].date = date.getDate();

        result.push({
          date,
          isToday: this.isToday(date)
        });
      }

      return result;
    },
    upcomingEvents() {
      const today = new Date();
      const filtered = this.events
          .filter(event => {
            const eventDate = new Date(event.date + 'T' + event.time);
            return eventDate >= today;
          })
          .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA - dateB;
          });

      return filtered.slice(0, 5); // Return next 5 upcoming events
    }

  },
  methods: {
    handleDaySelected(date) {
    // Update the current date when a day is selected
      // This is used in the EventHeatmap component
    },




    // Enable drag start
    onDragStart(event, calendarEvent) {
      event.dataTransfer.setData('text/plain', JSON.stringify(calendarEvent));
      event.dataTransfer.effectAllowed = 'move';
    },
    // Handle drop event
    onDrop(event, dropDate) {
      const draggedEvent = JSON.parse(event.dataTransfer.getData('text/plain'));

      // Prevent default to allow drop
      event.preventDefault();

      // Clone the event
      const updatedEvent = { ...draggedEvent };

      // Update the event date
      updatedEvent.date = this.formatDate(dropDate);

      // If you're dropping on a different day and want to keep the same time
      // You don't need to modify the time property

      // Update the event in your events array
      const eventIndex = this.events.findIndex(e => e.id === draggedEvent.id);
      if (eventIndex !== -1) {
        this.events[eventIndex] = updatedEvent;

        // You might want to call an API here to update the event in your backend
        // this.updateEventInDatabase(updatedEvent);
      }
    },
    // Allow drop
    allowDrop(event) {
      event.preventDefault();
    },
    onWeekViewDrop(event, day, clientY) {
      const draggedEvent = JSON.parse(event.dataTransfer.getData('text/plain'));
      event.preventDefault();

      // Clone the event
      const updatedEvent = { ...draggedEvent };

      // Update the date
      updatedEvent.date = this.formatDate(day.date);

      // Calculate new time based on drop position
      const containerRect = event.currentTarget.getBoundingClientRect();
      const dropPercentage = (clientY - containerRect.top) / containerRect.height;

      // Convert to hours (assuming your day view spans from 7am to 7pm = 12 hours)
      const startHour = 7; // 7am
      const totalHours = 12;
      const dropHour = startHour + Math.floor(dropPercentage * totalHours);
      const dropMinute = Math.round((dropPercentage * totalHours % 1) * 60 / 15) * 15; // Round to nearest 15 min

      // Format the new time
      updatedEvent.time = `${dropHour.toString().padStart(2, '0')}:${dropMinute.toString().padStart(2, '0')}`;

      // Update the event
      const eventIndex = this.events.findIndex(e => e.id === draggedEvent.id);
      if (eventIndex !== -1) {
        this.events[eventIndex] = updatedEvent;
        // this.updateEventInDatabase(updatedEvent);
      }
    },
    // Update event in database (placeholder)
    updateEventInDatabase(event) {
      // This is where you would make an API call to update your event
      console.log('Updating event in database:', event);
      // Example: await axios.put(`/api/events/${event.id}`, event);
    },
    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();
    },
    isSameDay(date1, date2) {
      return date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear();
    },
    previousPeriod() {
      if (this.currentView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      } else {
        // Move one week back
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() - 7);
        this.currentDate = newDate;
      }
    },
    nextPeriod() {
      if (this.currentView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      } else {
        // Move one week forward
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + 7);
        this.currentDate = newDate;
      }
    },
    currentPeriod() {
      this.currentDate = new Date();
    },
    toggleView() {
      this.currentView = this.currentView === 'month' ? 'week' : 'month';
    },
    calculateCurrentTimePosition() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Calculate position as percentage of day (7am to 7pm = 12 hours)
      if (hours < 7) return 0;
      if (hours > 19) return 100;
      const hoursSince7am = hours - 7;
      const minutePercentage = minutes / 60;
      return ((hoursSince7am + minutePercentage) / 12) * 100;
    },
    calculateEventPosition(event) {
      // Calculate position and height based on time (7am-7pm day)
      const [hours, minutes] = event.time.split(':').map(Number);

      // Calculate top position as percentage of day
      const hoursSince7am = hours - 7;
      const minutePercentage = minutes / 60;
      let topPercentage = ((hoursSince7am + minutePercentage) / 12) * 100;

      // Limit to visible area
      if (topPercentage < 0) topPercentage = 0;
      if (topPercentage > 100) topPercentage = 100;

      // Calculate height based on duration
      let durationInMinutes = 60; // Default 1 hour
      if (event.duration === 'custom' && event.customDuration) {
        durationInMinutes = parseInt(event.customDuration);
      } else if (event.duration) {
        durationInMinutes = parseInt(event.duration);
      }

      const heightPercentage = (durationInMinutes / 60) * (100 / 12); // Height as % of day

      return {
        top: `${topPercentage}%`,
        height: `${heightPercentage}%`,
        width: 'calc(100% - 10px)'
      };
    },
    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },
    formatEventDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    },
    getEventsForDay(date) {
      const dateString = this.formatDate(date);
      let filteredEvents = this.events.filter(event =>
          event.date === dateString && this.activeFilters.includes(event.type)
      );

      // Apply search filter if exists
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        filteredEvents = filteredEvents.filter(event => {
          return (
              event.title.toLowerCase().includes(searchLower) ||
              (this.getPropertyAddress(event.propertyId) || '').toLowerCase().includes(searchLower) ||
              (this.getClientName(event.clientId) || '').toLowerCase().includes(searchLower)
          );
        });
      }

      // Sort by time
      filteredEvents.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }
        return timeA[1] - timeB[1];
      });

      // For month view, only show limited number if day is not expanded
      if (this.currentView === 'month' && !this.expandedDays.includes(dateString)) {
        return filteredEvents.slice(0, 3);
      }

      return filteredEvents;
    },
    getEventTypeClasses(type) {
      const baseClasses = this.eventTypes[type] || this.eventTypes.other;
      return `${baseClasses} border-l-4 border-l-${type === 'showing' ? 'blue' : type === 'client' ? 'green' : type === 'inspection' ? 'yellow' : type === 'closing' ? 'purple' : 'gray'}-500`;
    },
    getEventTypeDot(type) {
      const colors = {
        showing: 'bg-blue-500',
        client: 'bg-green-500',
        inspection: 'bg-yellow-500',
        closing: 'bg-purple-500',
        other: 'bg-gray-500'
      };
      return colors[type] || colors.other;
    },
    getEventTypeBadge(type) {
      const badges = {
        showing: 'bg-blue-100 text-blue-800',
        client: 'bg-green-100 text-green-800',
        inspection: 'bg-yellow-100 text-yellow-800',
        closing: 'bg-purple-100 text-purple-800',
        other: 'bg-gray-100 text-gray-800'
      };
      return badges[type] || badges.other;
    },
    openNewEventModal(date) {
      this.editingEvent = {
        id: null,
        title: '',
        date: this.formatDate(date),
        time: '09:00',
        duration: '60',
        customDuration: 30,
        type: 'showing',
        propertyId: '',
        clientId: '',
        notes: '',
        reminders: ['1hour']
      };
      this.showEventModal = true;
    },
    editEvent(event) {
      this.editingEvent = { ...event };

      // Ensure reminders are set correctly
      if (!this.editingEvent.reminders) {
        this.editingEvent.reminders = ['1hour'];
      }

      // Ensure duration is set correctly
      if (!this.editingEvent.duration) {
        this.editingEvent.duration = '60';
      }

      this.showEventModal = true;
    },
    closeEventModal() {
      this.showEventModal = false;
    },
    saveEvent() {
      if (!this.editingEvent.title) {
        alert('Please enter an event title');
        return;
      }

      const eventToSave = { ...this.editingEvent };

      if (eventToSave.id) {
        // Update existing event
        const index = this.events.findIndex(e => e.id === eventToSave.id);
        if (index !== -1) {
          this.events[index] = eventToSave;
        }
      } else {
        // Add new event
        eventToSave.id = Date.now();
        this.events.push(eventToSave);
      }

      // In a real application, you'd make an API call here to save to the backend

      this.closeEventModal();
    },
    deleteEvent() {
      if (confirm('Are you sure you want to delete this event?')) {
        this.events = this.events.filter(e => e.id !== this.editingEvent.id);
        this.closeEventModal();
      }
    },
    toggleReminder(value) {
      const index = this.editingEvent.reminders.indexOf(value);
      if (index === -1) {
        this.editingEvent.reminders.push(value);
      } else {
        this.editingEvent.reminders.splice(index, 1);
      }
    },
    toggleExpandDay(date) {
      const dateString = this.formatDate(date);
      const index = this.expandedDays.indexOf(dateString);
      if (index === -1) {
        this.expandedDays.push(dateString);
      } else {
        this.expandedDays.splice(index, 1);
      }
    },
    toggleFilter(type) {
      const index = this.activeFilters.indexOf(type);
      if (index === -1) {
        this.activeFilters.push(type);
      } else {
        this.activeFilters.splice(index, 1);
      }
    },
    getPropertyAddress(propertyId) {
      if (!propertyId) return '';
      const property = this.properties.find(p => p.id === propertyId);
      return property ? property.address : '';
    },
    getClientName(clientId) {
      if (!clientId) return '';
      const client = this.clients.find(c => c.id === clientId);
      return client ? client.name : '';
    },
    // This method would be called when the component is mounted
    fetchEvents() {
      // In a real application, this would be an API call
      // For demo purposes, let's create comprehensive sample events

      const today = new Date();
      const formatDate = (date) => this.formatDate(date);

      this.events = [
        {
          id: 1,
          title: 'Property Showing - Main St',
          date: formatDate(today),
          time: '10:00',
          duration: '60',
          type: 'showing',
          propertyId: 1,
          clientId: 2,
          notes: 'Potential buyer is very interested in the backyard and garage space. Prepare property sheet with neighborhood amenities.',
          reminders: ['1hour', '1day']
        },
        {
          id: 2,
          title: 'Client Consultation - Doe Family',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
          time: '14:00',
          duration: '90',
          type: 'client',
          propertyId: '',
          clientId: 1,
          notes: 'Discuss new property requirements. Budget increased to $500k. Looking primarily in north and east neighborhoods.',
          reminders: ['1hour']
        },
        {
          id: 3,
          title: 'Home Inspection - Oak Ave',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
          time: '09:30',
          duration: '120',
          type: 'inspection',
          propertyId: 2,
          clientId: 3,
          notes: 'Meeting with inspector and clients. Bring extra copies of disclosure documents.',
          reminders: ['1day', '1hour']
        },
        {
          id: 4,
          title: 'Closing Meeting - Pine Rd',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
          time: '11:00',
          duration: '90',
          type: 'closing',
          propertyId: 3,
          clientId: 1,
          notes: 'Finalize sale documents. All parties to be present. Meeting at First National Title Company.',
          reminders: ['1day', '1hour']
        },
        {
          id: 5,
          title: 'Property Showing - Beach Blvd',
          date: formatDate(today),
          time: '15:30',
          duration: '60',
          type: 'showing',
          propertyId: 4,
          clientId: 4,
          notes: 'Clients interested in ocean views. Highlight recently renovated kitchen.',
          reminders: ['30min']
        },
        {
          id: 6,
          title: 'Listing Presentation - Mountain View',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
          time: '09:00',
          duration: '60',
          type: 'client',
          propertyId: 5,
          clientId: 5,
          notes: 'Prepare CMA and marketing materials. Owners considering listing next month.',
          reminders: ['1day']
        },
        {
          id: 7,
          title: 'Team Meeting',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
          time: '16:00',
          duration: '60',
          type: 'other',
          propertyId: '',
          clientId: '',
          notes: 'Weekly team meeting. Discuss current listings and market updates.',
          reminders: ['1hour']
        },
        {
          id: 8,
          title: 'Property Photography',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)),
          time: '13:00',
          duration: '120',
          type: 'other',
          propertyId: 1,
          clientId: '',
          notes: 'Professional photographer scheduled. Ensure property is staged and ready.',
          reminders: ['1day']
        },
        {
          id: 9,
          title: 'Open House Preparation',
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
          time: '10:00',
          duration: 'custom',
          customDuration: 180,
          type: 'showing',
          propertyId: 2,
          clientId: '',
          notes: 'Set up signs, brochures, and refreshments. Open house runs 1-4pm.',
          reminders: ['1day', '1hour']
        },
        {
          id: 10,
          title: 'Mortgage Broker Meeting',
          date: formatDate(today),
          time: '13:00',
          duration: '60',
          type: 'client',
          propertyId: '',
          clientId: 3,
          notes: 'Review financing options with clients and preferred lender.',
          reminders: ['30min']
        }
      ];
    }
  },
  mounted() {
    this.fetchEvents();

    // Calculate current week number
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    this.currentWeek = Math.floor(diff / oneWeek) + 1;
  }
};
</script>

<style scoped>
/* Custom scrollbar styles */
.top-2\.5 {
  top: 0.625rem/* 10px */;
}
.pr-2 {
  padding-right: 0.5rem/* 8px */;
}
.min-h-32 {
  min-height: 8rem/* 128px */;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background-color: rgba(229, 231, 235, 0.5);
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* For Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) rgba(229, 231, 235, 0.5);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0.2;
}
</style>