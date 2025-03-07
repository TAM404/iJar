import { supabase } from './supabase'

// Get user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Update basic user info
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      name: updates.name,
      phone_number: updates.phoneNumber,
      birthday: updates.birthday
    })
    .eq('id', userId)

  if (error) throw error
  return data
}

// Location management
export const addUserLocation = async (userId, newLocation) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      locations: supabase.sql`locations || ${JSON.stringify([newLocation])}`
    })
    .eq('id', userId)

  if (error) throw error
  return data
}

export const removeUserLocation = async (userId, index) => {
  const { data: user } = await getUserProfile(userId)
  
  const newLocations = [...user.locations]
  newLocations.splice(index, 1)

  const { data, error } = await supabase
    .from('users')
    .update({ locations: newLocations })
    .eq('id', userId)

  if (error) throw error
  return data
}

// Favorites management
export const addFavorite = async (userId, propertyId) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      favorites: supabase.sql`favorites || ${JSON.stringify([propertyId])}`
    })
    .eq('id', userId)

  if (error) throw error
  return data
}

export const removeFavorite = async (userId, propertyId) => {
  const { data: user } = await getUserProfile(userId)
  
  const newFavorites = user.favorites.filter(id => id !== propertyId)
  
  const { data, error } = await supabase
    .from('users')
    .update({ favorites: newFavorites })
    .eq('id', userId)

  if (error) throw error
  return data
}