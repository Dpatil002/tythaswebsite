import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vnlftsptxfxvcgkmjonp.supabase.co";
const supabaseKey = "sb_publishable_h35J9AoBIFHLlc8QzZhRhw_6sbJO8w3";

export const supabase = createClient(supabaseUrl, supabaseKey);
