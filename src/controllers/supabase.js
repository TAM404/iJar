import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://muvlaurwojlkvhzvwtqb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dmxhdXJ3b2psa3ZoenZ3dHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTYyMTcsImV4cCI6MjA1NjM3MjIxN30.eZvY_v6wBxlLnKrCJyG3j_b9dXiqT6C8MX2U2fWUZdg'

export const supabase = createClient(supabaseUrl, supabaseKey)