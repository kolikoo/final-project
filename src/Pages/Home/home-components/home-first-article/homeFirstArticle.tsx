import React  from "react";
import dickiesImg from "../../../../images/dickies.png"
import westwood from "../../../../images/westwood.png";
import carhat from "../../../../images/carhat.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeFirstArticle:React.FC=()=>{
  const { t } = useTranslation();
 const navigate = useNavigate();
 const handleClick = () => {
   navigate("/NewBlog");
 };
 return (
   <>
     <article className="flex flex-col items-center border-spacing-6 space-y-4 mt-[80px] mb-24 ">
       <div className="text-center text-4xl font-bold mb-6 text-[#224F34] dark:text-[#6BC785]">
         Top Brands
       </div>

       <div className="flex justify-between w-full max-w-[900px]">
         <div className="w-[30%] h-[300px] bg-gray-300 flex items-center justify-center">
           <img src={dickiesImg} alt="dickies img " />
         </div>
         <div className="w-[30%] h-[305px] bg-gray-300 flex items-center justify-center">
           <img src={westwood} alt="westwood img " />
         </div>
         <div className="w-[30%]  h-[300px] bg-gray-300 flex items-center justify-center">
           <img src={carhat} alt="carhat img " />
         </div>
       </div>

       <div>
         <button
           onClick={handleClick}
           className="px-4 w-40 py-2 mt-5 border-2 dark:border-[#6BC785] border-[#224F34] rounded-sm hover:bg-[#224F34] hover:text-white active:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#224F34]  hover:dark:bg-white dark:bg-[#224F34] hover:dark:text-[#224F34] dark:text-white"
         >
           {t("Home-Page.seeall")}
         </button>
       </div>
     </article>
   </>
 );
}
export default HomeFirstArticle;