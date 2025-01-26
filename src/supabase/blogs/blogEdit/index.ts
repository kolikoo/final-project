import { supabase } from "@/supabase";

interface Blog {
  id: number;
  title: string | null;
  content?: string;
  created_at: string;
  updated_at?: string;
  category: string | null;
  currency: string | null;
  description: string | null;
  image_url: string | null;
  price: string | null;
  user_id: string | null;
}

export const fetchBlogData = async (blogId: number): Promise<Blog | null> => {
  const { data, error } = await supabase
    .from("blogs-list")
    .select("*")
    .eq("id", blogId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

interface UpdateBlogPayload {
  title?: string;
  content?: string;
}

export const updateBlogData = async (
  blogId: number,
  payload: UpdateBlogPayload,
): Promise<void> => {
  const { error } = await supabase
    .from("blogs-list")
    .update(payload)
    .eq("id", blogId);

  if (error) throw error;
};
