<script setup>
import { ref, onMounted } from 'vue'
import { agencyService } from '../controllers/agencyAPI.js'
import AgencyProfile from '../components/RealEstate/AgencyProfile.vue'
const agencyId = ref(1) // Replace with your actual agency ID
const agencyData = ref(null)
const loading = ref(false)
const error = ref(null)

const loadAgencyProfile = async () => {
  try {
    loading.value = true
    agencyData.value = await agencyService.getAgencyProfile(agencyId.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const updateProfile = async (updates) => {
  try {
    loading.value = true
    await agencyService.updateAgencyProfile(agencyId.value, updates)
    await loadAgencyProfile()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAgencyProfile()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <AgencyProfile :agencyData="agencyData" @updateProfile="updateProfile" />
    </div>
  </template>
</div>