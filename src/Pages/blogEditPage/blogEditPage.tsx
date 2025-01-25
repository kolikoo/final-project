import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchBlogData, updateBlogData } from "@/supabase/blogs/blogEdit"; 
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  category: z.enum(["used", "new", "shoes"]), 
});


type BlogFormValues = z.infer<typeof blogSchema>;

const BlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    const blogId = Number(id);
    if (isNaN(blogId)) {
      console.error("Invalid blog ID");
      return;
    }

   const fetchBlog = async () => {
  setLoading(true);
  try {
    const data = await fetchBlogData(blogId);
    if (!data) {
      console.error("Blog data is null or undefined");
      return;
    }

    reset({
      title: data.title || "",
      description: data.description || "",
      price: data.price || "",
      category:
        data.category === "used" || data.category === "new" ||data.category==="shoes"
          ? data.category
          : "new",
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
  } finally {
    setLoading(false);
  }
};


    fetchBlog();
  }, [id, reset]);

  const onSubmit = async (formData: BlogFormValues) => {
    const blogId = Number(id);
    if (isNaN(blogId)) {
      console.error("Invalid blog ID");
      return;
    }

    const payload = {
      ...formData,
      category:
        formData.category === "used" || formData.category === "new"||formData.category==="shoes"
          ? formData.category
          : "new",
    };

    setLoading(true);
    try {
      await updateBlogData(blogId, payload); // გამოიყენეთ updateBlogData
      alert("Blog updated successfully!");
      navigate("/profile"); // redirect to profile page after successful update
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-2">
      <h2 className="text-2xl font-bold mb-4 text-center p-4">Edit Blog</h2>
      {loading && <Loading />}
      {!loading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-[#f8f4e3] p-10 mb-4 dark:bg-zinc-900 rounded-lg shadow-md w-full max-w-lg mx-auto small:ml-[60%]
          semismall:ml-[20%]
          sm:ml-[30%]
          "
        >
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title")}
              className="w-full px-4 py-2 border-[2px]  border-[#450920] dark:border-[#C4D7F2] focus:outline-none focus:ring-2 focus:ring-[#450920] dark:bg-zinc-900 dark:focus:ring-slate-400 rounded-[20px] "
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 border-[2px]  border-[#450920]  focus:outline-none focus:ring-2 focus:ring-[#450920] dark:focus:ring-slate-400 rounded-[20px] dark:border-[#C4D7F2]
dark:bg-zinc-900"
              placeholder="Enter blog description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              {...register("price")}
              className="w-full px-4 py-2 border-[2px]  border-[#450920]  focus:outline-none focus:ring-2 focus:ring-[#450920] dark:focus:ring-slate-400 rounded-[20px] dark:border-[#C4D7F2]
dark:bg-zinc-900"
              placeholder="Enter blog price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border-[2px]  border-[#450920]  focus:outline-none focus:ring-2 focus:ring-[#450920] dark:focus:ring-slate-400 rounded-[20px] dark:border-[#C4D7F2]
dark:bg-zinc-900"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="shoes">Shoes</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#450920] text-white font-bold py-2 px-4 dark:border-[#C4D7F2]
dark:bg-[#C4D7F2] dark:text-black rounded hover:bg-[#720d30] transition-colors "
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogEditPage;
