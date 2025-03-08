import supabase from '../supabase';

// Fetch all testimonials for a specific agency
const fetchTestimonialsByAgency = async (agencyId) => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('agency_id', agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Fetch a specific testimonial by its ID
const fetchTestimonialById = async (id) => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Insert a new testimonial
const insertTestimonial = async (testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData]);

  if (error) {
    throw error;
  }

  return data;
};

// Update an existing testimonial
const updateTestimonial = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

// Delete a testimonial
const deleteTestimonial = async (id) => {
  const { data, error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

export {
  fetchTestimonialsByAgency,
  fetchTestimonialById,
  insertTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
