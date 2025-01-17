import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading"; // ლოადინგ კომპონენტის იმპორტი
import MainBlogCards from "../components-blogs/parent-blog-cards/blog-cards-main";
import BlogHomeSection from "../components-blogs/blog-home-section/blog-home-section";
import UsedFirstSection from "./components/First-section/usedFirstSection";

const UsedBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]); // ფავორიტი ბლოგების ID-ების სია
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ლოადინგის მდგომარეობა
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

  // ფავორიტების დატვირთვა
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

      // მხოლოდ `number` ტიპის ელემენტების ფილტრაცია
      const validFavorites = data
        ?.map((fav) => fav.blog_id)
        .filter((id): id is number => id !== null);

      setFavoriteBlogs(validFavorites);
    };

    fetchFavorites();
  }, [userId]);


  // ბლოგების დატვირთვა
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs-list")
          .select("*")
          .eq("category", "used"); // ფილტრაცია "used"-ზე

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
        setIsLoading(false); // მონაცემების ჩატვირთვის დასრულების შემდეგ, ლოადინგი იხსნება
      }
    };

    fetchBlogs();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleFavoriteToggle = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to favorite items.");
      return;
    }

    if (favoriteBlogs.includes(blogId)) {
      // ფავორიტებიდან ამოღება
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
      // ფავორიტებში დამატება
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
                onClick={() => handleNavigate(`/Details/${blog.id}`)}
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
              </div>
            ))}
          </MainBlogCards>
        </BlogHomeSection>
      </div>
    </>
  );
};

export default UsedBlog;
