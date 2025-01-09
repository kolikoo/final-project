

import BlogCard from "./components-home/blog-cards/card";
import BlogHomeSection from "./components-home/blog-home-section/blog-home-section";
import MainBlogCards from "./components-home/parent-blog-cards/blog-cards-main";




const HomeBlog:React.FC=()=>{




 return (
   <>

     <div className="w-[100%] bg-white px-10 dark:bg-black">
       <BlogHomeSection>
         <MainBlogCards>
           <BlogCard />
           <BlogCard />
           <BlogCard />
         </MainBlogCards>

         <div className="BlogHomeSecondSide border-white-600 h-[212px] w-[100%] rounded-xl border-[2px] border-solid dark:border-solid dark:border-blue-950 dark:bg-black dark:text-white">
           <ul>
             <li>Alice Johnson</li>
             <li>Bob Smith</li>
             <li>Carol Williams</li>
           </ul>
         </div>
       </BlogHomeSection>
     </div>
   </>
 );
}

export default HomeBlog;