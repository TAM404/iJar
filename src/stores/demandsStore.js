import { defineStore } from 'pinia';
import { createDemand, fetchDemand, fetchDemands, updateDemand } from '../../utils/database/demands/demandsAPI';

export const useDemandStore = defineStore('demand', {
  state: () => ({
    demand: null,
    demands: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchDemand(id) {
      this.loading = true;
      try {
        const demand = await fetchDemand(id);
        this.demand = demand;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchDemands() {
      this.loading = true;
      try {
        const demands = await fetchDemands();
        this.demands = demands;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async createDemand(demandData) {
      this.loading = true;
      try {
        const newDemand = await createDemand(demandData);
        this.demands.push(newDemand);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateDemand(id, demandData) {
      this.loading = true;
      try {
        const updatedDemand = await updateDemand(id, demandData);
        this.demand = updatedDemand;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
