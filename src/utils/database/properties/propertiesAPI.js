import {supabase} from '../supabase';

// Fetch all properties by agency ID
const fetchPropertiesByAgency = async (agencyId) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('agency_id', agencyId);

  if (error) {
    throw error;
  }

  return data;
};

// Fetch a single property by its ID
const fetchPropertyById = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Insert a new property
const insertProperty = async (propertyData) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData]);

  if (error) {
    throw error;
  }

  return data;
};

// Update an existing property
const updateProperty = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

// Delete a property
const deleteProperty = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
};

// Example of how to insert additional details in the 'details' field
const insertPropertyWithDetails = async (propertyData, details) => {
  const propertyWithDetails = {
    ...propertyData,
    details: details ? details : {}  // Attach details if available
  };

  return insertProperty(propertyWithDetails);
};

export {
  fetchPropertiesByAgency,
  fetchPropertyById,
  insertProperty,
  updateProperty,
  deleteProperty,
  insertPropertyWithDetails,  // Expose the new method
};
