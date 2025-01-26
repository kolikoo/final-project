import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";


const NewBlogs = lazy(
  () => import("@/Pages/Clothes-blogs/new/New-blog"),
);

export const New_Blogs = [
  <Route
    path={Default_Layout_Path.NewBlog}
    element={
      <Suspense fallback={<Loading />}>
        <NewBlogs/>
      </Suspense>
    }
  />,
];