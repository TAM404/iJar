import { defineStore } from 'pinia';
import { fetchPropertiesByAgency, fetchPropertyById, insertProperty, updateProperty } from '@/utils/database/properties/propertiesAPI';

export const usePropertyStore = defineStore('property', {
  state: () => ({
    property: null,
    properties: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProperty(id) {
      this.loading = true;
      try {
        const property = await fetchProperty(id);
        this.property = property;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchPropertiesByAgency(agencyId) {
      this.loading = true;
      try {
        const properties = await fetchPropertiesByAgency(agencyId);
        this.properties = properties;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async createProperty(propertyData) {
      this.loading = true;
      try {
        const newProperty = await createProperty(propertyData);
        this.properties.push(newProperty);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateProperty(id, propertyData) {
      this.loading = true;
      try {
        const updatedProperty = await updateProperty(id, propertyData);
        this.property = updatedProperty;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
