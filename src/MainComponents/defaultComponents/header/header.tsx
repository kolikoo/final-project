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
import searchSvg from "../../../../src/images/search-svgrepo-com (2).svg";
import worldSvg from "../../../images/world-1-svgrepo-com.svg";
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

  const selectedImage = i18n.language === "ka" ? worldSvg : worldSvg;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="m-auto h-[100px] w-[100%] bg-[#C2EFD4] dark:bg-[#224F34]">
      <div className="header flex justify-between p-10">
        {/* Left section */}
        <div className="header-left-side flex w-[20%] h-10">
          <nav className="header-nav w-40 m-auto h-11">
            <ul className="flex dark:bg-[#417a51] space-x-6 justify-center dark:text-white bg-gradient-to-r from-[#6BC785] to-[#224F34] w-50 p-2 h-10 rounded-[25px]">
              <li className="hover:text-[17px]">
                <NavLink to={"/NewBlog"}>New</NavLink>
              </li>
              <li className="hover:text-[17px]">
                <NavLink to={"/UsedBlog"}>Used</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="bg-[#C2EFD4] dark:bg-[#224F34] dark:text-white ml-[100px] text-4xl font-[600]">
          <NavLink to={"/"}>ThriftShop</NavLink>
        </div>

        <div className="header-right-items  flex w-[30%] text-black gap-3 justify-between dark:text-white w-50 p-2 h-10 rounded-[25px]">
          {user && (
            <div
              onClick={() => handleNavigate("/AddBlog")}
              className="w-[50%] cursor-pointer align-middle h-12 bg-gradient-to-r from-[#6BC785] to-[#224F34] rounded-lg p-3 text-black dark:text-white"
            >
              Add List +
            </div>
          )}

          <div className="bg-gradient-to-r from-[#6BC785] to-[#224F34] dark:bg-[#417a51] rounded-[25px] flex w-[70%] justify-center gap-5 h-10 p-2">
            <p onClick={() => handleNavigate("/CheckoutView")}>
              <AddShoppingCartIcon className="text-white hover:text-black cursor-pointer" />
            </p>

            {/* Theme toggle */}
            <Select defaultValue="light" onValueChange={handleChangeToggle}>
              <SelectTrigger className="text-black ">
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
              <SelectContent className="bg-black text-white dark:bg-white dark:text-black mt-9 w-20 text-center p-2 border-black border-[1px] rounded-lg">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>

            {/* Language toggle */}
            <Select defaultValue="light" onValueChange={handleChangeLanguage}>
              <SelectTrigger className="selecttriger text-black">
                <SelectValue>
                  <img className="w-7" src={selectedImage} alt="worldsvg" />
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black text-white dark:bg-white dark:text-black mt-9 w-20 text-center p-2 border-black border-[1px] rounded-lg ml-30">
                <SelectItem value="ka">
                  <button onClick={() => handleChangeLanguage("ka")}>
                    Geo
                  </button>
                </SelectItem>
                <SelectItem value="en">
                  <button onClick={() => handleChangeLanguage("en")}>
                    ENG
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
                  <div className="h-10 w-10  rounded-full bg-[#224F34] text-black dark:bg-[#417a51] dark:text-white flex justify-center items-center">
                    <img
                      src="https://api.dicebear.com/9.x/avataaars/svg"
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white dark:bg-white dark:text-black mt-7 w-30 text-center p-2 border-black border-[1px] rounded-lg ml-30">
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <span
                        className="cursor-pointer text-red-600"
                        onClick={() => handlelogout()}
                      >
                        Log Out
                      </span>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              <NavLink
                className="rounded-[10px] h-10 text-black bg-[#224F34] p-2 font-[700] dark:bg-[#417a51] dark:text-white"
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
