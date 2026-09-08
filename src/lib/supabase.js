import { createClient } from '@supabase/supabase-js'
import { UX0_PROTOTYPE_MODE } from '../config/ux0'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !UX0_PROTOTYPE_MODE && Boolean(supabaseUrl && supabaseAnonKey)

export const supabaseConfigError = new Error(
  'Account access is not active in this ARO preview yet. You can still explore the public experience.'
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
