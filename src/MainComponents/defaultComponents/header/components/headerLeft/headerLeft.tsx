
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {  useNavigate,  } from "react-router-dom";
import { useTranslation } from "react-i18next";


const HeaderLeft: React.FC = () => {
 const {t}=useTranslation()
 const navigate=useNavigate()
 const handleNavigate=(path:string)=>{
  navigate(path)
 }
  return (
    //  sm: "640px",
    //     small: "340px",
    //     semismall:"500px",
    //     extramedium:"780px",
    //     medium:"580px",
    //     semimedium:"800px",
    //     large:"900px"
    <>
      <div
        className="flex w-[20%] pl-10 mt-3 gap-[15px] text-[#450920] dark:text-[#C4D7F2] text-[18px]
      small:w-[30%]
      
      "
      >
        <div>
          <p
            className="cursor-pointer hover:scale-110 transition-all duration-2000 small:text-[10px] large:text-[23px] xl:font-[300]"
            onClick={() => handleNavigate("/")}
          >
            {t("header.home")}
          </p>
        </div>

        <p
          className="cursor-pointer hover:scale-110 transition-all duration-2000 small:text-[10px]
          large:text-[23px] xl:font-[300]"
          onClick={() =>
            document
              .getElementById("homeBlogAboutArticle")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t("header.about")}
        </p>

        <div className="small:text-[10px]">
          <Popover>
            <PopoverTrigger className="cursor-pointer relative hover:scale-110 transition-all duration-2000 small:text-[10px] large:text-[23px] xl:font-[300]">
              <p className="small:text-[10px] large:text-[23px]">
                {t("header.category")}
              </p>
            </PopoverTrigger>

            <PopoverContent
              className="bg-[#450920] dark:bg-zinc-700 text-white  p-2 border 
               rounded-[7px] mt-2 left-[-46px] pl-7 pr-7 absolute z-50 left--20 dark:text-white small:text-[10px] large:text-[23px] font-[200]"
            >
              <div onClick={() => handleNavigate("/NewBlog")}>
                <p className="small:text-[10px] large:text-[23px]">
                  {t("header.New")}
                </p>
              </div>
              <div onClick={() => handleNavigate("/UsedBlog")}>
                <p className="small:text-[10px] large:text-[23px]">
                  {t("header.Used")}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HeaderLeft;
