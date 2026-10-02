// Supabase Client with graceful fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
)

export const getSupabaseStatus = () => {
  return {
    configured: isSupabaseConfigured,
    mode: isSupabaseConfigured ? 'Supabase Cloud (PostgreSQL)' : 'Client-First Local Mock (Sẵn sàng kết nối Supabase)',
    url: isSupabaseConfigured ? supabaseUrl : null
  }
}
