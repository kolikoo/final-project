import { Suspense, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LogInView from "./Pages/Log-In/Log-in-view/LogInView";
import Registration from "./Pages/Registration/registrationView";
import { supabase } from "./supabase";
import {
  LoginAuthGuard,
  AuthGuard,
} from "./MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import MainHome from "./Pages/Home/home";
import NewBlog from "./Pages/Clothes-blogs/new/New-blog";
import Footer from "./MainComponents/defaultComponents/footer/footer";
import UsedBlog from "./Pages/Clothes-blogs/used/Used-blog";
import AddBlog from "./Pages/Add-blog/addBlog";
import Details from "./Pages/Detailing-page/DetailPageView/detailPageView";
import ProfileMainView from "./Pages/profile/profileMainView/profileMainView";
import ProfileDetailsEdit from "./Pages/profile/profileDetailsEdit/profileDetailsEdit";
import Loading from "./MainComponents/defaultComponents/loadingPage/loading";
import CheckoutView from "./Pages/checkout/checkoutView/checkoutView";
import BlogEditPage from "./Pages/blogEditPage/blogEditPage";
import Header from "./MainComponents/defaultComponents/header/header";
import HomeLoadingPage from "./MainComponents/defaultComponents/homeLoadingPage/homeLoadingPage";
import Shoes from "./Pages/Clothes-blogs/shoes/shoes";
import RegisterConfirmationPage from "./Pages/Registration/confirmation/registerConfirmationPage";

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomeLoadingPage />}>
              <MainHome />
            </Suspense>
          }
        />
        <Route
          path="/NewBlog"
          element={
            <Suspense fallback={<Loading />}>
              <NewBlog />
            </Suspense>
          }
        />
        <Route
          path="/CheckoutView"
          element={
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <CheckoutView />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/UsedBlog"
          element={
            <Suspense fallback={<Loading />}>
              <UsedBlog />
            </Suspense>
          }
        />
        <Route
          path="/AddBlog"
          element={
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <AddBlog />
              </Suspense>
            </AuthGuard>
          }
        />

        <Route
          path="/Login/registration/confirmation"
          element={
            <LoginAuthGuard>
              < RegisterConfirmationPage/>
            </LoginAuthGuard>
          }
        />

       
        <Route
          path="/Details/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Details />
            </Suspense>
          }
        />

         <Route
          path="/Shoes"
          element={
            <Suspense fallback={<Loading />}>
              <Shoes/>
            </Suspense>
          }
        />
        <Route
          path="/LogIn"
          element={
            <LoginAuthGuard>
              <LogInView />
            </LoginAuthGuard>
          }
        />
        <Route
          path="/Login/registration"
          element={
            <LoginAuthGuard>
              <Registration />
            </LoginAuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <ProfileMainView />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/BlogEditPage/:id"
          element={
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <BlogEditPage />
              </Suspense>
            </AuthGuard>
          }
        />

        <Route
          path="/profileDetailsEdit"
          element={
            <AuthGuard>
              <Suspense fallback={<Loading />}>
                <ProfileDetailsEdit />
              </Suspense>
            </AuthGuard>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
