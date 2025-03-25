<template>
  <div class="event-heatmap-card bg-white rounded-lg shadow p-4 mb-4">
    <h3 class="text-lg font-semibold mb-3">Event Distribution Heatmap</h3>

    <div class="flex items-center justify-between mb-3">
      <div class="text-sm text-gray-600">
        {{ monthYear }}
      </div>

      <div class="flex gap-2">
        <button
            v-for="(color, type) in eventTypes"
            :key="type"
            class="text-xs px-2 py-1 rounded-md flex items-center gap-1"
            :class="[activeFilters.includes(type) ? color : 'bg-gray-100 text-gray-400']"
            @click="toggleFilter(type)"
        >
          <span class="w-2 h-2 rounded-full" :class="activeFilters.includes(type) ? 'bg-current' : 'bg-gray-400'"></span>
          {{ capitalize(type) }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div
          v-for="(day, index) in weekdays"
          :key="index"
          class="text-xs text-center font-medium text-gray-700 py-1"
      >
        {{ day.short }}
      </div>

      <div
          v-for="day in calendarDays"
          :key="day.date"
          class="aspect-square rounded flex items-center justify-center transition-all cursor-pointer"
          :class="getDayClass(day)"
          @click="expandDay(day.date)"
          @mouseenter="hoveredDate = day.date"
          @mouseleave="hoveredDate = null"
      >
        <span class="text-xs">{{ day.dayOfMonth }}</span>

        <div
            v-if="hoveredDate === day.date && day.filteredCount > 0"
            class="absolute bottom-full mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10"
        >
          {{ day.filteredCount }} event{{ day.filteredCount > 1 ? 's' : '' }}
        </div>
      </div>
    </div>

    <div class="mt-3 flex justify-between items-center text-xs text-gray-600">
      <div>Fewer</div>
      <div class="flex gap-1">
        <div v-for="level in 5" :key="level" class="w-4 h-2 rounded-sm" :class="getHeatLevelClass(level)"></div>
      </div>
      <div>More</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    },
    weekdays: {
      type: Array,
      required: true
    },
    eventTypes: {
      type: Object,
      required: true
    },
    activeFilters: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      hoveredDate: null
    };
  },

  computed: {
    monthYear() {
      const options = { month: 'long', year: 'numeric' };
      return this.currentDate.toLocaleDateString(undefined, options);
    },

    calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      // Get the first day to display (may be from previous month)
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      // Get the last day to display (may be from next month)
      const endDate = new Date(lastDay);
      const daysToAdd = 6 - endDate.getDay();
      endDate.setDate(endDate.getDate() + daysToAdd);

      const days = [];
      const currentDate = new Date(startDate);

      // Generate all days for the calendar view
      while (currentDate <= endDate) {
        const dateStr = this.formatDate(currentDate);
        const isCurrentMonth = currentDate.getMonth() === month;

        // Count filtered events for this day
        const dayEvents = this.events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === currentDate.toDateString();
        });

        const filteredEvents = dayEvents.filter(event =>
            this.activeFilters.includes(event.type)
        );

        days.push({
          date: dateStr,
          dayOfMonth: currentDate.getDate(),
          isCurrentMonth,
          events: dayEvents,
          filteredCount: filteredEvents.length,
          totalCount: dayEvents.length
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return days;
    },

    maxEvents() {
      if (this.calendarDays.length === 0) return 0;
      return Math.max(...this.calendarDays.map(day => day.filteredCount));
    }
  },

  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    getDayClass(day) {
      const classes = ['relative'];

      if (!day.isCurrentMonth) {
        classes.push('text-gray-400 bg-gray-50');
      } else if (day.filteredCount === 0) {
        classes.push('bg-gray-50 text-gray-800');
      } else {
        classes.push(this.getHeatLevelClass(this.getHeatLevel(day.filteredCount)));
        classes.push('text-white');
      }

      const today = this.formatDate(new Date());
      if (day.date === today) {
        classes.push('ring-2 ring-blue-500');
      }

      return classes;
    },

    getHeatLevel(count) {
      if (count === 0) return 0;

      const max = this.maxEvents || 1;
      // Create 5 levels of heat (1-5)
      return Math.min(5, Math.ceil((count / max) * 5));
    },

    getHeatLevelClass(level) {
      switch (level) {
        case 1: return 'bg-blue-200 text-blue-800';
        case 2: return 'bg-blue-300 text-blue-800';
        case 3: return 'bg-blue-400 text-white';
        case 4: return 'bg-blue-500 text-white';
        case 5: return 'bg-blue-600 text-white';
        default: return 'bg-gray-100';
      }
    },

    expandDay(date) {
      this.$emit('day-selected', date);
    },

    toggleFilter(type) {
      this.$emit('toggle-filter', type);
    },

    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>