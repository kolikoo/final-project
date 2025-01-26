import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";

const UsedBlog = lazy(() => import("@/Pages/Clothes-blogs/used/Used-blog"));

export const UsedBlogs = [
  <Route
    path={Default_Layout_Path.UsedBlog}
    element={
      <Suspense fallback={<Loading />}>
        <UsedBlog />
      </Suspense>
    }
  />,
];
