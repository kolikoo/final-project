import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import MainBlogCards from "../components-blogs/parent-blog-cards/blog-cards-main";
import BlogHomeSection from "../components-blogs/blog-home-section/blog-home-section";
import FilterSection from "../components-blogs/filter-section/filterSection";
import {
  fetchBlogs,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "@/supabase/blogs/shoes/shoes";
import { supabase } from "@/supabase";

export interface Blog {
  title: string;
  description: string;
  category: string | null;
  price: number | null;
  currency: string;
  image_url: string;
  created_at: string;
  id: number;
  type: string | null;
  user_id: string | null;
}


const Shoes: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error || !session?.session?.user?.id) {
        console.error("Error getting user session:", error);
        return;
      }
      setUserId(session.session.user.id);
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
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavoritesData();
  }, [userId]);

  useEffect(() => {
   const fetchBlogsData = async () => {
     try {
       const blogs = await fetchBlogs();
       const validatedBlogs = blogs.map((blog) => ({
         ...blog,
         title: blog.title ?? "",
         description: blog.description ?? "",
         category: blog.category ?? "",
         price:
           typeof blog.price === "string"
             ? parseFloat(blog.price)
             : (blog.price ?? null), 
         currency: blog.currency ?? "USD",
         image_url: blog.image_url ?? "",
       }));
       setBlogs(validatedBlogs);
     } catch (error: unknown) {
       console.error("Error fetching blogs:", error);
     } finally {
       setIsLoading(false);
     }
   };


    fetchBlogsData();
  }, []);

  useEffect(() => {
    const filterUsedBlogs = () => {
      const filtered = blogs.filter(
        (blog) =>
          blog.category === "shoes" &&
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredBlogs(filtered);
    };

    filterUsedBlogs();
  }, [blogs, searchQuery]);

  const handleNavigate = (path: string) => navigate(path);

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
      console.error("Error handling favorite:", error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full   bg-white px-10 dark:bg-zinc-900 xl:pb-11">
      <FilterSection
        allBlogs={blogs}
        onFilterChange={(filteredBlogs: Blog[]) =>
          setFilteredBlogs(filteredBlogs)
        }
      />

      <BlogHomeSection>
        <MainBlogCards>
          {currentBlogs.map((blog) => (
            <div
              onClick={() => handleNavigate(`/Details/${blog.id}`)}
              key={blog.id}
              className="bg-[#F7F5EB] dark:bg-zinc-800 p-4 shadow-lg rounded-lg cursor-pointer hover:scale-110 duration-300"
            >
              <div className="relative">
                <img
                  src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url }`}
                  alt={blog.title as string}
                  className="w-full h-64 object-cover rounded-md"
                />
                <div className="favorite-icon absolute top-3 right-3">
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
      <div className="flex justify-center my-10">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded-l-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded-r-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shoes;
