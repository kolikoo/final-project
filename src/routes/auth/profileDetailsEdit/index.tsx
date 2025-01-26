import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { AuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Author_Layout_Path } from "../index.enum";


const ProfileDetailsEdit = lazy(() => import("@/Pages/profile/profileDetailsEdit/profileDetailsEdit"));


export const Profile_Details_Edit = [
  <Route
    path={Author_Layout_Path.profileDetailsEdit}
    element={
      <AuthGuard>
        <Suspense fallback={<Loading />}>
          <ProfileDetailsEdit />
        </Suspense>
      </AuthGuard>
    }
  />,
];