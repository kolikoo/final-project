import React  from "react";
import { useTranslation } from "react-i18next";

const HomeFirstArticle:React.FC=()=>{
  const { t } = useTranslation();


 return (
   <>
     <article
       id="homeBlogAboutArticle"
       className="flex flex-col items-center bg-[#F9F5EE] dark:text-[white] dark:bg-zinc-900 py-12 px-4 text-[#450920]"
     >
       {/* Main Title */}
       <div className="text-center text-4xl font-serif font-bold mb-8">
         <h1 className="uppercase leading-tight">About Our</h1>
         <h2 className="uppercase text-[4rem] leading-none">ThiftShop</h2>
       </div>

       <div className="flex flex-wrap justify-center max-w-5xl w-full gap-8">
         {/* Left Section */}
         <div className="flex flex-col items-start text-left w-[30%] ">
           <p className="text-xl italic leading-relaxed mb-4 font-[300]">
             Tbilisi's premier destination for unique and sustainable fashion.
             We're a one-of-a-kind thrift store that offers a curated selection
             of both new and pre-loved clothing for men and woman.Which is
             opened since
           </p>
           <p className="text-[7rem] font-serif font-[50]">2025</p>
         </div>

         {/* Middle Section */}
         <div className="flex flex-col w-[30%] text-base leading-relaxed space-y-4">
           <p>
             At ThiftShop, we're passionate about sustainable style. Our team
             meticulously handpicks every item, ensuring it meets our high
             standards for quality and timeless design. Whether you seek unique
             vintage treasures or discover contemporary pieces you won't find
             elsewhere, we offer something special for everyone.
           </p>
           <p>
             Join us on a journey towards a more sustainable future. By choosing
             pre-loved clothing, you're not just expressing your style; you're
             giving new life to old garments and reducing textile waste. Plus,
             with our competitive prices, you can find something you love
             without compromising your budget.
           </p>
         </div>

         {/* Right Section */}
         <div className="flex flex-col w-[30%] text-base leading-relaxed space-y-4">
           <p>
             Located in the heart of Tbilisi, our store is the perfect place to
             discover your new favorite outfit. Whether you're looking for a
             vintage treasure or a trendy new piece, we have something for
             everyone.
           </p>

           <button className="flex items-center mt-4 space-x-2 text-base font-semibold text-[#450920] hover:text-black">
             <span className="text-xl">&#8594;</span>
             <span className="text-black dark:text-white">
               THE ART OF MAKING CAVIAR
             </span>
           </button>
         </div>
       </div>
     </article>
   </>
 );
}
export default HomeFirstArticle;