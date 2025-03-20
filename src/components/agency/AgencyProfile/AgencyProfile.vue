<template>
  <div v-if="!loading" class="min-h-screen  bg-white">
    <!-- Hero Section -->
    <HeaderSection :agency="agency" @update:agency="updateAgency" />
    <!-- Stats Bar -->
    <StatsBar :agency="agency" @update:agency="updateAgency" />


<div class="flex flex-col">
    <!-- Main Content with Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style="font-family: Poppins,serif ;max-width: 100rem;
">


      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">


        <!-- Contact Form -->
        <ContactForm :agencyName="agency.name" @update:agency="updateAgency" />


        <!-- About Card -->
        <AboutSection :agency="agency" @update:agency="updateAgency" />


        <!-- empty -->
        <div class="space-y-8">
          <!-- empty for grid -->
        </div>

        <!-- Contact Card -->
        <ContactCard :agency="agency"  @update:agency="updateAgency"/>

        <!-- Location Card -->
        <LocationCard :agency="agency" @update:agency="updateAgency"/>


      </div>
      <!-- Team Members -->
      <TeamMembers :agents="agency.topAgents"  />

      <!-- Featured Listings Section -->
      <FeaturedListings :listings="agency.featuredListings" />

      <!-- Testimonials Section -->
      <IntegratedTestimonials/>
    </div>

    </div>

    <!-- CTA Section -->
    <CTASection />

    <!-- Footer -->
    <FooterSection :agency="agency" />

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAgencyStore } from '@/stores/agencyStore';
import { useRoute } from 'vue-router';


import StarRating from './StarRating.vue'
import AgencyMap from './AgencyMap.vue'
import HeaderSection from "./HeaderSection.vue";
import StatsBar from "./StatsBar.vue";
import AboutSection from "./AboutSection.vue";
import LocationCard from "./LocationCard.vue";
import ContactCard from "./ContactCard.vue";
import TestimonialsSection from "./TestimonialsSection.vue";
import CTASection from "./CTASection.vue";
import FooterSection from "./FooterSection.vue";
import IntegratedTestimonials from "./IntegratedTestimonials.vue";
import ContactForm from "./ContactForm.vue";
import TeamMembers from "./TeamMembers.vue";
import FeaturedListings from "./FeaturedListings.vue";

export default defineComponent({
  name: 'AgencyProfile',
  components: {
    FeaturedListings,
    TeamMembers,
    ContactForm,
    IntegratedTestimonials,
    FooterSection,
    CTASection,
    TestimonialsSection,
    ContactCard,
    LocationCard,
    AboutSection,
    StatsBar,
    HeaderSection,
    StarRating,
    AgencyMap
  },
  data() {
    return {
      agency: null,
      loading: true,
      agencyStore: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  async mounted() {
    const route = useRoute();
    this.agencyStore = useAgencyStore();
    console.log('started')
    this.agency = await this.agencyStore.fetchAgency( this.id );
    
    console.log('agency:', this.agency);
    this.loading = false;
  },
  methods: {
    async updateAgency(updatedAgency) {
      this.agency = updatedAgency;
      console.log('updated agency:', updatedAgency);
      await this.agencyStore.updateAgency(this.id,updatedAgency);
    }
  }
})
</script>