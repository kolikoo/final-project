// src/components/ProfileSectionBlogs.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchBlogs,
  deleteBlog,
} from "@/supabase/profile/UserBlogs/UserBlogs";

interface Blog {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  price: string | null;
  currency: string | null;
  category: "used" | "new" | null;
  user_id: string | null;
}

const ProfileSectionBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogsData = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/BlogEditPage/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${blog.image_url}`}
                alt={blog.title || "Blog Image"}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold">{blog.title || "Untitled"}</h3>
              <p className="text-gray-700">
                {blog.description || "No description"}
              </p>
              <p className="text-gray-700">
                Price: {blog.price} {blog.currency}
              </p>
              <p className="text-gray-700">Category: {blog.category}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSectionBlogs;
