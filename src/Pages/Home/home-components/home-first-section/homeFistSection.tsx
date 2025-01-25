import React from "react";
import { useTranslation } from "react-i18next";
import shua from "@/images/shua.png";
import marjvena from "@/images/marjvena.png";
import marcxena from "@/images/marcxena.png";


const HomeFirstSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="bg-[#F7F5EB] dark:bg-zinc-900 w-full h-screen relative flex items-center justify-center overflow-hidden
      lg:h-[950px] semismall:h-[400px] semimedium:h-[700px] small:h-[400px]
      semismall:w-[138%] semimedium:w-[100%] small:w-[170%]"
    >

      <h1 className="absolute top-[7%] left-[23%] text-[140px] dark:text-white dark:opacity-90 font-serif font-bold text-[#450920] leading-none z-1 xl:text-[150px] xl:left-[23%] lg:text-[130px] lg:left-[20%] large:text-[100px] semimedium:text-[100px] semimedium:left-[21%] semimedium:top-[13%] extramedium:left-[28%] small:text-[75px] small:top-10 sm:text-[80px] sm:top-[5%] medium:text-[60px] large:left-[24%] large:top-[12%] lg:top-[19%] xl:top-[12%] semismall:text-[80px] ">
        ThriftShop
      </h1>


      <div className="relative w-full h-full flex items-center justify-center gap-4">

        <img
          src={marcxena}
          alt="Left Image"
          className="w-[250px] h-[250px] object-cover rounded-md shadow-lg xl:w-[250px] xl:h-[250px] large:w-[250px] large:h-[250px] semimedium:w-[200px] semimedium:h-[200px] medium:w-[130px] medium:h-[140px] small:w-[100px] small:h-[110px] semismall:w-[120px]"
        />

        
        <img
          src={shua}
          alt="Center Image"
          className="w-[400px] h-[500px] object-cover rounded-md shadow-xl z-10 xl:w-[400px] xl:h-[500px] semimedium:w-[300px] semimedium:h-[400px] medium:w-[170px] medium:h-[240px] small:w-[100px] small:h-[200px]"
        />

        <img
          src={marjvena}
          alt="Right Image"
          className="w-[200px] h-[300px] object-cover rounded-md shadow-lg xl:w-[200px] xl:h-[300px] semimedium:w-[180px] semimedium:h-[300px] medium:w-[130px] medium:h-[180px] small:w-[100px] small:h-[150px]"
        />
      </div>


      <div className="absolute top-[15%] left-[5%] flex flex-col gap-4 w-[30%] z-10 large:text-[12px] large:w-[170px] semimedium:w-28 semimedium:top-[17%] small:w-[15%] small:top-[20%] small:left-[10%]">
        <h2 className="text-[15px] opacity-25 dark:text-white font-serif font-bold text-black leading-snug large:text-[11px] semimedium:text-[9px] xl:w-[100%] xl:text-[15px] small:text-[6px]">
          {t("Home-Page.explore message")}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <p className="text-gray-600 text-lg large:text-[10px] semimedium:text-[8px] xl:text-[15px] small:text-[5px]">
            {t("Home-Page.location")}
          </p>
        </div>
      </div>

   
    </section>
  ); 
};

export default HomeFirstSection;
