import { supabase } from '../supabase';

/**
 * Fetch all demands for a specific user (demander)
 * @param {string} demanderId - The ID of the user who made the demand.
 * @returns {Object} The fetched demands.
 */
export const getDemandsByUser = async (demanderId) => {
  try {
    const { data, error } = await supabase
      .from('demands')
      .select('*')
      .eq('demander_id', demanderId);  // Fetch demands by demander ID

    if (error) throw new Error(`Error fetching demands: ${error.message}`);
    
    return data;  // Return the list of demands
  } catch (error) {
    console.error('Error in getDemandsByUser:', error.message);
    return { error: error.message };
  }
};

/**
 * Fetch all demands for a specific property (demanded)
 * @param {string} demandedId - The ID of the property.
 * @returns {Object} The fetched demands for the property.
 */
export const getDemandsByProperty = async (demandedId) => {
  try {
    const { data, error } = await supabase
      .from('demands')
      .select('*')
      .eq('demanded_id', demandedId);  // Fetch demands by property ID

    if (error) throw new Error(`Error fetching demands: ${error.message}`);
    
    return data;  // Return the list of demands for the property
  } catch (error) {
    console.error('Error in getDemandsByProperty:', error.message);
    return { error: error.message };
  }
};

/**
 * Create a new demand for a property
 * @param {string} demanderId - The ID of the user requesting the property.
 * @param {string} demandedId - The ID of the property being requested.
 * @param {string} status - The current status of the demand (default is 'open').
 * @returns {Object} The created demand and the property details.
 */
export const createDemand = async (demanderId, demandedId, status = 'open') => {
  try {
    // Fetch the agency (owner) of the property using demandedId
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('agency_id')
      .eq('id', demandedId)
      .single();  // Fetch the property by its id

    if (propertyError) {
      throw new Error(`Error fetching property: ${propertyError.message}`);
    }

    const demandedOwnerId = property.agency_id;  // Get the agency_id from the property record

    // Insert the new demand into the 'demands' table
    const { data: demand, error: demandError } = await supabase
      .from('demands')
      .insert([
        {
          demander_id: demanderId,       // User ID requesting the property
          demanded_id: demandedId,       // Property ID that the demand is for
          demanded_owner_id: demandedOwnerId,  // Agency ID (owner of the property)
          status: status                  // The status of the demand (default: open)
        }
      ])
      .single();  // Return a single inserted demand record

    if (demandError) {
      throw new Error(`Error creating demand: ${demandError.message}`);
    }

    // Return the inserted demand record along with the fetched property details
    return {
      demand,
      property: property
    };
  } catch (error) {
    console.error('Error in createDemand:', error.message);
    return { error: error.message };  // Return the error message if something fails
  }
};

/**
 * Update the status of a demand
 * @param {string} demandId - The ID of the demand to update.
 * @param {string} status - The new status of the demand.
 * @returns {Object} The updated demand record.
 */
export const updateDemandStatus = async (demandId, status) => {
  try {
    const { data, error } = await supabase
      .from('demands')
      .update({ status })
      .eq('id', demandId)
      .single();  // Update demand and return the updated record

    if (error) throw new Error(`Error updating demand status: ${error.message}`);

    return data;  // Return the updated demand
  } catch (error) {
    console.error('Error in updateDemandStatus:', error.message);
    return { error: error.message };
  }
};

/**
 * Delete a demand
 * @param {string} demandId - The ID of the demand to delete.
 * @returns {boolean} True if the demand was deleted successfully.
 */
export const deleteDemand = async (demandId) => {
  try {
    const { error } = await supabase
      .from('demands')
      .delete()
      .eq('id', demandId);  // Delete the demand by its ID

    if (error) throw new Error(`Error deleting demand: ${error.message}`);
    
    return true;  // Return true if the demand was deleted successfully
  } catch (error) {
    console.error('Error in deleteDemand:', error.message);
    return { error: error.message };
  }
};
