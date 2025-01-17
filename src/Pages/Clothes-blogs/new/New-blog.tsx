import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Link, useNavigate } from "react-router-dom";
import MainBlogCards from "../components-blogs/parent-blog-cards/blog-cards-main";
import BlogHomeSection from "../components-blogs/blog-home-section/blog-home-section";
import UsedFirstSection from "../used/components/First-section/usedFirstSection";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const NewBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs-list")
          .select("*")
          .eq("category", "new");

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        if (data) {
          setBlogs(data);
        } else {
          console.log("No blogs found");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("blog_id")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching favorites:", error.message);
        return;
      }

      const validFavorites = data
        ?.map((fav) => fav.blog_id)
        .filter((id): id is number => id !== null);

      setFavoriteBlogs(validFavorites || []);
    };

    fetchFavorites();
  }, [userId]);

  const handleFavoriteToggle = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to favorite items.");
      return;
    }

    if (favoriteBlogs.includes(blogId)) {
      // Remove favorite
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("blog_id", blogId)
        .eq("user_id", userId);

      if (error) {
        console.error("Error removing favorite:", error.message);
      } else {
        setFavoriteBlogs((prev) => prev.filter((id) => id !== blogId));
      }
    } else {
      // Add favorite
      const { error } = await supabase
        .from("favorites")
        .insert([{ blog_id: blogId, user_id: userId }]);

      if (error) {
        console.error("Error adding favorite:", error.message);
      } else {
        setFavoriteBlogs((prev) => [...prev, blogId]);
      }
    }
  };

  const handleDelete = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to delete your post.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("blogs-list")
        .delete()
        .eq("id", blogId)
        .eq("user_id", userId);

      if (error) {
        console.error("Error deleting blog:", error.message);
        return;
      }

      if (data) {
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        alert("Post deleted successfully.");
      }
    } catch (err) {
      console.error("Error during delete:", err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UsedFirstSection />
      <div className="w-[100%] bg-white px-10 dark:bg-zinc-900">
        <BlogHomeSection>
          <MainBlogCards>
            {blogs.map((blog) => (
              <div
                onClick={() => navigate(`/Details/${blog.id}`)}
                key={blog.id}
                className="bg-white dark:bg-zinc-800 p-4 shadow-lg rounded-lg cursor-pointer hover:scale-110 duration-300"
              >
                <div className="relative">
                  <img
                    src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-md relative"
                  />

                  <div className="absolute top-3 right-3">
                    <FavoriteBorderIcon
                      className={`rounded-full p-0.5 cursor-pointer ${
                        favoriteBlogs.includes(blog.id)
                          ? "text-white bg-black"
                          : "text-black hover:text-white hover:bg-black"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // ხელს უშლის მშობლის `onClick`-ის გამოვლენას
                        handleFavoriteToggle(blog.id);
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-4">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {blog.description}
                </p>
                <p className="text-gray-800 mt-3 dark:text-gray-300">
                  Price:{" "}
                  <span className="text-black font-[700] dark:text-gray-300">
                    {blog.price} {blog.currency}
                  </span>
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(blog.id);
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600 hidden"
                >
                  Delete Post
                </button>
              </div>
            ))}
          </MainBlogCards>
        </BlogHomeSection>
      </div>
    </>
  );
};

export default NewBlog;
