import {  useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes} from "react-router-dom";

import { supabase } from "./supabase";

import { useAtom } from "jotai";
import { userAtom } from "./store/auth";

import Header from "./MainComponents/defaultComponents/header/header";
import { Auth_Routes } from "./routes/auth";
import { Default_Routes } from "./routes/default";
import Footer from "./MainComponents/defaultComponents/footer/footer";

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
        {Auth_Routes}
        {Default_Routes}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
