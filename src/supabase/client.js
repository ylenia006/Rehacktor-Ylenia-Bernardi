import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.vite_supabase_url;
const supabaseKey = import.meta.env.vite_supabase_key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;