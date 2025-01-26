import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RegisterConfirmationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <div className="w-[40%] m-auto h-[300px] p-35  flex flex-col justify-center align-middle text-center   my-8 rounded-[20px] bg-[#f8f4e3] dark:bg-zinc-900 text-[#450920] dark:text-white gap-5">
        <p className="font-[700] text-[18px] ">{t("SignIn-Page.firstly")}</p>

        <button
          onClick={() => handleNavigate("/login")}
          className="p-3 bg-[#450920] w-100% mx-auto text-white dark:bg-[#C4D7F2] dark:text-white"
        >
          {t("SignIn-Page.confirmed")}
        </button>

        <button
          onClick={() => handleNavigate("/login/registration")}
          className="p-3 bg-[#450920] w-100% mx-auto text-white dark:bg-[#C4D7F2] dark:text-white"
        >
          {t("SignIn-Page.tryagain")}
        </button>
      </div>
    </>
  );
};

export default RegisterConfirmationPage;
