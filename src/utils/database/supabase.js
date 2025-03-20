import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL='https://muvlaurwojlkvhzvwtqb.supabase.co'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dmxhdXJ3b2psa3ZoenZ3dHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTYyMTcsImV4cCI6MjA1NjM3MjIxN30.eZvY_v6wBxlLnKrCJyG3j_b9dXiqT6C8MX2U2fWUZdg'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,
    {persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true}
);

export  {supabase};
