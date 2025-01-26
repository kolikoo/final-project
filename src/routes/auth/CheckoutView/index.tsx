import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";
import { AuthGuard } from "@/MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Author_Layout_Path } from "../index.enum";

const CheckoutView = lazy(
  () => import("@/Pages/checkout/checkoutView/checkoutView"),
);

export const Checkout_View = [
  <Route
    path={Author_Layout_Path.CheckoutView}
    element={
      <AuthGuard>
        <Suspense fallback={<Loading />}>
          <CheckoutView />
        </Suspense>
      </AuthGuard>
    }
  />,
];
