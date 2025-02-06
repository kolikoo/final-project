import React from "react";
import { useTranslation } from "react-i18next";

interface CategoryProps {
  value: string;
  onChange: (value: string) => void;
}

const Category: React.FC<CategoryProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium mb-2">
        {t("addBlog.form.category.label")}
      </label>
      <select
        id="category"
        name="category"
        value={value}
        onChange={handleSelectChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-[#450920] dark:border-slate-400 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
      >
        <option value="new">{t("addBlog.form.category.options.new")}</option>
        <option value="used">{t("addBlog.form.category.options.used")}</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>
  );
};

export default Category;
