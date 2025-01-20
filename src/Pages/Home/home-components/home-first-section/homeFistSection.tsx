import React from "react";
import { useTranslation } from "react-i18next";
import shua from "@/images/shua.png";
import marjvena from "@/images/marjvena.png"
import marcxena from "@/images/marcxena.png";

const HomeFirstSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F7F5EB] dark:bg-zinc-900 w-full h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Text */}
      <h1 className="absolute top-[7%] left-[23%] text-[140px] dark:text-white dark:opacity-90 font-serif font-bold text-[#450920] leading-none z-1">
        ThriftShop
      </h1>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Image */}
        <img
          src={marcxena}
          alt="Left Image"
          className="absolute bottom-10 left-10 w-[250px] h-[250px] object-cover rounded-md shadow-lg"
        />

        {/* Center Image */}
        <img
          src={shua}
          alt="Center Image"
          className="relative w-[400px] h-[500px] object-cover rounded-md shadow-xl z-10"
        />

        {/* Right Image */}
        <img
          src={marjvena}
          alt="Right Image"
          className="absolute top-10 right-10 w-[200px] h-[300px] object-cover rounded-md shadow-lg"
        />
      </div>

      {/* Left Text */}
      <div className="absolute top-[15%] left-[5%] flex flex-col gap-4 w-[200px] z-10">
        <h2 className="text-[15px] opacity-25 dark:text-white font-serif font-bold text-black leading-snug">
          {t("Home-Page.explore message")}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <p className="text-gray-600 text-lg">{t("Home-Page.location")}</p>
        </div>
      </div>
    </section>
  );
};

export default HomeFirstSection;
