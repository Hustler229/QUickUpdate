// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;  // URL de ton projet Supabase
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;  // Clé publique (anon) de Supabase
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export default supabase
