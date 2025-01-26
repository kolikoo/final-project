import { LoginAuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";
import Registration from "@/Pages/Registration/registrationView";




export const registration = [
  <Route
    path={Default_Layout_Path.Registration}
    element={
      <LoginAuthGuard>
        <Registration />
      </LoginAuthGuard>
    }
  />,
];