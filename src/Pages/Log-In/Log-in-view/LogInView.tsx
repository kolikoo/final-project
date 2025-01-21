import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginInput from "@/components/ui/loginInputs";

const LogInView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <article className="w-full">
      <div
        className="m-auto mt-20 flex w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] flex-col gap-9 rounded-[10px] bg-[#F7F5EB] mb-6 pb-10 pl-10 pr-10 pt-10 dark:bg-zinc-900 dark:text-white
      semismall:m-auto
semimedium:m-auto
small:m-auto
small:ml-[35%]
semismall:ml-[25%]
sm:ml-[35%]"
      >
        <div className="signTitle text-center dark:text-[#C4D7F2]">
          <h3 className="text-3xl font-extrabold ">
            {t("LogIn-Page.Log in to BitBlogs")}
          </h3>
          <p className="dark:text-[#C4D7F2]">
            {t("LogIn-Page.Enter credentials")}
          </p>
        </div>

        <div className="signInputs">
          <LoginInput />
        </div>

        <div className="signcardFooter flex w-[100%] justify-between">
          <p className="text-[16px]">
            {t("LogIn-Page.Don't have an account")}
            <span>
              <NavLink
                className="text-[17px] ml-1 text-blue-600"
                to={"/Login/registration"}
              >
                {t("LogIn-Page.sign up")}
              </NavLink>
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default LogInView;
