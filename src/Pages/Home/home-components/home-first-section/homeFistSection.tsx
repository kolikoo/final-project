import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeFirstSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/NewBlog");
  };

  return (
    <section>
      <div className="flex w-[100%] h-[600px] bg-[#C2EFD4] dark:bg-black justify-around">
        <div className="flex flex-col w-[40%]">
          <p className="text-[50px] text-white font-[600] h-[200px] w-[100%]">
            {t("Home-Page.Discover and Find Your Own Fashion!")}
          </p>
          <p className="text-[#267D49] w-[50%]">
            {t(
              "Home-Page.Explore our curated collection of stylish clothing and accessories tailored to your unique taste."
            )}
          </p>
          <button
            onClick={handleClick}
            className="bg-[#224F34] w-[30%] p-3 mt-5"
          >
            {t("Home-Page.EXPLORE NOW")}
          </button>
        </div>

        <div className="w-[500px] h-[516px] mt-10 bg-gradient-to-r from-[#6BC785] to-[#224F34] rounded-tl-[15%] rounded-tr-[3%] rounded-bl-[20%] rounded-br-[25%] flex items-center justify-center">
          <p className="text-4xl text-center [writing-mode:vertical-rl] [text-orientation:upright] text-white">
            {t("Home-Page.Create Your Style")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeFirstSection;
