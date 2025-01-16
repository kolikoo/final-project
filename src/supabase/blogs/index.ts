import { supabase } from "..";

export const addBlog = async ({
  title,
  description,
  image_url,
  price,
  currency,
  category,
  user_id,
}: {
  title: string;
  description: string;
  image_url: string;
  price: string;
  currency: string;
  category: "used" | "new";
  user_id: string;
}) => {
  try {
    const { data, error } = await supabase.from("blogs-list").insert({
      title,
      description,
      image_url,
      price,
      currency,
      category,
      user_id,
    });

    if (error) {
      throw new Error(`Error adding blog: ${error.message}`);
    }

    console.log("Blog added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};
