import { defineStore } from 'pinia';
import { 
  insertAgency, 
  getAgencyById, 
  updateAgency, 
  deleteAgency, 
  updateAgencyAdmins 
} from '@/utils/database/agencies/agenciesAPI';

export const useAgencyStore = defineStore('agency', {
  state: () => ({
    agency: null,
    agencies: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchAgency(id) {
      this.loading = true;
      try {
        const agency = await getAgencyById(id);
        this.agency = agency;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchAgencies() {
      this.loading = true;
      try {
        const agencies = await getAgencies();
        this.agencies = agencies;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async createAgency(agencyData) {
      this.loading = true;
      try {
        const newAgency = await insertAgency(agencyData);
        this.agencies.push(newAgency);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateAgency(id, agencyData) {
      this.loading = true;
      try {
        const updatedAgency = await updateAgency(id, agencyData);
        this.agency = updatedAgency;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
