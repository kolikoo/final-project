import React from "react";
import marcxena from "@/images/newnew.png";
import marjvena from "@/images/usedused.png";
import background from "@/images/bgbgbg.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomeSecondSection: React.FC = () => {
 const {t}=useTranslation()

 const navigate=useNavigate()
 const handleNavigate=(path:string)=>{
navigate(path)
 }

  return (
    <section
      className="relative flex justify-center items-center h-screen bg-cover bg-center p-[50px]"
      style={{
        backgroundImage: `url(${background})`, // ფონის სურათი სექციისთვის
      }}
    >
      {/* Left Section */}
      <div className="relative w-1/2 h-full flex items-center justify-center group overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div
          className="absolute w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${marcxena})`,
          }}
        ></div>
        {/* Button */}
        <button onClick={()=>handleNavigate("/Newblog")} className="z-10 px-6 py-3  text-[40px]  w-[30%] h-[85px] font-[100] text-[#F7F5EB] border-[2px] border-black bg-zinc-300 bg-opacity-30 hover:bg-white hover:text-black transition-colors rounded-md">
          {t("header.New")}
        </button>
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      </div>

      {/* Right Section */}
      <div className="relative w-1/2 h-full flex items-center justify-center group overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div
          className="absolute w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${marjvena})`,
          }}
        ></div>
        {/* Button */}
        <button onClick={()=>handleNavigate("/Usedblog")} className="z-10 px-6 py-3  text-[40px]  w-[30%] h-[85px] font-[100] text-[#F7F5EB] border-[2px] border-black bg-zinc-300 bg-opacity-30 hover:bg-white hover:text-black transition-colors rounded-md">
          {t("header.Used")}
        </button>
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black bg-opacity-30"></div>
      </div>
    </section>
  );
};

export default HomeSecondSection;
