import HomeLoadingPage from "@/MainComponents/defaultComponents/homeLoadingPage/homeLoadingPage";
import {  Suspense } from "react";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";
import MainHome from "@/Pages/Home/home";


export const Home = [
  <Route
    path={Default_Layout_Path.Home}
    element={
      <Suspense fallback={<HomeLoadingPage />}>
        <MainHome />
      </Suspense>
    }
  />,
];