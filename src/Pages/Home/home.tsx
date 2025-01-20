import React, { useEffect, useState } from "react";
import HomeFirstSection from "./home-components/home-first-section/homeFistSection";
import HomeFirstArticle from "./home-components/home-first-article/homeFirstArticle";
import HomeSecondArticle from "./home-components/home-second-article/homeSecondArticle";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading"; // ლოადინგ კომპონენტის იმპორტი
import HomeSecondSection from "./home-components/home-second-section/homeSecondSection";

const MainHome: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <><div className="dark:bg-zinc-800">


      <HomeFirstSection />
        <HomeSecondSection/>
       <HomeFirstArticle />
       <HomeSecondArticle />
    

     
          </div>
    </>
  );
};

export default MainHome;
