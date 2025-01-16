import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";
import MainBlogCards from "../components-blogs/parent-blog-cards/blog-cards-main";

import BlogHomeSection from "../components-blogs/blog-home-section/blog-home-section";
import UsedFirstSection from "../used/components/First-section/usedFirstSection";

const NewBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // მომხმარებლის ID-ის აღება
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
          .eq("category", "new"); // ფილტრაცია ხდება "used"-ზე

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
      }
    };

    fetchBlogs();
  }, []);

  // Handle navigate to detail page
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Handle delete blog post
  const handleDelete = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to delete your post.");
      return;
    }

    try {
      // Delete only if the current user is the one who created the blog
      const { data, error } = await supabase
        .from("blogs-list")
        .delete()
        .eq("id", blogId)
        .eq("user_id", userId); // Check if the user ID matches

      if (error) {
        console.error("Error deleting blog:", error.message);
        return;
      }

      if (data) {
        // Successfully deleted, now update the UI
        setBlogs(blogs.filter((blog) => blog.id !== blogId)); // Remove deleted blog from state
        alert("Post deleted successfully.");
      }
    } catch (err) {
      console.error("Error during delete:", err);
    }
  };

  return (
    <>
      <UsedFirstSection />
      <div className="w-[100%] bg-white px-10 dark:bg-zinc-900">
        <BlogHomeSection>
          <MainBlogCards>
            {blogs.map((blog) => (
              <div
                onClick={() => handleNavigate(`/Details/${blog.id}`)}
                key={blog.id}
                className="bg-white dark:bg-zinc-800 p-4  shadow-lg rounded-lg cursor-pointer hover:scale-110 duration-300"
              >
                <img
                  src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-4">{blog.title}</h3>
                <p className="text-gray-600  dark:text-gray-300">
                  {blog.description}
                </p>
                <p className="text-gray-800 mt-3 dark:text-gray-300">
                  Price:{" "}
                  <span className="text-black font-[700] dark:text-gray-300">
                    {blog.price} {blog.currency}
                  </span>
                </p>
                {/* {წაშლის ღილაკი რომელიც ვინც შექმნა მას შეუძლია რომ წაშალოსსს } */}
                {userId === blog.user_id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete(blog.id);
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
                  >
                    Delete Post
                  </button>
                )}
              </div>
            ))}
          </MainBlogCards>
        </BlogHomeSection>
      </div>
    </>
  );
};



export default NewBlog;



