interface Blog {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  price: string | null;
  currency: string | null;
  category: "used" | "new" | null;
  user_id: string | null;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user) {
      throw new Error("მომხმარებელი არ არის ავტორიზებული");
    }

    const user_id = sessionData.session.user.id;

    const { data, error } = await supabase
      .from("blogs-list")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item) => ({
      ...item,
      id: String(item.id),
      category:
        item.category === "used" || item.category === "new"
          ? item.category
          : null,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

import { supabase } from "@/supabase";

export const deleteBlog = async (id: string): Promise<void> => {
  try {
    const blogId = Number(id);
    const { error } = await supabase
      .from("blogs-list")
      .delete()
      .eq("id", blogId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
