import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      className="bg-[#F7F5EB] text-black dark:bg-zinc-900 dark:text-[#f8f4e3] w-full
      semismall:w-[138%]
      semimedium:w-[100%]
      small:w-[170%]"
    >
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">ThriftShop</h1>
            <ul className="flex justify-center md:justify-start space-x-4 mt-4">
              <li>
                <a href="#" className="hover:text-gray-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("header.category")}
              </h3>
              <ul>
                <li>
                  <p onClick={() => handleNavigate("/NewBlog")}>
                    {t("header.New")}
                  </p>
                </li>
                <li>
                  <p onClick={() => handleNavigate("/UsedBlog")}>
                    {t("header.Used")}
                  </p>
                </li>
                <li>
                  <p onClick={() => handleNavigate("/Shoes")}>
                    {t("header.shoes")}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("header.about")}
              </h3>
              <ul>
                <li>
                  <a href="#homeBlogAboutArticle">{t("header.about")}</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-200">
                    {t("header.Contact")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("header.Stay Up To Date")}
              </h3>
              {/* Optionally, add a subscription form or other content */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm">
          <p className="text-center">&copy; 2023 Rivo. All rights reserved.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a href="#" className="hover:text-gray-200">
                {t("header.Terms")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                {t("header.Privacy")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                {t("header.Cookies")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
