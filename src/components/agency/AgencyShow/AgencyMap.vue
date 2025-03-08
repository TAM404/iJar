<template>
  <div class="w-full h-full" id="mapContainer"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default defineComponent({
  name: 'AgencyMap',
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      const map = L.map('mapContainer').setView([props.latitude, props.longitude], 15)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      L.marker([props.latitude, props.longitude])
          .addTo(map)
          .bindPopup('Our Location')
          .openPopup()
    })
  }
})
</script>