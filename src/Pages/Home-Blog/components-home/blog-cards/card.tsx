
import uknownImg from "../../../../images/uknownimg.svg"
import { HomeBlogStyles } from "../../home-blog-styles.tsx/home-blog-styles";
import { useTranslation } from "react-i18next";


 const BlogCard:React.FC=()=>{

   const { t } = useTranslation();

   
  return (
    <div className="text-white w-[100%] h-[400px] bg-white p-[32px] rounded-xl border-white-600 border-solid 
    border-[2px] dark:bg-black dark:border-blue-950  dark:border-solid mr-36" >
      <img
        className="rounded-xl	 w-[95%] h-[50%] bg-cover"
        src={uknownImg}
        alt="image-blog"
      />

      <p className={HomeBlogStyles({background:"white",size:"big"})}>{t("Home-Page.hello world")}</p>
      <p className="text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, odit
        quasi temporibus sint voluptas nobis inventore, voluptate ut magni
        ratione veniam molestiae, in repellendus doloremque sed. Explicabo
        laboriosam eveniet ad eius ratione at adipisci inventore, soluta fugiat
        dolor, facilis earum sapiente hic odit repellendus ut esse, commodi
        assumenda. Harum, architecto?
      </p>
    </div>
  );
 }

 export default BlogCard;