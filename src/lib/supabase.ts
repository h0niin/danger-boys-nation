import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface Memory {
  id: string;
  created_at: string;
  uploader_name: string;
  photo_url: string;
  caption: string | null;
}

/** Fetch all memories ordered newest first */
export async function fetchMemories(): Promise<Memory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Memory[];
}

/** Upload an image file to Supabase Storage and return its public URL */
export async function uploadPhoto(file: File, uploaderName: string): Promise<string> {
  if (!supabase) throw new Error("Supabase not configured");
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${uploaderName.toLowerCase()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("memories")
    .upload(filename, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("memories").getPublicUrl(filename);
  return data.publicUrl;
}

/** Insert a memory record into the database */
export async function insertMemory(
  uploaderName: string,
  photoUrl: string,
  caption: string | null,
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from("memories").insert({
    uploader_name: uploaderName,
    photo_url: photoUrl,
    caption: caption || null,
  });
  if (error) throw error;
}
