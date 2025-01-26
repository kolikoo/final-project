import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { AuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Author_Layout_Path } from "../index.enum";

const AddBlog = lazy(() => import("@/Pages/Add-blog/addBlog"));

export const Addblog = [
  <Route
    path={Author_Layout_Path.AddBlog}
    element={
      <AuthGuard>
        <Suspense fallback={<Loading />}>
          <AddBlog />
        </Suspense>
      </AuthGuard>
    }
  />,
];
