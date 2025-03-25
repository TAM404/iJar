<template>
  <div class="border-b border-gray-200 mb-8">
    <nav class="flex -mb-px">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
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
</template>

<script>
export default {
  name: 'TabsNavigation',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    selectTab(tabId) {
      this.$emit('update:activeTab', tabId);
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>