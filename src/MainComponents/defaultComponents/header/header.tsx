import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
 
} from "@radix-ui/react-popover";
import { NavLink, useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import sunImg from "../../../images/icons8-sun.svg";
import moonImg from "../../../images/icons8-moon-symbol-30.png";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../supabase/auth/index";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);

  const { mutate: handlelogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  const handleChangeToggle = (value: string) => {
    const html = document.querySelector("html");
    const imgElement = document.querySelector(
      "#theme-toggle-img"
    ) as HTMLImageElement;

    if (value === "dark") {
      html?.classList.add("dark");
      if (imgElement) {
        imgElement.src = moonImg;
      }
    } else if (value === "light") {
      html?.classList.remove("dark");
      if (imgElement) {
        imgElement.src = sunImg;
      }
    }
  };

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="m-auto h-[100px] w-[100%] bg-[#F7F5EB]  dark:bg-zinc-900  ">
      <div className="header flex justify-between p-10">
        {/* Left section */}

        <div className="flex w-[20%] pl-10 mt-3 gap-[15px] text-[#450920] dark:text-[#C4D7F2] text-[18px]">
          <div>
            <p
              className="cursor-pointer hover:scale-110 transition-all duration-2000"
              onClick={() => handleNavigate("/")}
            >
              {t("header.home")}
            </p>
          </div>

          <p
            className="cursor-pointer hover:scale-110 transition-all duration-2000"
            onClick={() =>
              document
                .getElementById("homeBlogAboutArticle")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("header.about")}
          </p>

          <div>
            <Popover>
              <PopoverTrigger className="cursor-pointer relative hover:scale-110 transition-all duration-2000">
                <p>{t("header.category")}</p>
              </PopoverTrigger>

              <PopoverContent
                className="bg-[#450920] dark:bg-zinc-700 text-white  p-2 border 
               rounded-[7px] mt-2 left-[-46px] pl-7 pr-7 absolute z-50 left--20 dark:text-white"
              >
                <div onClick={() => handleNavigate("/NewBlog")}>
                  <p>{t("header.New")}</p>
                </div>
                <div onClick={() => handleNavigate("/UsedBlog")}>
                  <p>{t("header.Used")}</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="bg-[#f8f4e3] dark:bg-zinc-900 text-[#450920] dark:text-white ml-[100px] text-4xl font-[600]">
          <NavLink to={"/"}>ThriftShop</NavLink>
        </div>

        <div className="header-right-items mb-4 flex w-[30%] text-black gap-3 justify-between dark:text-white w-50 p-2 h-10 rounded-[25px]">
          {user && (
            <div
              onClick={() => handleNavigate("/AddBlog")}
              className="w-[50%] bg-[#450920] dark:bg-[#C4D7F2] dark:text-black cursor-pointer align-middle h-10   rounded-[25px] pr-1 pl-8 pt-2 text-white  hover:scale-110 transition-transform duration-300"
            >
              {t("Home-Page.Add List +")}
            </div>
          )}

          <div className=" border-[1px] border-[#450920] dark:border-[#C4D7F2] rounded-[25px] flex w-[70%] justify-center gap-5 h-10 p-1">
            <p id="cart-icon" onClick={() => handleNavigate("/CheckoutView")}>
              <AddShoppingCartIcon className="text-[#450920] dark:text-white hover:text-black cursor-pointer" />
            </p>

            {/* Theme toggle */}
            <Select defaultValue="light" onValueChange={handleChangeToggle}>
              <SelectTrigger className="text-zinc-800">
                <SelectValue
                  className="bg-black"
                  placeholder={t("change Theme")}
                >
                  <img
                    className="w-7"
                    id="theme-toggle-img"
                    src={sunImg}
                    alt="theme-toggle"
                  />
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black text-white dark:bg-[#C4D7F2] dark:text-black mt-9 w-20 text-center p-2 border-white border-[1px] rounded-lg z-50">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>

            {/* Language toggle */}
            <Select defaultValue="light" onValueChange={handleChangeLanguage}>
              <SelectTrigger className="selecttriger text-black">
                <SelectValue>
                  <LanguageIcon className="text-black dark:text-white" />
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black text-white dark:bg-[#C4D7F2] dark:text-black mt-9 w-20 text-center p-2 border-white border-[1px] rounded-lg z-50">
                <SelectItem value="ka">
                  <button onClick={() => handleChangeLanguage("ka")}>
                    {t("header.geo")}
                  </button>
                </SelectItem>
                <SelectItem value="en">
                  <button onClick={() => handleChangeLanguage("en")}>
                    {t("header.eng")}
                  </button>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile and Logout */}
          <div className="flex gap-3">
            {user ? (
              <Popover>
                <PopoverTrigger>
                  <div className="h-10 w-10 rounded-full bg-[#450920] text-black dark:bg-[#C4D7F2] dark:text-white flex justify-center items-center relative">
                    <img
                      src="https://api.dicebear.com/9.x/avataaars/svg"
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white  dark:bg-zinc-700 dark:text-white mt-7 w-30 text-center p-2 border-[1px] rounded-[7px] z-50">
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <NavLink to="/profile">{t("header.Profile")}</NavLink>
                    </li>
                    <li>
                      <span
                        className="cursor-pointer text-red-600"
                        onClick={() => handlelogout()}
                      >
                        {t("header.logout")}
                      </span>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              <NavLink
                className="rounded-[10px] h-10 p-2 w-18 bg-[#450920] text-white dark:bg-[#C4D7F2] dark:text-white"
                to={"/LogIn"}
              >
                <button>{t("Home-Page.log in")}</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
