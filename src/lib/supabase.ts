import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgtyhokoviqfxlynntis.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseKey) {
  console.error('Missing Supabase anon key. Please add VITE_SUPABASE_ANON_KEY to your environment variables')
  throw new Error('Missing Supabase anon key. Please configure VITE_SUPABASE_ANON_KEY in your deployment environment.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)