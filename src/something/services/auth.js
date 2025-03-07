import { supabase } from './supabase'

// Email/password authentication
export const signUpWithEmail = async (email,password, userData) => {
    console.log('asdf');
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  console.log('f')
  // Create user profile after successful signup
  const { data, error: profileError } = await supabase
    .from('users')
    .insert([{
      id:  user.id,
      name: userData.name,
      phonenumber: userData.phoneNumber,
      birthday: userData.birthday,
      locations: [],
      favorites: []
    }])
    console.log('i',data,error,profileError)
  if (profileError) throw profileError
  return data
}

export const signInWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return user
}

// Google authentication
export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) throw error
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}