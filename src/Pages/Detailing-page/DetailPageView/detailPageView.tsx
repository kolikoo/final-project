import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/supabase";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "@/supabase/favorites/favorites";

// Define the types for blog and favorite blog
interface Blog {
  id: number;
  category: string | null;
  created_at: string;
  currency: string | null;
  description: string | null;
  image_url: string | null;
  price: string | null;
  title: string | null;
  user_id: string | null;
}

const Details: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null); // Updated the type for blog
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: userSession, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user session:", error);
        return;
      }
      setUserId(userSession?.user.id || null);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogId = id ? parseInt(id) : NaN;
        if (isNaN(blogId)) {
          console.error("Invalid blog ID");
          return;
        }

        const { data, error } = await supabase
          .from("blogs-list")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) {
          console.error("Error fetching blog details:", error.message);
        }

        if (data) {
          setTimeout(() => {
            setBlog(data);
            setIsLoading(false);
          }, 500);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    const fetchFavoritesData = async () => {
      if (!userId) return;
      try {
        const favorites = await fetchFavorites(userId);
        setFavoriteBlogs(favorites);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching favorites:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      }
    };

    if (id) {
      fetchBlogDetails();
      fetchFavoritesData();
    }
  }, [id, userId]);

  const handleFavoriteToggle = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to add items to favorites.");
      return;
    }

    try {
      if (favoriteBlogs.includes(blogId)) {
        await removeFavorite(userId, blogId);
        setFavoriteBlogs((prev) => prev.filter((id) => id !== blogId));
      } else {
        await addFavorite(userId, blogId);
        setFavoriteBlogs((prev) => [...prev, blogId]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error handling favorite:", error.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center">
        No data found
      </div>
    );
  }

  return (
    <div className="min-h-screen small:ml-44 semismall:ml-24   w-full flex items-start justify-center p-4 bg-white dark:bg-zinc-900 xl:w-[90%] xl:mr-[500px]  semimedium:w-[100%] semimedium:ml-0 ">
      <div
        className="
    w-full max-w-5xl 
    flex flex-wrap md:flex-nowrap gap-4
    border border-black border-dashed 
    rounded-lg overflow-hidden 
    shadow-md dark:bg-zinc-800 bg-[#F7F5EB]
    semimedium:w-[100%]
    semimedium:mr-[20%px]
    xl:ml-[8%]
    
    p-6
    "
      >
       
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white dark:bg-zinc-800">
          <img
            src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
            alt={blog.title || ""} 
            className="w-full max-w-[90%] h-auto object-cover rounded-[40px]"
          />
        </div>

     
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center dark:text-white">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            {blog.title}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Price: {blog.price} {blog.currency}
          </p>
          <div>
            <label className="block text-lg font-bold text-gray-900 dark:text-white">
              Description:
            </label>
            <p className="text-gray-700 dark:text-gray-300">
              {blog.description}
            </p>
          </div>
          <div>
            <label className="block text-lg font-bold text-gray-900 dark:text-white">
              Category:
            </label>
            <p className="text-gray-700 dark:text-gray-300">{blog.category}</p>
          </div>
          <button
            onClick={() => handleFavoriteToggle(blog.id)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 dark:bg-[#C4D7F2] dark:hover:bg-opacity-45"
          >
            {favoriteBlogs.includes(blog.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
