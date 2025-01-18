import { supabase } from "@/supabase";

export const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs-list")
    .select("*")
    .eq("category", "new");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
