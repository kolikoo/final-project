
import uknownImg from "../../../../images/uknownimg.svg"
import { useTranslation } from "react-i18next";


 const BlogCard:React.FC=()=>{

   const { t } = useTranslation();

   
  return (
    <div
      className="text-white w-[100%] h-[400px] bg-white p-[32px] rounded-xl border-[#417a51] border-solid 
    border-[2px] dark:bg-black dark:border-blue-950  dark:border-solid mr-36 "
    >
      <img
        className="rounded-xl	 w-[95%] h-[75%] bg-cover"
        src={uknownImg}
        alt="image-blog"
      />

      <p className="cloth-card-title text-black text-xl">prada$</p>
      <p className="cloth-card-description text-gray-600">bag$</p>
      <p className="cloth-card-price text-gray-800 mt-4">100$</p>
    </div>
  );
 }

 export default BlogCard;