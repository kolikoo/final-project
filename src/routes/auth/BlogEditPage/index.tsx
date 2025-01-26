import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { AuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Author_Layout_Path } from "../index.enum";

const BlogEditPage = lazy(() => import("@/Pages/blogEditPage/blogEditPage"));


export const Blog_Edit_Page = [
  <Route
    path={Author_Layout_Path.BlogEditPage+ "/:id"}
    element={
      <AuthGuard>
        <Suspense fallback={<Loading />}>
          <BlogEditPage />
        </Suspense>
      </AuthGuard>
    }
  />,
];