<template>
  <div class="house-map-container h-screen flex">
    <!-- Left half - can be used for listing or other content -->
    <div class="w-1/2 p-4  overflow-y-auto">
      <h2 class="text-2xl font-bold mb-4">Available Houses</h2>
      <HouseWorld></HouseWorld>

    </div>

    <!-- Right half - Map -->
    <div class="w-1/2 relative" style="margin: 20px">
      <div id="map" class="h-full w-full" style="border-radius:20px "></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import HouseWorld from "@/components/HouseWorld.vue";

export default {
  name: 'HouseMap',
  components: {HouseWorld},
  props: {
    initialHouses: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const map = ref(null);
    const houses = ref([]);
    const markers = ref({});

    onMounted(() => {
      // Initialize the map with a grayscale style
      map.value = L.map('map').setView([51.505, -0.09], 13);

      // Use grayscale tiles for black and white theme
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
        className: 'grayscale-tiles' // CSS class for grayscale effect
      }).addTo(map.value);

      // Initialize houses with favorite property
      houses.value = props.initialHouses.map(house => ({
        ...house,
        favorite: false
      }));

      // Add markers for each house
      addHouseMarkers();
    });

    const addHouseMarkers = () => {
      const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9385/9385212.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
      });

      houses.value.forEach(house => {
        const marker = L.marker([house.lat, house.lng], { icon: customIcon }).addTo(map.value);

        // Create custom popup with house image and details
        const popupContent = createPopupContent(house);
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'house-popup'
        });

        // Store marker reference for later use
        markers.value[house.id] = marker;
      });
    };

    const createPopupContent = (house) => {
      // Create a DOM element for the popup
      const container = L.DomUtil.create('div', 'house-popup-content');

      // Add house image
      const imgContainer = L.DomUtil.create('div', 'house-image-container', container);
      const img = L.DomUtil.create('img', 'house-image', imgContainer);
      img.src = house.imageUrl;
      img.alt = house.title;

      // Add favorite button
      const favBtn = L.DomUtil.create('button', 'favorite-btn', imgContainer);
      favBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${house.favorite ? 'text-red-500 fill-current' : 'text-white'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>`;

      // Add event listener to favorite button
      L.DomEvent.on(favBtn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        toggleFavorite(house.id);
        // Update the button appearance
        favBtn.querySelector('svg').classList.toggle('text-red-500');
        favBtn.querySelector('svg').classList.toggle('fill-current');
      });

      // Add house details
      const details = L.DomUtil.create('div', 'house-details', container);
      details.innerHTML = `
        <h3 class="house-title">${house.title}</h3>
        <p class="house-address">${house.address}</p>
        <p class="house-price">$${house.price.toLocaleString()}</p>
      `;

      return container;
    };

    const toggleFavorite = (houseId) => {
      const houseIndex = houses.value.findIndex(h => h.id === houseId);
      if (houseIndex !== -1) {
        houses.value[houseIndex].favorite = !houses.value[houseIndex].favorite;
      }
    };

    const centerMapOnHouse = (house) => {
      map.value.setView([house.lat, house.lng], 16);
      markers.value[house.id].openPopup();
    };

    return {
      houses,
      toggleFavorite,
      centerMapOnHouse
    };
  }
};
</script>

<style>
/* Make map tiles grayscale for black and white theme */
.grayscale-tiles {
  filter: grayscale(100%) contrast(85%);
}

/* Custom popup styling */
.house-popup {
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
}

.house-popup .leaflet-popup-content-wrapper {
  padding: 0;
  background: white;
  border-radius: 8px;
}

.house-popup .leaflet-popup-content {
  margin: 0;
  width: 100%;
}

.house-popup .leaflet-popup-tip {
  background: white;
}

.house-popup-content {
  width: 250px;
}

.house-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.house-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.house-details {
  padding: 12px;
}

.house-title {
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 4px 0;
}

.house-address {
  color: #666;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.house-price {
  font-weight: bold;
  font-size: 18px;
  margin: 0;
  color: #000;
}
</style>