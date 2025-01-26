import React from "react";
import marcxena from "@/images/newnew.png";
import marjvena from "@/images/usedused.png";
import background from "@/images/bgbgbg.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeSecondSection: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section
      className="relative flex flex-col md:flex-row justify-center items-center h-screen bg-cover bg-center px-4 md:px-[50px]
      w-full
semismall:w-[138%]
semimedium:w-[100%]
small:w-[170%]
z-40
"
      style={{
        backgroundImage: `url(${background})`, // ფონის სურათი სექციისთვის
      }}
    >
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center group overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div
          className="absolute w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${marcxena})`,
          }}
        ></div>
        {/* Button */}
        <button
          onClick={() => handleNavigate("/Newblog")}
          className="z-10  px-4 py-2 md:px-6 md:py-3 text-[20px] md:text-[40px] w-[70%] md:w-[30%] h-[60px] md:h-[85px] font-[100] text-[#F7F5EB] border-[2px] border-black bg-zinc-300 bg-opacity-30 hover:bg-white hover:text-black transition-colors rounded-md sm:w-40 emismall:w-40 small:w-40"
        >
          {t("header.New")}
        </button>
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      </div>

      {/* Right Section */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center group overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div
          className="absolute w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${marjvena})`,
          }}
        ></div>
        {/* Button */}
        <button
          onClick={() => handleNavigate("/Usedblog")}
          className="z-10 px-4 py-2 md:px-6 md:py-3 text-[20px] md:text-[40px] w-[80%] md:w-[35%] h-[60px] md:h-[85px] font-[100] text-[#F7F5EB] border-[2px] border-black bg-zinc-300 bg-opacity-30 hover:bg-white hover:text-black transition-colors rounded-md sm:w-40 semismall:w-40 small:w-40  xl:bg-w-[70px]"
        >
          {t("header.Used")}
        </button>
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      </div>
    </section>
  );
};

export default HomeSecondSection;
