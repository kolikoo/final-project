import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import MainBlogCards from "../components-blogs/parent-blog-cards/blog-cards-main";
import BlogHomeSection from "../components-blogs/blog-home-section/blog-home-section";
import { fetchBlogs } from "@/supabase/blogs/newBlogs/newBlogs";
import SearchIcon from "@mui/icons-material/Search";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "@/supabase/favorites/favorites";
import UsedFirstSection from "../used/components/First-section/usedFirstSection";

const NewBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const blogsPerPage = 12; 
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

    fetchFavoritesData();
  }, [userId]);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const blogs = await fetchBlogs();
        setBlogs(blogs);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching blogs:", error.message);
        } else {
          console.error("Unknown error occurred:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogsData();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleFavoriteToggle = async (blogId: number) => {
    if (!userId) {
      alert("You must be logged in to favorite items.");
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

  // Filtering blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UsedFirstSection />
      <div className="w-[100%] bg-white px-10 dark:bg-zinc-900">
        <div className="search-container flex gap-5 py-6">
          <div className="w-[30%] flex items-center border-[2px] rounded-[10px] border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500">
            <SearchIcon className="ml-1" />

            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[100%] h-10 rounded-[10px] dark:border-slate-400 dark:bg-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <BlogHomeSection>
          <MainBlogCards>
            {currentPosts.map((blog) => (
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
                        e.stopPropagation();
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

        {/* Pagination buttons */}
        <div className="flex justify-center py-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded-l-lg disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black text-white rounded-r-lg disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewBlogs;
