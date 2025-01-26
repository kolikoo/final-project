import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";

const Shoes = lazy(
  () => import("@/Pages/Clothes-blogs/shoes/shoes"),
);



export const shoes = [
  <Route
    path={Default_Layout_Path.Shoes}
    element={
      <Suspense fallback={<Loading />}>
        <Shoes />
      </Suspense>
    }
  />,
];