import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import hoverImg from "@/images/usedused.png";
import rightimg from "@/images/bgbgbg.png";
import leftimg from "@/images/marcxena.png";


const PopOver: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="relative small:text-[10px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Popover open={isHovered}>
        <PopoverTrigger asChild>
          <p className="cursor-pointer hover:scale-110 transition-all duration-2000 small:text-[10px] large:text-[23px] xl:font-[300] outline-none focus:outline-none hover:outline-none">
            {t("header.category")}
          </p>
        </PopoverTrigger>

        <PopoverContent
          side="bottom" 
          sideOffset={5} 
          align="start" 
          alignOffset={-100} 
          className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg w-full sm:w-[300px] md:w-[500px] lg:w-[600px] xl:w-[700px] p-6 border border-gray-200 absolute z-50 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 outline-none focus:outline-none "
        >
          {/* მარცხენა სექცია */}
          <div onClick={()=>handleNavigate("/Shoes")} className="flex flex-col items-center gap-3 p-4 bg-[#F7F5EB] rounded-md cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-opacity-80 dark:bg-zinc-800">

           <p  className="text-[30px]"
            >Shoes</p>
            <img
              src={rightimg}
              alt="hover img"
              className="w-[130px] h-[150px] object-cover rounded"
            />
          </div>

          {/* შუა სექცია */}
           <div onClick={()=>handleNavigate("/NewBlog")}
            className="flex flex-col items-center gap-3 p-4 bg-[#F7F5EB] rounded-md cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-opacity-80 dark:bg-zinc-800">
            
           <p  className="text-[30px]"
       >New</p>
            <img
              src={hoverImg}
              alt="hover img"
              className="w-[130px] h-[150px] object-cover rounded"
            />
          </div>

          {/* მარჯვენა სექცია */}
          <div
      onClick={() => handleNavigate("/UsedBlog")}
      className="flex flex-col items-center gap-3 p-4 bg-[#F7F5EB] rounded-md cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-opacity-80 dark:bg-zinc-800"
    >
      <p className="text-[30px] font-semibold">Used</p>
      <img
        src={leftimg}
        alt="Used category image"
        className="w-[130px] h-[150px] object-cover rounded-md"
      />
    </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopOver;
