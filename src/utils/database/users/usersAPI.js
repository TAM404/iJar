import {supabase} from '../supabase';

// Function to insert a user into the `users` table
const insertUser = async (userId, userData) => {
  const { name, phonenumber, birthday, locations, favorites } = userData;

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId, // Use the user ID from the auth system
        name,
        phonenumber,
        birthday,
        locations: locations || [],
        favorites: favorites || [],
      },
    ]);

  if (error) {
    throw error;
  }

  return {data};
};

// Function to retrieve a user by ID from the `users` table
const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) {
    throw error;
  }

  return data;
};

export { insertUser, getUserById, updateUserProfile };
