import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";

const Details = lazy(() => import("@/Pages/Detailing-page/DetailPageView/detailPageView"));


export const BlogDetails = [
  <Route
    path={Default_Layout_Path.Details + "/:id"}
    element={
      <Suspense fallback={<Loading />}>
        <Details />
      </Suspense>
    }
  />,
];