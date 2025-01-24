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
} from "@/supabase/blogs/newBlogs/newBlogs";
import { supabase } from "@/supabase";

const NewBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 12;
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userSession } = await supabase.auth.getUser();
        const fetchedUserId = userSession?.user?.id || null;
        setUserId(fetchedUserId);

        const [blogsData, favorites] = await Promise.all([
          fetchBlogs(),
          fetchedUserId ? fetchFavorites(fetchedUserId) : [],
        ]);

        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
        setFavoriteBlogs(favorites);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle favorite toggle
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
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  // Pagination logic
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  if (isLoading) return <Loading />;
    // sm: "640px", 
    //     small: "340px", 
    //     semismall:"500px",
    //     extramedium:"780px",
    //     medium:"580px",
    //     semimedium:"800px",
    //     large:"900px"
    

  return (
    <div
      className="w-full   bg-white px-10 dark:bg-zinc-900
    
    "
    >
      <FilterSection allBlogs={blogs} onFilterChange={setFilteredBlogs} />
      <BlogHomeSection>
        <MainBlogCards>
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/Details/${blog.id}`)}
              className="bg-white  dark:bg-zinc-800 p-4 shadow-lg rounded-lg cursor-pointer hover:scale-110 duration-300"
            >
              <div className="relative">
                <img
                  src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
                  alt={blog.title}
                  className="w-full h-48 sm:h-64 object-cover rounded-md"
                />
                <FavoriteBorderIcon
                  className={`absolute top-3 right-3 rounded-full p-0.5 cursor-pointer ${
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
      {/* Pagination */}
      <div className="flex justify-center py-10 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-black text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredBlogs.length / blogsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)
          }
          className="px-3 py-2 bg-black text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewBlogs;
