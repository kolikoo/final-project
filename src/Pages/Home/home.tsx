import React, { useEffect, useState } from "react";
import HomeFirstSection from "./home-components/home-first-section/homeFistSection";
import HomeFirstArticle from "./home-components/home-first-article/homeFirstArticle";
import HomeSecondArticle from "./home-components/home-second-article/homeSecondArticle";
import HomeSecondSection from "./home-components/home-second-section/homeSecondSection";
import HomeLoadingPage from "@/MainComponents/defaultComponents/homeLoadingPage/homeLoadingPage";


const MainHome: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomeLoadingPage />;
  }

  return (
    <>
      <div className="dark:bg-zinc-800">
        <HomeFirstSection />
     
        <HomeSecondSection />
        <HomeFirstArticle />
        <HomeSecondArticle />
        
      </div>
    </>
  );
};

export default MainHome;
