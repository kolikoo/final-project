import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/supabase"; // თქვენი Supabase კლიენტი
import detailBackground1 from "@/images/detailBackground1.png";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";

const Details: React.FC = () => {
  const { id } = useParams(); // URL პარამეტრიდან ID-ს აღება
  const [blog, setBlog] = useState<any>(null); // ბლოგის მონაცემები
  const [isLoading, setIsLoading] = useState<boolean>(true); // ლოდინის სტატუსი

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogId = id ? parseInt(id) : NaN; // თუ `id` არსებობს, გარდაქმნე number-ში
        if (isNaN(blogId)) {
          console.error("Invalid blog ID");
          return;
        }

        // Supabase-ში ბლოგის მონაცემების მოძიება ID-ის მიხედვით
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
            setBlog(data); // 0.5 წამში მონაცემების განახლება
            setIsLoading(false); // ლოდინის დასრულება
          }, 500);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  // Loading Page
  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center">
        No data found
      </div>
    );
  }

  return (
    <div
      className="h-[700px] bg-beige flex items-center justify-center p-8 bg-center bg-fixed bg-repeat"
      style={{
        backgroundImage: `url(${detailBackground1})`,
      }}
    >
      <div className="w-[70%] h-[600px] flex border-black border-[1px] border-dashed flex-wrap md:flex-nowrap dark:bg-zinc-800 bg-white shadow-lg rounded-[20px]  overflow-hidden">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <img
            src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
            alt={blog.title}
            className="object-cover w-[80%]"
          />
        </div>
        {/* Right Section: Details */}
        <div className="dark:text-white w-full md:w-1/2 p-6 space-y-6 m-auto">
          <h1 className="dark:text-white text-3xl font-semibold text-gray-800">
            {blog.title}
          </h1>
          <p className="dark:text-white text-xl font-bold text-gray-700">
            {blog.price} {blog.currency}
          </p>
          <div>
            <label className="block dark:text-white text-gray-600 mb-2 font-extrabold">
              Description:
            </label>
            <p className="dark:text-white text-gray-600 ">{blog.description}</p>
          </div>
          <div>
            <label className="block text-gray-600 mb-2 dark:text-white font-extrabold">
              Category:
            </label>
            <p className="text-gray-600 dark:text-white ">{blog.category}</p>
          </div>
          <button className="w-full bg-black text-white py-2 rounded dark:text-white dark:bg-green-9 hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
