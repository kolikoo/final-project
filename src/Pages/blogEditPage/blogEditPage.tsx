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
  category: z.enum(["used", "new"]),
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
        const data = await fetchBlogData(blogId); // გამოიყენეთ fetchBlogData
        reset({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          category:
            data.category === "used" || data.category === "new"
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
        formData.category === "used" || formData.category === "new"
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
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      {loading && <Loading />} {/* აქ დავამატეთ Loading კომპონენტი */}
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title")}
              className="border p-2 w-full rounded"
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
              className="border p-2 w-full rounded"
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
              className="border p-2 w-full rounded"
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
              className="border p-2 w-full rounded"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
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
