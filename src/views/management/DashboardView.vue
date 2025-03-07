<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const properties = ref([])
const isLoading = ref(false)
const error = ref(null)

const fetchProperties = async () => {
  try {
    isLoading.value = true
    const { data, error: sbError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (sbError) throw sbError
    properties.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProperties()
})
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <h1>Manage Properties</h1>
      <router-link :to="{ name: 'CreateProperty' }" class="btn-primary">
        Add New Property
      </router-link>
    </div>

    <div v-if="isLoading" class="loading">Loading properties...</div>
    
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="properties.length === 0 && !isLoading" class="empty-state">
      No properties found
    </div>

    <div class="property-list">
      <div v-for="property in properties" :key="property.id" class="property-card">
        <h3>{{ property.title }}</h3>
        <p>Price: ${{ property.price.toLocaleString() }}</p>
        <div class="actions">
          <router-link 
            :to="{ name: 'EditProperty', params: { id: property.id } }"
            class="btn-edit"
          >
            Edit
          </router-link>
          <button class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.property-list {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.property-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.btn-edit {
  padding: 0.5rem 1rem;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #ff4444;
  padding: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin: 1rem 0;
}
</style>