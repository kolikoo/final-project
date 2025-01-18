import { supabase } from "@/supabase";

// მონაცემების ამოღება
export const fetchBlogData = async (blogId: number) => {
  const { data, error } = await supabase
    .from("blogs-list")
    .select("*")
    .eq("id", blogId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// მონაცემების განახლება
export const updateBlogData = async (blogId: number, payload: any) => {
  const { error } = await supabase
    .from("blogs-list")
    .update(payload)
    .eq("id", blogId);

  if (error) throw error;
};
