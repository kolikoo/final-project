import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { AuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Author_Layout_Path } from "../index.enum";

const ProfileMainView = lazy(() => import("@/Pages/profile/profileMainView/profileMainView"));

export const Profile = [
  <Route
    path={Author_Layout_Path.profile}
    element={
      <AuthGuard>
        <Suspense fallback={<Loading />}>
          <ProfileMainView />
        </Suspense>
      </AuthGuard>
    }
  />,
];