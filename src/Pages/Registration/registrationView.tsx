
import RegisterForm from "@/components/ui/inputRegistration";


import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";


const Registration:React.FC=()=>{
  const { t } = useTranslation();

 return (
   <article className="w-[100%]">
     <div className="m-auto mt-20 flex w-[35%] flex-col gap-9 rounded-[10px] bg-[#F7F5EB] mb-4 pb-10 pl-10 pr-10 pt-10 dark:bg-black dark:text-white">
       <div className="signTitle text-center">
         <h3 className="text-[25px] font-extrabold dark:text-[#C4D7F2]">
           {t("SignIn-Page.Sign Up for BitBlogs")}
         </h3>
         <p className="dark:text-white">
           {t("SignIn-Page.Create your account to start blogging")}
         </p>
       </div>

       <div className="signInputs">
         <RegisterForm />
       </div>

       <div className="signcardFooter flex justify-center">
         <p>
           {t("SignIn-Page.Already have an account")}
           <span>
             <NavLink className="text-blue-600" to={"/Login"}>
               {t("SignIn-Page.Log In")}
             </NavLink>
           </span>
         </p>
       </div>
     </div>
   </article>
 );
}

export default Registration;

