import { supabase } from "@/supabase";

// Fetch all blogs with category "new"
export const fetchBlogs = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from("blogs-list")
      .select("*")
      .eq("category", "new");

    if (error) {
      console.error("Error fetching blogs:", error.message);
      throw new Error("Failed to fetch blogs.");
    }

    return data || [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw new Error("An unexpected error occurred while fetching blogs.");
  }
};

// Fetch user's favorite blogs
export const fetchFavorites = async (userId: string): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("blog_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching favorites:", error.message);
      throw new Error("Failed to fetch favorite blogs.");
    }

    // Ensure no null values and map to a number array
    return (
      data
        ?.map((fav) => fav.blog_id)
        .filter((id): id is number => id !== null) || []
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw new Error("An unexpected error occurred while fetching favorites.");
  }
};

// Add a blog to user's favorites
export const addFavorite = async (
  userId: string,
  blogId: number,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, blog_id: blogId }]);

    if (error) {
      console.error("Error adding favorite:", error.message);
      throw new Error("Failed to add favorite.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw new Error("An unexpected error occurred while adding a favorite.");
  }
};

// Remove a blog from user's favorites
export const removeFavorite = async (
  userId: string,
  blogId: number,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("blog_id", blogId);

    if (error) {
      console.error("Error removing favorite:", error.message);
      throw new Error("Failed to remove favorite.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw new Error("An unexpected error occurred while removing a favorite.");
  }
};
