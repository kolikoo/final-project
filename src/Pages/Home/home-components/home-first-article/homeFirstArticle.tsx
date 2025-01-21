import React  from "react";
import { useTranslation } from "react-i18next";

const HomeFirstArticle:React.FC=()=>{
  const { t } = useTranslation();


 return (
   <>
     <article
       id="homeBlogAboutArticle"
       className="flex flex-col items-center bg-[#F9F5EE] dark:text-[white] dark:bg-zinc-900 py-12 px-4 text-[#450920]
       w-full
semismall:w-[138%]
semimedium:w-[100%]
small:w-[170%]

       "
     >
       {/* Main Title */}
       <div className="text-center text-4xl font-serif font-bold mb-8">
         <h1 className="uppercase leading-tight">
           {t("Home-Page.Aboutour")}
         </h1>
         <h2 className="uppercase text-[4rem] leading-none">ThiftShop</h2>
       </div>

       <div className="flex flex-wrap justify-center max-w-5xl w-full gap-8">
         {/* Left Section */}
         <div className="flex flex-col items-start text-left w-[30%] ">
           <p className="text-xl italic leading-relaxed mb-4 font-[300]">
             {t("Home-Page.tbilisinear")}
           </p>
           <p className="text-[7rem] font-serif font-[50] semismall:text-[6rem] small:text-[5rem] ">
             2025
           </p>
         </div>

         {/* Middle Section */}
         <div className="flex flex-col w-[30%] text-base leading-relaxed space-y-4">
           <p>{t("Home-Page.atthiftshop")}</p>
           <p>{t("Home-Page.joinus")}</p>
         </div>

         {/* Right Section */}
         <div className="flex flex-col w-[30%] text-base leading-relaxed space-y-4">
           <p>{t("Home-Page.locatedin")}</p>

           <button className="flex items-center mt-4 space-x-2 text-base font-semibold text-[#450920] hover:text-black">
             <span className="text-xl">&#8594;</span>
             <span className="text-black dark:text-white">
               {t("Home-Page.makefashion")}
             </span>
           </button>
         </div>
       </div>
     </article>
   </>
 );
}
export default HomeFirstArticle;