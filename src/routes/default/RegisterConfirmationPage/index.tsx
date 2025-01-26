import { LoginAuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { Route } from "react-router-dom";
import { Default_Layout_Path } from "../index.enum";
import RegisterConfirmationPage from "@/Pages/Registration/confirmation/registerConfirmationPage";




export const Register_Confirmation_Page = [
  <Route
    path={Default_Layout_Path.RegisterConfirmationPage}
    element={
      <LoginAuthGuard>
        <RegisterConfirmationPage />
      </LoginAuthGuard>
    }
  />,
];