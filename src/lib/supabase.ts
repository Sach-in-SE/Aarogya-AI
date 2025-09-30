import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgtyhokoviqfxlynntis.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndHlob2tvdmlxZnhseW5udGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzE1MzksImV4cCI6MjA1MTE0NzUzOX0.P7rrCMqe_2N1k-4Nc_q2AA2YarBIu-TwGe87Y5LJ8H8'

if (!supabaseKey) {
  throw new Error('Missing Supabase anon key. Please add VITE_SUPABASE_ANON_KEY to your .env file')
}

export const supabase = createClient(supabaseUrl, supabaseKey)