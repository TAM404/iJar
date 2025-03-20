<template>
  <HouseMap :initial-houses="houses" />
</template>

<script>
import HouseMap from "@/components/RealEstate/Search/HouseMap.vue";

export default {
  components: {
    HouseMap
  },
  data() {
    return {
      houses: [
        {
          id: 1,
          title: "Modern Urban Apartment",
          address: "123 Downtown St, City",
          price: 350000,
          lat: 51.505,
          lng: -0.09,
          imageUrl: "https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x"
        },
        {
          id: 2,
          title: "Suburban Family Home",
          address: "456 Green Ave, Suburb",
          price: 525000,
          lat: 51.51,
          lng: -0.1,
          imageUrl: "https://a0.muscache.com/im/pictures/f3dad936-d062-47ce-879e-03ce583dc10a.jpg?im_w=1200&im_format=avif 1x"
        }
        // Add more houses as needed
      ]
    };
  }
};
</script>

<style scoped>
</style>