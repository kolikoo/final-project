import { LoginAuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";
import LogInView from "@/Pages/Log-In/Log-in-view/LogInView";

export const Login = [
  <Route
    path={Default_Layout_Path.LogIn}
    element={
      <LoginAuthGuard>
        <LogInView />
      </LoginAuthGuard>
    }
  />,
];
