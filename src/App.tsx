import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import Header from "./MainComponents/defaultComponents/header/header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import ProfileView from "./Pages/profile/profileDetailsEdit/profileDetailsEdit";
import MainHome from "./Pages/Home/home";
import NewBlog from "./Pages/Clothes-blogs/new/New-blog";
import Footer from "./MainComponents/defaultComponents/footer/footer";
import UsedBlog from "./Pages/Clothes-blogs/used/Used-blog";
import AddBlog from "./Pages/Add-blog/addBlog";
import Details from "./Pages/Detailing-page/DetailPageView/detailPageView";
import ProfileMainView from "./Pages/profile/profileMainView/profileMainView";
import ProfileDetailsEdit from "./Pages/profile/profileDetailsEdit/profileDetailsEdit";




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
            <Suspense fallback={"loading"}>
              <MainHome />
            </Suspense>
          }
        />
        <Route path="/NewBlog" element={<NewBlog />} />
        <Route path="/UsedBlog" element={<UsedBlog />} />
        <Route path="/AddBlog" element={<AddBlog />} />
        <Route path="/Details/:id" element={<Details />} />
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
              <ProfileMainView />
            </AuthGuard>
          }
        />
        <Route
          path="/profileDetailsEdit"
          element={
            <AuthGuard>
              <ProfileDetailsEdit />
            </AuthGuard>
          }
        />

        <Route path="/" element={<Navigate to="/ka/home" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
