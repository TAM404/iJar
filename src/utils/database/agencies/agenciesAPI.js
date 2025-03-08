import { supabase } from '../supabase';

// Function to insert a new agency into the `agencies` table
const insertAgency = async (agencyData) => {
  const { name, logo_url, rating, review_count, year_founded, properties_sold, agents_count, client_satisfaction, description, address, hours, phone, email, website, location, services, awards, social_media, quick_links, footer_text } = agencyData;

  const { data, error } = await supabase
    .from('agencies')
    .insert([
      {
        name,
        logo_url,
        rating,
        review_count,
        year_founded,
        properties_sold,
        agents_count,
        client_satisfaction,
        description,
        address,
        hours,
        phone,
        email,
        website,
        location,
        services,
        awards,
        social_media,
        quick_links,
        footer_text,
      },
    ]);

  if (error) {
    throw error;
  }

  return data;
};

// Function to get agency details by `id` with related data
const getAgencyById = async (agencyId) => {
  const { data, error } = await supabase
    .from('agencies')
    .select(`
      *,
      testimonials (*),
      properties (*)
    `)
    .eq('id', agencyId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Function to update agency details
const updateAgency = async (agencyId, updates) => {
  const { data, error } = await supabase
    .from('agencies')
    .update(updates)
    .eq('id', agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to delete an agency by `id`
const deleteAgency = async (agencyId) => {
  const { data, error } = await supabase
    .from('agencies')
    .delete()
    .eq('id', agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to add or remove an "admin" from the agency
const updateAgencyAdmins = async (agencyId, userId, action) => {
  const { data, error } = await supabase
    .from('agency_admins')
    .upsert([
      {
        agency_id: agencyId,
        user_id: userId,
        action, // action can be 'add' or 'remove'
      },
    ]);

  if (error) {
    throw error;
  }

  return data;
};

export { insertAgency, getAgencyById, updateAgency, deleteAgency, updateAgencyAdmins };
