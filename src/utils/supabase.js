// Supabase client initialization

import { createClient } from '@supabase/supabase-js'

// Validate environment variables
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL environment variable is not set')
}

if (!import.meta.env.VITE_SUPABASE_KEY) {
  throw new Error('VITE_SUPABASE_KEY environment variable is not set')
}

// Create and configure Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Helper auth methods for easy access
export const auth = supabase.auth