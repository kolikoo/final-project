import { supabase } from "@/supabase";

export const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs-list")
    .select("*")
    .eq("category", "shoes");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const fetchFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("blog_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // Handle null values for `blog_id` safely
  return (data || [])
    .map((item: { blog_id: number | null }) => item.blog_id!)
    .filter((id): id is number => id !== null);
};


export const addFavorite = async (userId: string, blogId: number) => {
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, blog_id: blogId });

  if (error) {
    throw new Error(error.message);
  }
};

export const removeFavorite = async (userId: string, blogId: number) => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ user_id: userId, blog_id: blogId });

  if (error) {
    throw new Error(error.message);
  }
};
