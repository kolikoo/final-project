
import { supabase } from "@/supabase";


export const fetchFavorites = async (userId: string): Promise<number[]> => {
  const { data, error } = await supabase
    .from("favorites")
    .select("blog_id")
    .eq("user_id", userId);

  if (error) {

    throw new Error(error.message);
  }

 
  return (
    data
      ?.filter((fav) => fav.blog_id !== null)
      .map((fav) => fav.blog_id as number) || []
  ); 
};



export const addFavorite = async (userId: string, blogId: number): Promise<void> => {
  const { error } = await supabase
    .from("favorites")
    .insert([{ blog_id: blogId, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }
};

// ფავორიტიდან ამოღება
export const removeFavorite = async (userId: string, blogId: number): Promise<void> => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("blog_id", blogId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
};
