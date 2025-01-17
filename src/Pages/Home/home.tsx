import React, { useEffect, useState } from "react";
import HomeFirstSection from "./home-components/home-first-section/homeFistSection";
import HomeFirstArticle from "./home-components/home-first-article/homeFirstArticle";
import HomeSecondArticle from "./home-components/home-second-article/homeSecondArticle";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading"; // ლოადინგ კომპონენტის იმპორტი

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
    <>
      <HomeFirstSection />
      <HomeFirstArticle />
      <HomeSecondArticle />
    </>
  );
};

export default MainHome;
