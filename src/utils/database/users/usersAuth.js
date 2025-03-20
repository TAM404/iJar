import { supabase } from '../supabase';
import { insertUser, getUserById } from './usersAPI';

// SignUp method, creates a user in both Supabase Auth and the `users` table
const signUp = async (email, password, userData) => {
  try {
    // First, create the user in the Auth system
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData?.user) throw new Error('No user returned from auth signup');

    // Insert the user into the `users` table
    const { data, error: userError } = await insertUser(authData.user.id, {...userData, email:email});

    if (userError) throw userError;

    return { 
      user: authData.user, 
      data 
    };
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

// SignIn method, authenticates a user and retrieves user data from the `users` table
const signIn = async (email, password) => {
  try {
    // Sign in the user with email and password
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData?.user) throw new Error('No user returned from auth signin');

    // Retrieve the user details from the `users` table
    const userData = await getUserById(authData.user.id);

    return { 
      user: authData.user, 
      userData 
    };
  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

// SignOut method to log out the user
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('SignOut error:', error);
    throw error;
  }
};

export { signUp, signIn, signOut };
