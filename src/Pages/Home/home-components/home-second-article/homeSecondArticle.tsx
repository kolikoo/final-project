import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import background from "@/images/conbg.png";

const HomeSecondArticle: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <section
      className="relative flex flex-col md:flex-row justify-center items-center h-screen bg-cover bg-center px-4 md:px-[50px]
      w-full
semismall:w-[138%]
semimedium:w-[100%]
small:w-[170%]
z-40
bg-[#F7F5EB]
dark:bg-zinc-900

"
    >
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "70%",
          height: "600px",
          borderRadius: "20px",
        }}
        className="flex items-center justify-center"
      >
        <div
          className="rounded-[20px]"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        <button
          onClick={() => handleNavigate("/Shoes")}
          className="z-10 px-4 py-2 md:px-6 md:py-3 text-[20px] md:text-[40px] w-[80%] md:w-[35%] h-[60px] md:h-[85px] font-[100] text-[#F7F5EB] border-[2px] border-black bg-zinc-300 bg-opacity-30 hover:bg-white hover:text-black transition-colors rounded-md sm:w-40 semismall:w-40 small:w-40 xl:bg-w-[70px]"
        >
          {t("header.shoes")}
        </button>
      </div>
    </section>
  );
};

export default HomeSecondArticle;
