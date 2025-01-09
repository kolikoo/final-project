import { Suspense, lazy, useEffect,  } from "react";
import "./App.css";
import Header from "./MainComponents/defaultComponents/header/header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AboutPage from "./Pages/About/aboutPage/aboutPage";
import LogInView from "./Pages/Log-In/Log-in-view/LogInView";
import Registration from "./Pages/Registration/registrationView";
import { supabase } from "./supabase";
import { LoginAuthGuard ,AuthGuard} from "./MainComponents/defaultComponents/routeGuards/auth/authGuard";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import ProfileView from "./Pages/profile/profileView";


const HomeBlog = lazy(() => import("./Pages/Home-Blog/home-Blog"));




function App() {

   const [,setUser]=useAtom(userAtom)

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
              <HomeBlog />
            </Suspense>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/LogIn" element={<LoginAuthGuard><LogInView /></LoginAuthGuard>} />
        <Route path="/Login/registration" element={<LoginAuthGuard><Registration /></LoginAuthGuard>} />
        <Route path="/profile" element={<AuthGuard><ProfileView/></AuthGuard>} />
        <Route path="/" element={<Navigate to="/ka/home" />} />
        
      </Routes>
    </Router>
  );
}

export default App;
