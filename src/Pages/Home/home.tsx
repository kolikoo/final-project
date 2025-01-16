import React from "react";
import HomeFirstSection from "./home-components/home-first-section/homeFistSection";
import HomeFirstArticle from "./home-components/home-first-article/homeFirstArticle";
import HomeSecondArticle from "./home-components/home-second-article/homeSecondArticle";

 const MainHome:React.FC=()=>{
  return (
    <>
     <HomeFirstSection/>
     
     <HomeFirstArticle/>


     <HomeSecondArticle/>
    </>
  );
 }

 export default MainHome;