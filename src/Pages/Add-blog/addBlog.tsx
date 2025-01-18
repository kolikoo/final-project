import React, { useState } from "react";
import { supabase } from "@/supabase"; 
import { useTranslation } from "react-i18next";

const AddClothingForm: React.FC = () => {
    const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "GEL", 
    category: "new", 
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


  const uploadImage = async (file: File) => {
    const filePath = `blogs-images/${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    return data?.path; 
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


      const { data, error: insertError } = await supabase
        .from("blogs-list")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            currency: formData.currency,
            category: formData.category,
            image_url: selectedFile ? await uploadImage(selectedFile) : null, 
            user_id: user.id, 
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      
      console.log("Successfully created blog post:", data);

   
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "GEL",
        category: "new",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error during form submission:", error); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6"
    >
      <h2 className="text-xl font-bold mb-4">{t("addBlog.form.heading")}</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          {t("addBlog.form.title")}
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
          {t("addBlog.form.description")}
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

     
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium mb-2">
          {t("addBlog.form.price")}
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
            <option value="GEL">
              {t("addBlog.form.currency.options.gel")}
            </option>
            <option value="USD">
              {t("addBlog.form.currency.options.usd")}
            </option>
          </select>
        </div>
      </div>

    
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          {t("addBlog.form.category.label")}
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="new">{t("addBlog.form.category.options.new")}</option>
          <option value="used">
            {t("addBlog.form.category.options.used")}
          </option>
        </select>
      </div>

      
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          {t("addBlog.form.image")}
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

    
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
      >
        {t("addBlog.form.submit")}
      </button>
    </form>
  );
};

export default AddClothingForm;
