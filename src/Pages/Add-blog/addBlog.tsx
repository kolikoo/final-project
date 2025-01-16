import React, { useState } from "react";
import { supabase } from "@/supabase"; // Supabase ინიციალიზაცია

const AddClothingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "GEL", // Default to Georgian Lari
    category: "new", // Default to "new"
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // სურათის ატვირთვის ფუნქცია
  const uploadImage = async (file: File) => {
    const filePath = `blogs-images/${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    return data?.path; // ატვირთული სურათის პათის დაბრუნება
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ახალი მეთოდი - supabase.auth.getUser()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw new Error("Error getting user: " + error.message);
      }

      if (!user) {
        throw new Error("User is not logged in.");
      }

      // შექმნა ბლოგი Supabase-ში
      const { data, error: insertError } = await supabase
        .from("blogs-list")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            currency: formData.currency,
            category: formData.category,
            image_url: selectedFile ? await uploadImage(selectedFile) : null, // სურათის URL
            user_id: user.id, // თუ საჭიროა მომხმარებლის ID
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // თუ ბლოგი წარმატებით შეიქმნა
      console.log("Successfully created blog post:", data);

      // ფორმის გათეთრება
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "GEL",
        category: "new",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error during form submission:", error); // შეცდომის გამოჩენა
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Clothing</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium mb-2">
          Price
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleSelectChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="GEL">₾ (Lari)</option>
            <option value="USD">$ (Dollar)</option>
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default AddClothingForm;
