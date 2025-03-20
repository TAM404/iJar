import {supabase} from '../supabase';

export const assignUserRole = async (userId, agencyId, roleType) => {
  try {
    // First get the role_id for the given type
    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('type', roleType)
      .single();

    if (!roleData) throw new Error(`Role type ${roleType} not found`);

    // Assign the role
    const { data, error } = await supabase
      .from('user_agency_roles')
      .insert({
        user_id: userId,
        agency_id: agencyId,
        role_id: roleData.id,
        assigned_by: (await supabase.auth.getUser()).user?.id
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in assignUserRole:', error);
    throw error;
  }
};

export const getUserRoles = async (userId = null, agencyId = null) => {
  try {
    let query = supabase
      .from('user_agency_roles')
      .select(`
        *,
        roles (
          name,
          type
        ),
        users (
          id,
          email
        )
      `);
    if(userId){
      query = query.eq('user_id', userId);
    }
    if (agencyId) {
      query = query.eq('agency_id', agencyId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getUserRoles:', error);
    throw error;
  }
};


export const removeUserRoles = async (userId, agencyId = null) => {
  try {
    let query = supabase
      .from('user_agency_roles')
      .delete()
      .eq('user_id', userId);

    if (agencyId) {
      query = query.eq('agency_id', agencyId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in removeUserRoles:', error);
    throw error;
  }
};