import { createClient } from '@supabase/supabase-js'

// حط الروابط اللي جبتها من سوبابيز هنا مباشرة بين العلامات دي ""
const supabaseUrl = "https://hbdvvhqfaciyygcxtrkb.supabase.co"
const supabaseAnonKey = "sb_publishable__g-JwYMdQjMGU2KpYo3SJQ_V9f0Fa4o" // المفتاح الطويل اللي في الصورة الأخيرة

export const supabase = createClient(supabaseUrl, supabaseAnonKey)