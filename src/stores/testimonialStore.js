import { defineStore } from 'pinia';
import { createTestimonial, fetchTestimonial, fetchTestimonials, updateTestimonial, deleteTestimonial } from '../../utils/database/testimonials/testimonialsAPI';

export const useTestimonialStore = defineStore('testimonial', {
  state: () => ({
    testimonial: null,
    testimonials: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTestimonial(id) {
      this.loading = true;
      try {
        const testimonial = await fetchTestimonial(id);
        this.testimonial = testimonial;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTestimonials() {
      this.loading = true;
      try {
        const testimonials = await fetchTestimonials();
        this.testimonials = testimonials;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async createTestimonial(testimonialData) {
      this.loading = true;
      try {
        const newTestimonial = await createTestimonial(testimonialData);
        this.testimonials.push(newTestimonial);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateTestimonial(id, testimonialData) {
      this.loading = true;
      try {
        const updatedTestimonial = await updateTestimonial(id, testimonialData);
        const index = this.testimonials.findIndex(t => t.id === id);
        if (index !== -1) {
          this.testimonials[index] = updatedTestimonial;
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteTestimonial(id) {
      this.loading = true;
      try {
        await deleteTestimonial(id);
        this.testimonials = this.testimonials.filter(t => t.id !== id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
