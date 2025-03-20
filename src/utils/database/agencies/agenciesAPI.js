import { supabase } from '../supabase';

// Function to insert a new agency into the `agencies` table
const insertAgency = async (agencyData) => {
  const { name, logoUrl, description, services, address, hours, phone, email, website, yearFounded, propertiesSold, awards, socialMedia } = agencyData;

  const { data, error } = await supabase
    .from('agencies')
    .insert([
      {
        name,
        logo_url: logoUrl,
        description,
        services,
        address,
        hours,
        phone,
        email,
        website,
        year_founded: yearFounded,
        properties_sold: propertiesSold,
        awards,
        social_media: socialMedia,
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
      *
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
  console.log('updates', updates);
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
