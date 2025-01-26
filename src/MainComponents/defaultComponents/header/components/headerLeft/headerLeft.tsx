import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PopOver from "./components/popOver";

const HeaderLeft: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex w-[20%] pl-10 mt-3 gap-[15px] text-[#450920] dark:text-[#C4D7F2] text-[18px] small:w-[30%]">
      <div>
        <p
          className="cursor-pointer hover:scale-110 transition-all duration-2000 small:text-[10px] large:text-[23px] xl:font-[300]"
          onClick={() => handleNavigate("/")}
        >
          {t("header.home")}
        </p>
      </div>

      <p
        className="cursor-pointer hover:scale-110 transition-all duration-2000 small:text-[10px] large:text-[23px] xl:font-[300]"
        onClick={() =>
          document
            .getElementById("homeBlogAboutArticle")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        {t("header.about")}
      </p>

      <PopOver />
    </div>
  );
};

export default HeaderLeft;
